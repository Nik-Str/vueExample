<template>
  <div>
    <h1>List & Props</h1>
    <ul>
      <li v-for="(item, index) in list" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: Array,
  },
};
</script>

<style scoped>
div {
  background: rgba(155, 54, 54, 0.289);
}
</style>
