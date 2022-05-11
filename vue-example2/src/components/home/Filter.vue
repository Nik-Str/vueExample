<template>
  <button type="button" class="btn btn-dark me-4" @click="handleClick">{{ text }}</button>
</template>

<script>
export default {
  name: 'Filter',
  props: {
    text: String,
  },
  methods: {
    handleClick() {
      this.$emit('handleClick');
    },
  },
  emits: ['handleClick'],
};
</script>

<style lang="scss" scoped>
.btn {
  width: 5rem;
}
</style>
