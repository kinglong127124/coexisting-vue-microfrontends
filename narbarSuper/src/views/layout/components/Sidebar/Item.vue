<script>
  export default {
    name: 'MenuItem',
    functional: true,
    props: {
      icon: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: ''
      }
    },
    render(h, context) {
      const { icon, title } = context.props
      const vnodes = []
      if (icon) {
        if(icon.includes('icon')){
          vnodes.push(<svg-icon icon-class={icon}/>)
        }else {
          vnodes.push(<svg-icon icon-class='iconcaozuorizhi1'/>)
        }
      }else{
        vnodes.push(<svg-icon icon-class='iconcaozuorizhi1'/>)
      }

      if (title) {
        vnodes.push(<span slot='title'>{(title)}</span>)
      }
      return vnodes
    }
  }
</script>
