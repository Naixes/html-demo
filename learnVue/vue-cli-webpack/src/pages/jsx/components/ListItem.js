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
  render (h) {
    return this.renderList(h, this.item)
    // return <h1>{this.item}</h1>
  }
}
