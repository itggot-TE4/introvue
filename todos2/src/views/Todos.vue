<template>
  <div>
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
    />
    <TodoForm />
    <p>{{ todosLeft }}</p>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";
import TodoForm from "@/components/TodoForm.vue";
import TodoFilter from "@/components/TodoFilter.vue";
import { mapState } from "vuex";

export default {
  name: "Todos",
  data() {
    return {
      showTodos: true,
      filter: ""
    };
  },
  computed: {
    todoItemFiltered() {
      return this.todos.map(todoItem => ({
        ...todoItem,
        isFiltered:
          !todoItem.title.includes(this.filter) ||
          (!this.showTodos && todoItem.isCompleted)
      }));
    },
    todosLeft() {
      return this.todos.filter(f => !f.isCompleted).length;
    },
    ...mapState('todos', ["todos"])
  },
  watch: {
    todosLeft: function(newValue, _oldValue) {
      if (newValue == 0) {
        alert("hurray!! No todos left!");
      }
    }
  },
  methods: {
    onFilterTodos(filter) {
      this.filter = filter;
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
