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

export const handleEnableSync = () => {
  const sync = document.getElementById('sync')
  const syncStatusIconActive = document.getElementById(
    'sync-status-icon-active'
  )
  const syncStatusIconInactive = document.getElementById(
    'sync-status-icon-inactive'
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
    'sync-status-icon-active'
  )
  const syncStatusIconInactive = document.getElementById(
    'sync-status-icon-inactive'
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
