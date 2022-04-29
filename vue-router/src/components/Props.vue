<template>
  <div class="container">
    <div>
      <p :style="{ marginBottom: '0rem' }">Provied can pass down props to eliminate props drilling.</p>
      <p :style="{ marginTop: '0rem', marginBottom: '0rem' }">
        This method i very useful if you have deeply nested components.
      </p>
      <p :style="{ marginTop: '0rem', marginBottom: '0rem' }">
        Though, it only runs once on init, so dynamic states wont work.
      </p>
      <p :style="{ marginTop: '0rem' }">A typical usecase would be passing down static content to underlying comps.</p>
      <p>
        This is: <span class="thisText">{{ message }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Props',
  inject: ['message'],
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;

  .thisText {
    font-weight: bold;
    color: red;
  }
}
</style>
