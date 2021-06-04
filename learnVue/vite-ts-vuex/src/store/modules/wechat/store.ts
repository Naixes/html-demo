export const createStore = () => {
    const store = {
        loading: true
    }
    return store
}

export type wechatState = ReturnType<typeof createStore>