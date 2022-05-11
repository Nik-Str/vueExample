<template>
  <div class="spinner-container">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Spinner',
};
</script>

<style lang="scss" scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  width: 100%;
}
.spinner-border {
  height: 6rem;
  width: 6rem;
}
</style>
