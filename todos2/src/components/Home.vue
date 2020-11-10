<template>
  <div class="home">
    <TodoFilter @filter-todos="onFilterTodos"/>
    <TodoItem
      v-for="todoItem in todoItems"
      v-show="!todoItem.isFiltered"
      :key="todoItem.id"
      :todoItem="todoItem"
    />
    <TodoForm @add-todo="onAddTodo" />
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import TodoForm from "./TodoForm.vue";
import TodoFilter from "./TodoFilter.vue";

export default {
  name: "Home",
  data() {
    return {
      todoItems: [
        {
          id: 0,
          title: "write code",
          isFiltered: false
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
    },
    onFilterTodos(filter) {
        this.todoItems.forEach(todoItem => {
            todoItem.isFiltered = todoItem.title.includes(filter);
        })
    }
  },
  components: {
    TodoItem,
    TodoForm,
    TodoFilter
  }
};
</script>