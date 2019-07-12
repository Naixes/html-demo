const SERVER = 'http://localhost:8080'

async function get(_url) {
    let url = `${SERVER}/${_url}`

    try {
        let res = await fetch(url)
        let data = await res.json()
        if(data.error) {
            alert('请刷新')
            console.log(data.error)
        }
        return data
    } catch (error) {
        alert('请刷新')
        console.log(error)
        throw error
    }
}

export default {
    get
}