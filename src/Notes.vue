<template>
    <div class="discussion-sidebar-item sidebar-assignee js-discussion-sidebar-item position-relative">
        <button type="button"
                class="discussion-sidebar-heading discussion-sidebar-toggle js-menu-target"
                aria-label="Add a new note"
                aria-haspopup="true"
                @click="createNote()">
            Notes
        </button>

        <div v-for="note in notes">
            <span v-if="!note.isEditing">
                {{ note.content }}
            </span>

            <textarea class="form-control" v-model="note.content" v-else></textarea>

            <button v-if="note.isEditing" class="btn btn-sm pull-right" @click="saveNotes(note)">
                Save
            </button>
            <button v-if="!note.isEditing" class="btn btn-sm pull-right" @click="note.isEditing = true">
                Edit
            </button>
        </div>
        <div v-if="!loading && notes.length == 0">
            None—<button class="btn-link muted-link" @click="createNote()">create your first one</button>
        </div>
        <div v-if="loading">Loading...</div>
    </div>
</template>

<script>
export default {
    data: () => ({
        id: 0,
        loading: true,
        notes: [
            // { text, isEditing }
        ]
    }),

    created() {
        this.id = window.location.pathname.split('/')[4]
        chrome.storage.sync.get(this.id, (notes) => {
            if (Object.keys(notes).length) {
                this.notes = JSON.parse(notes[this.id])
            }
            this.loading = false
        })
    },

    methods: {
        createNote() {
            this.notes.push({ text: '', isEditing: true })
        },
        saveNotes(note) {
            note.isEditing = false
            let data = {}
            data[this.id] = JSON.stringify(this.notes)
            chrome.storage.sync.set(data)
        }
    },
}
</script>
