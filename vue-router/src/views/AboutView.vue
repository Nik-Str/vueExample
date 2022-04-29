<template>
  <h1>Updates</h1>
  <Todos :todo="todo" @handleToggled="handleToggled" @handleRemove="handleRemove" />
</template>

<script>
import Todos from '../components/Todos.vue';
export default {
  name: 'AboutView',
  components: {
    Todos,
  },
  data() {
    return {
      todo: [],
    };
  },
  methods: {
    handleToggled(id) {
      this.todo = this.todo.map((item) => {
        if (item.id === id) return { ...item, toggled: !item.toggled };
        else return item;
      });
    },
    handleRemove(id) {
      this.todo = this.todo.filter((item) => item.id !== id);
    },
  },
  mounted() {
    this.todo = [
      { id: 1, title: 'Remove book from shell', deadline: '2022-04-28', toggled: false },
      { id: 2, title: 'Handle payments from spotify', deadline: '2022-03-05', toggled: false },
      { id: 3, title: 'Play video-games with neighbor', deadline: '2022-05-14', toggled: false },
      { id: 4, title: 'Watch awsome move with wife', deadline: '2022-06-10', toggled: false },
    ];
  },
};
</script>

<style scoped style="scss">
h1 {
  text-align: center;
  margin: 0rem;
  padding-top: 2rem;
}
</style>
