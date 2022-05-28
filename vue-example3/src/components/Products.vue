<template>
  <div class="grid">
    <div class="row">
      <div class="card col-6 col-md-4 col-lg-3 px-3 py-1 border-0" v-for="item in products" :key="item.id">
        <img
          :src="`${$store.state.base_url}/image/${item.image_one}`"
          class="card-img-top"
          alt="product"
          @click="$store.commit('setModal', item)"
          data-bs-toggle="modal"
          data-bs-target="#productModal"
        />
        <div class="card-body p-1">
          <div class="d-flex justify-content-between">
            <p class="card-title mb-0" :style="{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }">
              {{ item.title }}
            </p>
            <i
              v-if="!$store.state.favourites.some((para) => para.id === item.id)"
              class="bi bi-star ps-4"
              @click="$store.commit('addToFavourites', item)"
            ></i>
            <i
              v-if="$store.state.favourites.some((para) => para.id === item.id)"
              class="bi bi-star-fill ps-4"
              @click="$store.commit('addToFavourites', item)"
            ></i>
          </div>

          <div class="mt-0" :style="{ fontSize: '0.9rem' }">
            <p class="text-secondary mb-0">{{ item.brand }}</p>
            <p class="fw-bold">{{ item.price }} €</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  props: {
    products: Array,
  },
};
</script>

<style lang="scss" scoped>
i:hover {
  cursor: pointer;
}

img:hover {
  cursor: pointer;
  -webkit-filter: opacity(80%);
  filter: opacity(80%);
}
</style>
