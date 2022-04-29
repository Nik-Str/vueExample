<template>
  <div>
    <h1>Condition</h1>
    <p v-if="isShowing">Show</p>
    <p v-if="!isShowing">Hide</p>
    <button :onclick="handleShow">{{ isShowing ? 'Remove' : 'Display' }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowing: true,
    };
  },
  methods: {
    handleShow() {
      this.isShowing = !this.isShowing;
    },
  },
};
</script>

<style scoped>
div {
  background: rgba(59, 59, 59, 0.289);
}
</style>
