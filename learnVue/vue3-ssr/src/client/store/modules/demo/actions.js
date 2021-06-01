export default {
    setData({commit}) {
        const payload = {
            name: 'naixes',
            address: '杭州'
        }
        commit('setData', payload)
    }
}