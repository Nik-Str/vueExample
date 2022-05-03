<template>
  <div>
    <p>{{ $store.state.counter.count }}</p>
    <div>
      <button @click="$store.commit('increment', 1)">+</button>
      <button @click="$store.commit('decrement', 1)">-</button>
    </div>
    <div :style="{ marginTop: '2rem' }">
      <input type="text" v-model="number" />
      <button @click="handleMulti">Multiply</button>
    </div>
    <p>{{ result }}</p>
  </div>
</template>

<script>
export default {
  name: 'CounterView',
  data() {
    return {
      number: 0,
      result: 0,
    };
  },
  methods: {
    handleMulti() {
      this.result = this.$store.getters.multi(this.number);
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  text-align: center;
}
div {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
