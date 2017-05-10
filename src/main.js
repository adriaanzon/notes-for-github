import Vue from 'vue'
import Notes from './Notes.vue'

Vue.prototype.$bus = new Vue();

function main() {
  let segments = window.location.pathname.split('/')

  if (['issues', 'pull'].includes(segments[3]) && segments[4]) {
    initializeNotes()
  }
}

function initializeNotes() {
  let sidebar = document.getElementById('partial-discussion-sidebar')
  if (sidebar === null) {
    return
  }

  Array.from(document.getElementsByClassName('notes-for-github-component'))
    .forEach((el) => el.outerHTML = '')

  sidebar.innerHTML = `<div id="notes-for-github"></div>` + sidebar.innerHTML

  new Vue({
    el: '#notes-for-github',
    render: h => h(Notes),
    created() {
      window.addEventListener('pjax:beforeReplace', destroyNotes.bind(this))
    }
  })
}

function destroyNotes() {
  this.$destroy()
  console.log(true)
  window.removeEventListener('pjax:beforeReplace', destroyNotes)
}

window.addEventListener('DOMContentLoaded', main, false)
window.addEventListener('pjax:end', main, false)
