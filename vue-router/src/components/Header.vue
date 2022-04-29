<template>
  <header>
    <div class="logoContainer">
      <img src="../assets/logo.png" alt="Logo" />
    </div>
    <nav>
      <router-link to="/">Home</router-link> | 
      <router-link to="/effect">Effect</router-link> |
      <router-link to="/altProps">AltProps</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(69, 69, 69, 0.17);
  height: 10vh;

  img {
    padding-left: 1rem;
    max-width: 4rem;
    height: auto;
  }
}

nav {
  padding-right: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
