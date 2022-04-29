<template>
  <div class="container" v-if="todo">
    <div>
      <div
        v-for="item in todo"
        :key="item.id"
        class="updates"
        :style="{ marginTop: '2rem' }"
        :class="{ toggled: item.toggled }"
        @dblclick="handleToggled(item.id)"
      >
        <div>
          <p>{{ item.title }}</p>
          <button @click="handleRemove(item.id)">x</button>
        </div>
        <p :style="{ paddingTop: '0.5rem' }">{{ item.deadline }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Todos',
  props: {
    todo: Array,
  },
  methods: {
    handleToggled(id) {
      this.$emit('handleToggled', id);
    },
    handleRemove(id) {
      this.$emit('handleRemove', id);
    },
  },
  emits: ['handleToggled', 'handleRemove'],
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  display: flex;
  justify-content: center;

  .updates {
    background-color: rgba(216, 135, 135, 0.509);
    height: 4rem;
    border-radius: 1rem;
    padding: 1rem;

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      p {
        margin-right: 1rem;
      }
      button {
        height: 1.5rem;
      }
      button:hover {
        cursor: pointer;
      }
    }
    p {
      margin: 0rem;
    }
  }
  .toggled {
    border-left: 4px solid rgb(216, 135, 135);
  }
}
</style>
