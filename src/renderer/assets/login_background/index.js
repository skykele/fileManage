function importAll(r) {
    let images = {}
    r.keys().forEach(key => {
      images[key] = r(key)
    })
    return images
  }
  
const images = importAll(require.context('./imgs', false, /\.(png|jpe?g)$/))
export default images