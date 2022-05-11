<template>
  <div class="d-flex justify-content-between align-items-center pt-4 pb-2">
    <h1>{{ title }}</h1>
    <div>
      <!-- Filter -->
      <button
        type="button"
        class="btn btn-link text-dark text-decoration-none"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasLeft"
      >
        <i class="bi bi-sliders2 me-1"></i>Filter
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Filtermenu',
  props: {
    title: String,
  },
};
</script>

<style lang="scss" scoped></style>
