<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";

export default {
  name: "Todo",
  mounted() {
    console.log(this.getTodos)
    console.log(this.$route.params.id);
    console.log(this.$store.state.todos.find(f => f.id == this.$route.params.id));
    console.log(this.todoItem(this.$route.params.id))
  },
  computed: {
    todoItem() {
      return this.$store.getters.getTodoById;
    },
    getTodos() {
      return this.$store.getters.getTodos;
    }
  },
  //components: { TodoItem }
};
</script>
