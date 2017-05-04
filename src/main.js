import Vue from 'vue'
import Notes from './Notes.vue'

function main() {
  let segments = window.location.pathname.split('/')

  if (['issues', 'pull'].includes(segments[3]) && segments[4]) {
    initializeNotes()
  }
}

function initializeNotes() {
  let sidebar = document.getElementById('partial-discussion-sidebar')
  sidebar.innerHTML = `<div id="notes-for-github"></div>` + sidebar.innerHTML

  let app = new Vue({
    el: '#notes-for-github',
    render: h => h(Notes)
  })
}

window.addEventListener('DOMContentLoaded', main, false)
