import type Reveal from 'reveal.js'

export const setViewerCount = (count: number) => {
  const viewerCount = document.getElementById('viewer-count')
  if (viewerCount) {
    if (Number.isInteger(count)) {
      viewerCount.style.display = ''
      viewerCount.innerText = count.toString()
    } else {
      viewerCount.style.display = 'none'
    }
  }
}

export const setupViewer = (_reveal: Reveal) => {
  // toggle pause keycodes and autoslide
  // https://github.com/hakimel/reveal.js/blob/4fe3946cb43de57f79aaa7b646aee7e78f4bcc75/js/controllers/keyboard.js#L353
  // NOTE: does not work :(
  // ;[
  //   // autoslide
  //   65,
  //   // pause
  //   58, 59, 66, 86, 190, 191,
  // ].forEach(reveal.removeKeyBinding)

  const resumeButtons = document.getElementsByClassName(
    'resume-button',
  ) as HTMLCollectionOf<HTMLElement>
  Array.from(resumeButtons).forEach((el) => {
    el.remove()
  })

  const pauseOverlays = document.getElementsByClassName(
    'pause-overlay',
  ) as HTMLCollectionOf<HTMLElement>
  Array.from(pauseOverlays).forEach((el) => {
    const clone = el.cloneNode(true)
    if (el.parentElement) {
      el.parentElement.replaceChild(clone, el)
    }
  })
}

export const handleEnableSync = () => {
  const sync = document.getElementById('sync')
  const syncStatusIconActive = document.getElementById(
    'sync-status-icon-active',
  )
  const syncStatusIconInactive = document.getElementById(
    'sync-status-icon-inactive',
  )
  const syncStatusText = document.getElementById('sync-status-text')
  if (sync) {
    sync.classList.add('active')
    sync.title = 'Unfollow'
  }
  if (syncStatusIconInactive) {
    syncStatusIconInactive.style.display = 'none'
  }
  if (syncStatusIconActive) {
    syncStatusIconActive.style.display = ''
  }
  if (syncStatusText) {
    syncStatusText.innerText = 'Following'
  }
}

export const handleDisableSync = () => {
  const sync = document.getElementById('sync')
  const syncStatusIconActive = document.getElementById(
    'sync-status-icon-active',
  )
  const syncStatusIconInactive = document.getElementById(
    'sync-status-icon-inactive',
  )
  const syncStatusText = document.getElementById('sync-status-text')
  if (sync) {
    sync.classList.remove('active')
    sync.title = 'Follow'
  }
  if (syncStatusIconActive) {
    syncStatusIconActive.style.display = 'none'
  }
  if (syncStatusIconInactive) {
    syncStatusIconInactive.style.display = ''
  }
  if (syncStatusText) {
    syncStatusText.innerText = 'Not following'
  }
}

export const showSyncButton = () => {
  const syncButton = document.getElementById('sync')
  if (syncButton) {
    syncButton.style.display = ''
  }
}

export const hideSyncButton = () => {
  const syncButton = document.getElementById('sync')
  if (syncButton) {
    syncButton.style.display = 'none'
    handleDisableSync()
  }
}
