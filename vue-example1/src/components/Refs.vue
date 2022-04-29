<template>
  <div>
    <h1>Refs</h1>
    <button type="button" ref="buttonRef" @click="handleClick">useRef wannabe!</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick() {
      this.$refs.buttonRef.style.backgroundColor = 'red';
    },
  },
};
</script>

<style scoped>
div {
  background: rgba(106, 54, 155, 0.289);
}
</style>
