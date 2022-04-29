<template>
  <div class="container">
    <button @click="handleLimit5">Limit 5</button>
    <button @click="handleLimit10">Limit 10</button>
  </div>
  <div v-if="display" class="container">
    <div>
      <ul v-if="$store.state.fetcher.data && !$store.state.fetcher.isLoading">
        <li v-for="(item, index) in $store.state.fetcher.data" :key="index">
          {{ item.title }}
        </li>
      </ul>
      <p v-if="$store.state.fetcher.isLoading">Loading...</p>
      <p v-if="$store.state.fetcher.isErrror">{{ $store.state.fetcher.isErrror }}</p>
    </div>
  </div>
  <div v-if="!display" class="container">
    <div>
      <ul v-for="(item, index) in filtered" :key="index">
        <li>
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  props: {
    isSearching: Boolean,
  },
  data() {
    return {
      display: true,
      filtered: [],
    };
  },
  methods: {
    handleLimit5() {
      this.filtered = this.$store.getters.limit5;
      this.display = false;
    },
    handleLimit10() {
      this.filtered = this.$store.getters.limit10;
      this.display = false;
    },
  },
  watch: {
    isSearching(value) {
      this.display = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  text-align: left;
}
</style>
