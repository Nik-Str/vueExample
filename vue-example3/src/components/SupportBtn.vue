<template>
  <button
    v-if="this.$route.fullPath !== '/support'"
    type="button"
    class="btn shadow rounded-circle"
    :class="{ 'btn-light': !$store.state.clientHasNewMsg, 'btn-secondary': $store.state.clientHasNewMsg }"
    @click="
      $store.commit('setDisplaySupport');
      $store.commit('initSupportChat', 'client');
      $store.commit('setClientHasNewMsg');
    "
  >
    <i class="bi bi-question"></i>
  </button>
</template>

<script>
export default {
  name: 'SupportBtn',
};
</script>

<style lang="scss" scoped>
button {
  position: fixed;
  right: 0.5rem;
  bottom: 0.5rem;
  border: 1px solid #dee2e6 !important;
}
</style>
