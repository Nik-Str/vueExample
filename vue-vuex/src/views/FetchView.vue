<template>
  <div>
    <input type="text" v-model="search" />
    <button @click="handleSearch">Search</button>
  </div>
  <List :isSearching="isSearching" />
</template>

<script>
import List from '../components/List.vue';

export default {
  name: 'FetchView',
  data() {
    return {
      search: '',
      isSearching: true,
    };
  },
  components: {
    List,
  },
  methods: {
    handleSearch() {
      this.isSearching = !this.isSearching;
      this.$store.dispatch('getData', this.search);
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 3rem;
}
</style>
