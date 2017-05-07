// TODO: handle errors using 'chrome.runtime.lastError'
// https://developer.chrome.com/extensions/storage
// https://developer.chrome.com/extensions/runtime#property-lastError

export default class Storage {
  static get(key, defaultValue) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(key, (items) => {
        resolve(Object.keys(items).length ? JSON.parse(items[key]) : defaultValue)
      })
    })
  }

  static set(key, value) {
    let items = {}
    items[key] = JSON.stringify(value)

    return new Promise((resolve, reject) => {
      chrome.storage.sync.set(items, resolve)
    })
  }

  static delete(key) {
  }

  static exists(key) {
  }
}
