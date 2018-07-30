export default function(options) {
  const el = document.querySelector(options.el)
  const instagramDataUrl = 'https://www.instapi.io/u/analogmemory'

  fetch(instagramDataUrl)
    .then(res => res.json())
    .then(data => {
      const imageData = data.graphql.user.edge_owner_to_timeline_media.edges
      for (let i = 0; i < 6; i++) {
        const imageId = imageData[i].node.shortcode
        const imageUrl = imageData[i].node.thumbnail_src
        displayImage(imageUrl, imageId)
      }
      const loaderEL = el.querySelector('.loader')
      loaderEL.style.display = 'none'
    })

  function displayImage(imageUrl, imageId) {
    let imageWrapEl = document.createElement('a')
    let imageEl = document.createElement('img')
    imageWrapEl.href = `https://www.instagram.com/p/${imageId}/`
    imageWrapEl.setAttribute('target', '_blank')
    imageEl.src = imageUrl
    imageWrapEl.appendChild(imageEl)
    el.appendChild(imageWrapEl)
  }
}
