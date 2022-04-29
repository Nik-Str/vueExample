<template>
  <div>
    <p v-if="isLoading">Searching...</p>
    <p v-if="isError">{{ isError }}</p>
    <ul v-if="data && !isLoading && !isError">
      <li v-for="(item, index) in data" :key="index">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    data: Array,
    isLoading: Boolean,
    isError: String || null,
  },
};
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  p {
    text-align: center;
    font-weight: bold;
  }

  ul {
    li {
      padding: 0.4rem;
    }

    li:hover {
      color: #42b983;
      cursor: pointer;
    }
  }
}
</style>
