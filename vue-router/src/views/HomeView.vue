<template>
  <h1>Search</h1>
  <Search @handleSearch="handleSearch" />
  <List :data="data" :isLoading="isLoading" :isError="isError" />
</template>

<script>
import Search from '../components/Search.vue';
import List from '../components/List.vue';

export default {
  name: 'HomeView',
  components: {
    Search,
    List,
  },
  data() {
    return {
      data: [],
      isLoading: false,
      isError: null,
    };
  },
  methods: {
    handleSearch(search) {
      this.isLoading = true;
      this.isError = null;
      fetch(`https://hn.algolia.com/api/v1/search?query=${search}`)
        .then((res) => res.json())
        .then((res) => {
          this.data = res.hits.slice(0, 10);
          this.isLoading = false;
        })
        .catch((err) => {
          this.isError = err;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  margin-top: 0rem;
  padding-top: 2rem;
}
</style>
