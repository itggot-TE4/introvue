<template> 
    <input @keyup="filterTodos" v-model="filter" type="text">
    <div>
        <span>Show all todos</span>
        <input v-model="showTodos" type="checkbox" />
    </div>
</template>

<script>
export default {
  name: "TodoFilter",
  data() {
     return {
        filter: "",
        showTodos: true
     }
  },
  methods: {
     filterTodos() {
        this.$emit('filter-todos', this.filter);
     }
  }
};
</script>
