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
  props: ['showTodos'],
  data() {
     return {
        filter: ""
     }
  },
  methods: {
     filterTodos() {
        this.$emit('filter-todos', this.filter);
     }
  }
};
</script>
