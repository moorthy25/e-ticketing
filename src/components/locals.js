function getLocal(id) {
    return JSON.parse(localStorage.getItem(id))
}
function setLocal(id, val) {
    return localStorage.setItem(id, JSON.stringify(val))
}
function removeLocal(id) {
    return localStorage.removeItem(id)
}

export  {
    getLocal, setLocal, removeLocal
}