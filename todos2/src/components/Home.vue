<template>
  <div class="home">
      <TodoItem v-for="todoItem in todoItems"
                :key="todoItem.id"
                :todoItem="todoItem" />
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";

export default {
  name: "Home",
  data() {
      return {
          todoItems: [
              {
                  id: 0,
                  title: 'write code'
              },
              {
                  id: 1,
                  title: 'clean my kitchen...'
              }
          ]
      }
  },
  components: {
      TodoItem
  }
};
</script>