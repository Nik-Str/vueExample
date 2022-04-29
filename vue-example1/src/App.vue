<template>
  <Input />
  <List :list="list" />
  <Condition />
  <Function @displayInputParent="displayInput" @triggerParent="trigger" />
  <p>{{ text }}</p>
  <p>{{ triggerState }}</p>
  <SideEffect />
  <Refs />
</template>

<script>
import Input from './components/Input.vue';
import List from './components/List.vue';
import Condition from './components/Condition.vue';
import Function from './components/Function.vue';
import SideEffect from './components/SideEffect.vue';
import Refs from './components/Refs.vue';

export default {
  name: 'App',
  components: {
    Input,
    List,
    Condition,
    Function,
    SideEffect,
    Refs,
  },
  data() {
    return {
      list: ['ost', 'tårta', 'bananer', 'ostkaka', 'bilar'],
      text: '',
      triggerState: '',
    };
  },
  methods: {
    displayInput(value) {
      this.text = value;
      console.log(this.text);
    },
    trigger() {
      this.triggerState = 'So much trigged by this click!';
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
