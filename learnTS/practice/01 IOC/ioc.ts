class CreateIoc {
    private container: Map<Symbol, {callback: Function}>
    constructor() {
        this.container = new Map()
    }
    get(namespace: Symbol) {
        const item = this.container.get(namespace)
        if(item) {
            return item.callback
        }else {
            throw new Error('item is not found')
        }
    }
    bind(key: Symbol, callback: Function) {
        this.container.set(key, {
            callback
        })
    }
}

export default CreateIoc