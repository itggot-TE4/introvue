<template>
  <div class="home">
    <TodoItem
      v-for="todoItem in todoItems"
      :key="todoItem.id"
      :todoItem="todoItem"
    />
    <TodoForm @add-todo="onAddTodo" />
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import TodoForm from "./TodoForm.vue";

export default {
  name: "Home",
  data() {
    return {
      todoItems: [
        {
          id: 0,
          title: "write code"
        },
        {
          id: 1,
          title: "clean my kitchen..."
        }
      ],
      counter: 2
    };
  },
  methods: {
    onAddTodo(title) {
      console.log(title);
      this.todoItems.push({
        id: this.counter++,
        title: title
      });
    }
  },
  components: {
    TodoItem,
    TodoForm
  }
};
</script>