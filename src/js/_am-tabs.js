export default function(options) {
  const el = document.querySelector(options.el)
  const links = el.querySelectorAll('[data-tab]')
  const contentTabs = el.querySelectorAll('[data-tab-content]')
  const hash = location.hash.slice(1)

  let activeTab = el.querySelector(`[data-tab="${hash}"]`) || links[0]
  let activeTabName = activeTab.getAttribute('data-tab')
  let activeContentTab = el.querySelector(
    `[data-tab-content="${activeTabName}"]`
  )

  activeTab.classList.add('active')
  activeContentTab.classList.add('active')

  contentTabs.forEach(tab => {
    if (tab.classList.contains('active')) return
    tab.classList.add('hidden')
  })

  function switchTabs(e) {
    e.preventDefault()
    if (this.classList.contains('active')) return

    // Remove active tabs
    activeTab.classList.remove('active')
    activeContentTab.classList.add('hidden')
    activeContentTab.classList.remove('active')

    activeTabName = this.getAttribute('data-tab')
    activeTab = el.querySelector(`[data-tab="${activeTabName}"]`)
    activeContentTab = el.querySelector(`[data-tab-content="${activeTabName}"]`)
    activeTab.classList.add('active')
    activeContentTab.classList.remove('hidden')
    activeContentTab.classList.add('active')

    if (history.pushState) {
      window.history.pushState(null, null, `#${activeTabName}`)
    } else {
      window.location.hash = `#${activeTabName}`
    }
  }

  links.forEach(link => {
    link.addEventListener('click', switchTabs)
  })
}
