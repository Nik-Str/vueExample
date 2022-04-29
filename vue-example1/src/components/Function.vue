<template>
  <div>
    <h1>Function & State update with Emit</h1>
    <input @input="displayInputChild" v-model="text" />
    <button type="button" @click="triggerChild">Trigger</button>
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
    displayInputChild() {
      this.$emit('displayInputParent', this.text);
    },
    triggerChild() {
      this.$emit('triggerParent');
    },
  },
  emits: ['displayInputParent', 'triggerParent'],
};
</script>

<style scoped>
div {
  background: rgba(98, 155, 54, 0.289);
}
</style>
