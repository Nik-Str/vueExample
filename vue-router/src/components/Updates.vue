<template>
  <div class="container">
    <div>
      <button @click="handleClick">Change color</button>
      <div class="displayColor" :style="{ backgroundColor: background }"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Updates',
  data() {
    return {
      background: 'grey',
      colors: ['grey', 'black', 'blue', 'red', 'yellow'],
      selected: 0,
    };
  },
  methods: {
    handleClick() {
      if (this.selected < 4) this.selected++;
      else this.selected = 0;
    },
  },
  watch: {
    selected() {
      this.background = this.colors[this.selected];
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;

  div {
    text-align: center;

    button {
      padding: 0.8rem;
      border-radius: 1.5rem;
      background-color: rgba(47, 137, 169, 0.352);
      border: none;
      color: white;
      font-weight: bold;
    }

    button:hover {
      cursor: pointer;
      background-color: rgba(47, 137, 169, 0.654);
    }

    .displayColor {
      margin-top: 4rem;
      height: 10rem;
      width: 10rem;
    }
  }
}
</style>
