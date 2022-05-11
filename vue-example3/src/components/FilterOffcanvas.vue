<template>
  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasLeft">
    <div class="offcanvas-header">
      <h4 id="offcanvasRightLabel">Filter & Sort</h4>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <h6 class="fw-bold">Sort articles by</h6>
      <div class="form-check" v-for="(item, index) in $store.state.allSorts" :key="index + item">
        <input
          class="form-check-input"
          name="sort"
          type="radio"
          :id="index + item"
          @change="$store.commit('sortArticles', item)"
        />
        <label class="form-check-label" :for="index + item">{{ item }}</label>
      </div>
      <h6 class="mt-4 fw-bold">Filter by Category</h6>
      <div class="form-check" v-for="(item, index) in $store.state.allCategories" :key="index + item">
        <input
          class="form-check-input"
          type="checkbox"
          :id="index + item"
          @change="$store.commit('filterByCategory', item)"
        />
        <label class="form-check-label" :for="index + item">{{ item }}</label>
      </div>

      <h6 class="mt-4 fw-bold">Filter by Brand</h6>
      <div class="form-check" v-for="(item, index) in $store.state.allBrands" :key="index + item">
        <input
          class="form-check-input"
          type="checkbox"
          :id="index + item"
          @change="$store.commit('filterByBrand', item)"
        />
        <label class="form-check-label" :for="index + item">{{ item }}</label>
      </div>

      <h6 class="mt-4 fw-bold">Filter by Size</h6>
      <div class="form-check" v-for="(item, index) in $store.state.allSizes" :key="index + item">
        <input
          class="form-check-input"
          type="checkbox"
          :id="index + item"
          @change="$store.commit('filterBySize', item)"
        />
        <label class="form-check-label" :for="index + item">{{ item.toUpperCase() }}</label>
      </div>
      <h6 class="mt-4 fw-bold">Filter by Color</h6>
      <div class="d-flex flex-wrap" :style="{ maxWidth: '7rem' }">
        <div
          class="colorSelection d-flex justify-content-center align-items-center text-center"
          v-for="(item, index) in $store.state.allColors"
          :key="index + item"
          @click="$store.commit('filterByColor', item)"
          :style="{ backgroundColor: item }"
        >
          <i v-if="$store.state.selectedColor.includes(item)" class="bi bi-check-lg"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartOffcanvas',
};
</script>

<style lang="scss" scoped>
.form-check-input:hover {
  cursor: pointer;
}

.form-check-input[type='checkbox'] {
  border-radius: 50% !important;
}

.form-check-input:checked {
  background-color: black !important;
  border-color: black !important;
}

.form-check-input:checked[type='checkbox'],
.form-check-input:checked[type='radio'] {
  background-image: none !important;
}

.colorSelection {
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
  border: 1px solid rgba(0, 0, 0, 0.25);

  i {
    color: rgb(62, 62, 62);
    font-size: 1.4rem;
  }
}
.colorSelection:hover {
  cursor: pointer;
}
</style>
