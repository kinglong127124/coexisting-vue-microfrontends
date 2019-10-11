<template>
  <div class="basicUpLoadFiles">
    <div v-for="(item, index) in data" v-if="typeof data == 'object'" :key="index" :style="styleComputed"
         class="imageBox" @click="visibel = true, url = item">
      <i v-show="!disabled" class="el-icon-plus close" @click.stop="handleCloseClick(item, index)"/>
      <img :src="item" style="width: 100%; height: 100%; object-fit: contain;">
    </div>
    <div :disabled="disabled" :style="[styleComputed, vShow]" class="uploadBtn" style="float: left; margin: 5px;"
         @click="updateBtn">
      <i :style="iconFontSize" class="el-icon-plus"/>
      <input ref="fileButton" type="file" style="display: none;"
             accept=".bmp,.jpg,.png,.tif,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF,.webp"
             @input="submit">
    </div>
    <div v-if="visibel" class="dialog-iamge" @click="visibel = false">
      <div class="box">
        <img :src="url" class="dialog-show-image" @click.stop>
      </div>
    </div>
  </div>
</template>

<script>
import {
  postAttacheFileUrl,
  getAttacheFileData,
  deleteByUrl
} from '@/api/common/basic/basicUpload';
export default {
  name: 'BasicUpLoadFiles',
  props: {
    disabled: Boolean,
    form: Object,
    data: [Array, String],
    size: {
      type: Number,
      default: () => 64
    },
    formData: Object,
    beforeClick: {
      type: Function,
      default: () => () => true
    }
  },
  data() {
    return {
      url: '',
      visibel: false,
      filesType: ['bmp', 'jpg', 'png', 'tif', 'gif', 'pcx', 'tga', 'exif', 'fpx', 'svg', 'psd', 'cdr', 'pcd', 'dxf', 'ufo', 'eps', 'ai', 'raw', 'WMF', 'webp']
    }
  },
  computed: {
    styleComputed() {
      return {
        width: this.size + 'px',
        height: this.size + 'px',
        lineHeight: this.size + 'px'
      };
    },
    iconFontSize() {
      return {
        fontSize: this.size / 2 + 'px',
        lineHeight: this.size + 'px'
      };
    },
    vShow() {
      return {
        visibility: this.disabled ? 'hidden' : ''
      };
    }
  },
  methods: {
    updateBtn() {
      this.$refs.fileButton.value = ''
      if (this.beforeClick(this.formData)) {
        if (this.disabled) return
        this.$refs.fileButton.click()
      }
    },
    submit(file) {
      if (!file.target.files[0]) return
      if (!this.filesType.includes(file.target.files[0].name.split('.')[1].toLocaleLowerCase())) return this.$message.error(`当前不支持${file.target.files[0].name.split('.')[1]}类型文件上传`)
      const formData = new FormData()
      const data = {
        type: 2,
        tableId: this.form.id,
        tableCode: this.form.code,
        tableName: this.form.name,
        projectId: this.form.proId,
        projectCode: this.form.proCode,
        projectName: this.form.proName
      };
      const name = this.$route.name.substring(0, this.$route.name.length - 6)
      const resultDetail = this.$route.name.substr(this.$route.name.length - 6, 6)
      data.sourceCode = resultDetail == 'Detail' ? name : this.$route.name || '';
      const title = this.$route.meta.title.substring(0, this.$route.meta.title.length - 3)
      const resultTitle = this.$route.meta.title.substr(this.$route.meta.title.length - 3, 3)
      data.sourceName = resultTitle == '-详情' ? title : this.$route.meta.title || '';
      formData.append('file', file.target.files[0])
      formData.append('params', JSON.stringify(data))
      postAttacheFileUrl(formData).then(res => {
        if (res.rel) {
          this.$message.success(res.message)
          getAttacheFileData({ tableId: this.form.id, type: 2 }).then(res => {
            this.$emit('uploadSuccess', {
              data: res.data,
              formData: this.formData
            });
          });
        } else {
          this.$message.error(res.message)
          this.$emit('error', res)
        }
      });
    },
    async handleCloseClick(url, index) {
      await deleteByUrl({ mainPath: url })
      // const idx = this.data.indexOf(url)
      // this.data.splice(idx, 1)
      return this.$emit('close', {
        url,
        index,
        formData: this.formData
      });
    }
  }
};
</script>

<style scope>
  .uploadBtn {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    box-sizing: border-box;
    cursor: pointer;
    line-height: 64px;
    vertical-align: top;
    text-align: center;
  }
  .uploadBtn:hover {
    border-color: #409eff;
    color: #409eff;
  }
  .uploadBtn i {
    font-size: 18px;
    color: #8c939d;
  }
  .imageBox {
    border: 1px dashed rgb(234, 234, 234);
    float: left;
    margin: 5px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .imageBox:hover .close {
    display: flex;
  }
  .close {
    width: 200%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    top: 0;
    background: #909399;
    transform: rotateZ(45deg)  translate(50%, 0);
    transform-origin: 100% 0;
    display: none;
    font-size: 12px;
  }
  .close:hover::before {
    color: red;
  }
  .dialog-iamge {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialog-iamge .box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .dialog-show-image {
    max-width: 80%;
    max-height: 80%;
  }
  /* .dialog-iamge .box {
    width: 60%;
    height: 60%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .dialog-iamge .box img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  } */
</style>
