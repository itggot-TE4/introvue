<template> 
    <input @keyup="filterTodos" v-model="filter" type="text">
</template>

<script>
export default {
  name: "TodoFilter",
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
