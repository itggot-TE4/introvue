<template>
  <div class="home">
      <TodoItem v-for="todoItem in todoItems"
                :key="todoItem" />
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";

export default {
  name: "Home",
  data() {
      return {
          todoItems: [1, 2, 3]
      }
  },
  components: {
      TodoItem
  }
};
</script>