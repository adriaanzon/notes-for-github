<template>
  <div>
    <span v-if="!isEditing">
      {{ text }}
    </span>

    <textarea class="form-control" v-model="text" v-else></textarea>

    <div v-if="isEditing">
      <button class="btn btn-sm pull-right" @click="persist" v-if="text.length">
        Save
      </button>
      <button class="btn-link pull-right" @click="cancel">
        Cancel
      </button>
    </div>
    <button v-if="!isEditing" class="btn btn-sm pull-right" @click="edit">
      Edit
    </button>
  </div>
</template>

<script>
export default {
  data: () => ({
    isEditing: false,
    text: '',
    oldText: '',
  }),

  props: ['savedText'],

  methods: {
    persist() {
      this.isEditing = false
      this.$emit('update:savedText', this.text)
      this.$bus.$emit('persist')
    },

    edit() {
      this.oldText = this.text
      this.isEditing = true
    },

    cancel() {
      this.text = this.oldText
      this.oldText = ''
      this.isEditing = false
    }
  },

  created() {
    this.text = this.savedText

    if (!this.savedText.length) {
      this.isEditing = true
    }
  }
}
</script>
