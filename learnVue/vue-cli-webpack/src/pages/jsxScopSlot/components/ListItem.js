export default {
  props: {
    renderList: {
      type: Function
    },
    item: {
      type: String,
      default: ''
    }
  },
  render () {
    return this.renderList(this.item)
    // return <h1>{this.item}</h1>
  }
}
