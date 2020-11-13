<template>
  <input @keyup="filterTodos" v-model="filter" type="text" />
  <div>
    <span>Show all todos</span>
    <input :checked="showTodos" @change="toggleShowTodos" type="checkbox" />
  </div>
</template>

<script>
export default {
  name: "TodoFilter",
  props: ["showTodos"],
  data() {
    return {
      filter: ""
    };
  },
  methods: {
    filterTodos() {
      this.$emit("filter-todos", this.filter);
    },
    toggleShowTodos() {
      this.$emit("toggle-show-todos");
    }
  }
};
</script>
