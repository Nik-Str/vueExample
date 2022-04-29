<template>
  <p>{{ helper }}</p>
  <button @click="callHelp">Mutations</button>
  <button @click="someHelp('React')">Actions</button>
  <p>{{ slicer }}</p>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';

export default {
  name: 'HelperView',
  methods: {
    ...mapMutations(['callHelp']),
    ...mapActions(['someHelp']),
  },
  computed: {
    ...mapState({
      helper: (state) => state.helper.helpState,
    }),
    ...mapGetters({
      slicer: 'helpSlice',
    }),
  },
};
</script>

<style lang="sss" scoped></style>
