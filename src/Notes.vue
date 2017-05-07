<template>
  <div class="discussion-sidebar-item sidebar-assignee js-discussion-sidebar-item position-relative">
    <button type="button"
            class="discussion-sidebar-heading discussion-sidebar-toggle js-menu-target"
            aria-label="Add a new note"
            aria-haspopup="true"
            @click="createNote()">
      Notes
    </button>

    <note v-for="note in notes" :saved-text.sync="note.text"></note>
    <div v-if="!loading && notes.length == 0">
      None—<button class="btn-link muted-link" @click="createNote()">create your first one</button>
    </div>
    <div v-if="loading">Loading...</div>
  </div>
</template>

<script>
import Note from './Note.vue'

export default {
  components: {
    Note
  },

  data: () => ({
    repoId: 0,
    issueId: 0,
    loading: true,
    notes: []
  }),

  created() {
    this.issueId = window.location.pathname.split('/')[4]
    this.repoId = document.querySelector('meta[name="octolytics-dimension-repository_id"]').getAttribute('content')

    chrome.storage.sync.get(this.selector, (notes) => {
      if (Object.keys(notes).length) {
        this.notes = JSON.parse(notes[this.selector])
      }
      this.loading = false
    })

    this.$bus.$on('persist', this.saveNotes)
  },

  methods: {
    createNote() {
      this.notes.push({ text: '' })
    },
    saveNotes() {
      let data = {}
      data[this.selector] = JSON.stringify(this.notes)
      chrome.storage.sync.set(data)
    }
  },

  computed: {
    selector() {
      return `${this.repoId}#${this.issueId}`
    }
  }
}
</script>
