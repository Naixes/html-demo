// 返回不同级别的标题：l=1/2/3/4/5/6
export default {
  props: {
    l: {
      type: Number
    }
  },
  render (h) {
    let tag = `h${this.l}`
    // return <tag>{this.$slots.default}</tag>
    return h(tag, {}, this.$slots.default)

    // h方法的参数：
    // h1 on-click={()=>{alert(1)}} style={{color:'red'}}>你好</h1>
    // h('h1',{
    //   on:{
    //       click(){
    //           alert(1)
    //       },
    //   },
    //   attrs:{
    //       a:1
    //   }
    // },[h('span',{},'你好')])
  }
}
