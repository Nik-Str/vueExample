<template>
  <h1>Proivede | Inject</h1>
  <Props />
</template>

<script>
import Props from '../components/Props.vue';

export default {
  name: 'AltProps',
  components: {
    Props,
  },
  data() {
    return {
      message: 'Provide | Inject (aka sparta!)',
    };
  },
  provide() {
    return {
      message: this.message,
    };
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
