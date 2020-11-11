<template>
  <div class="home">
    <TodoFilter
      :showTodos="showTodos"
      @toggle-show-todos="toggleShowTodos"
      @filter-todos="onFilterTodos"
    />
    <TodoItem
      v-for="todoItem in todoItemFiltered"
      v-show="!todoItem.isFiltered"
      :key="todoItem.id"
      :todoItem="todoItem"
      @del-todo="onDelTodo"
      @toggle-completed="onToggleCompleted"
    />
    <TodoForm @add-todo="onAddTodo" />
    <p>{{todosLeft}}</p>
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
      showTodos: true,
      filter: "",
      todoItems: [
        {
          id: 0,
          title: "write code",
          isFiltered: false,
          isDone: false
        },
        {
          id: 1,
          title: "clean my kitchen...",
          isFiltered: false,
          isDone: false
        }
      ],
      counter: 2
    };
  },
  computed: {
    todoItemFiltered() {
      return this.todoItems.map(todoItem => ({
        ...todoItem,
        isFiltered: !todoItem.title.includes(this.filter) || (!this.showTodos && todoItem.isDone)
      }));
    },
    todosLeft() {
        return this.todoItems.filter(f => !f.isDone).length;
    }
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
      this.filter = filter;
    },
    onDelTodo(id) {
      this.todoItems = this.todoItems.filter(f => f.id !== id);
    },
    onToggleCompleted(id) {
      const todoItem = this.todoItems.find(f => f.id == id);
      todoItem.isDone = !todoItem.isDone;
    },
    toggleShowTodos() {
      this.showTodos = !this.showTodos;
    }
  },
  components: {
    TodoItem,
    TodoForm,
    TodoFilter
  }
};
</script>