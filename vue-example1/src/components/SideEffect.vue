<template>
  <div>
    <h1>SideEffects</h1>
    <input type="text" v-model="search" />
    <p v-if="isLoading">Loading...</p>
    <p v-if="isError">{{ isError }}</p>
    <ul v-show="!isLoading">
      <li v-for="(item, index) in data" :key="index">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      isLoading: false,
      isError: false,
      data: null,
    };
  },
  watch: {
    search() {
      this.isLoading = true;
      fetch(`https://hn.algolia.com/api/v1/search?query=${this.search}`)
        .then((response) => response.json())
        .then((data) => {
          this.data = data.hits;
          this.isLoading = false;
        })
        .catch((err) => {
          this.isError = err;
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
p {
  color: red;
  font-size: 2rem;
}
div {
  background: rgba(54, 125, 155, 0.289);
}
</style>
