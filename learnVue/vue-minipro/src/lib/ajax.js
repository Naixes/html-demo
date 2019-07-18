export default async function(form) {
    let formData = new FormData(form)
    
    let res = await fetch(form.action, {
        method: form.method,
        body: formData
      })
    return await res.json()
}