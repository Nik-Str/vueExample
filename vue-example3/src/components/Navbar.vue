<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-transparent border-bottom">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <img src="../assets/logo.png" alt="" :style="{ width: '10rem', height: 'auto' }"
      /></router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/male" class="nav-link fw-bold">Male</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/female" class="nav-link fw-bold">Female</router-link>
          </li>
          <li class="my-auto d-none d-lg-block">|</li>
          <li class="nav-item">
            <router-link to="/favourites" class="nav-link fw-bold">
              <i v-if="$store.state.favourites.length === 0" class="bi bi-star"></i>
              <i v-if="$store.state.favourites.length >= 1" class="bi bi-star-fill"></i>
            </router-link>
          </li>
          <li class="nav-item nav-link" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight">
            <i class="bi bi-bag"></i> <span :style="{ fontSize: '0.8rem' }">0</span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>
