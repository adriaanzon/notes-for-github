<template>
  <div class="discussion-sidebar-item sidebar-assignee position-relative notes-for-github-component">
    <button type="button"
            class="discussion-sidebar-heading discussion-sidebar-toggle"
            aria-label="Add a new note"
            aria-haspopup="true"
            @click="createNote()">
      Notes
    </button>

    <note
      v-for="note in notes"
      :saved-text.sync="note.text"
    ></note>

    <div v-if="!loading && notes.length == 0">
      None—<button class="btn-link muted-link" @click="createNote()">create your first one</button>
    </div>

    <div v-if="loading">Loading...</div>
  </div>
</template>

<script>
import Note from './Note.vue'
import Storage from './Storage'

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

    Storage.get(this.selector, [])
      .then((notes) => {
        this.notes = notes
        this.loading = false
      })

    this.$bus.$on('persist', this.saveNotes)
  },

  methods: {
    createNote() {
      this.notes.push({ text: '' })
    },
    saveNotes() {
      Storage.set(this.selector, this.notes)
    }
  },

  computed: {
    selector() {
      return `${this.repoId}#${this.issueId}`
    }
  }
}
</script>
