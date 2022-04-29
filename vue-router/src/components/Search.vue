<template>
  <div>
    <input @input="handleSearch" type="text" v-model="search" placeholder="Search..." />
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      search: '',
    };
  },
  methods: {
    handleSearch() {
      this.$emit('handleSearch', this.search);
    },
  },
  emits: ['handleSearch'],
};
</script>

<style scoped lang="scss">
div {
  width: 100%;
  display: flex;
  justify-content: center;

  input {
    width: 20rem;
    height: 1.5rem;
    font-size: 1.1rem;
    border-radius: 0.5rem;
    border: 2px solid rgba(84, 84, 84, 0.58);
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  input::placeholder {
    color: rgba(0, 0, 0, 0.222);
  }

  input:focus {
    outline: none !important;
    border: 2px solid rgba(84, 84, 84, 0.85);
    box-shadow: 0 0 1px rgba(84, 84, 84, 0.447);
  }
}
</style>
