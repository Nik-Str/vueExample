<template>
  <div class="d-flex justify-content-center align-items-center" :style="{ height: '50vh' }">
    <div class="spinner-border" role="status" :style="{ height: '3rem', width: '3rem' }">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
};
</script>
