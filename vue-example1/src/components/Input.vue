<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h1>Input & State</h1>
      <input type="text" placeholder="Aaa" v-model="text" />
      <button>Submit</button>
    </form>
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.text);
    },
  },
};
</script>

<style scoped>
div {
  background: rgba(160, 182, 104, 0.289);
}
</style>
