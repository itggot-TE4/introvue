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
    <p>{{ todosLeft }}</p>
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
      todoItems: [],
      counter: 2
    };
  },
  mounted() {
    fetch("http://localhost:9292/api/v1/todos", {
      method: "get",
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(json => (this.todoItems = json));
  },
  computed: {
    todoItemFiltered() {
      return this.todoItems.map(todoItem => ({
        ...todoItem,
        isFiltered:
          !todoItem.title.includes(this.filter) ||
          (!this.showTodos && todoItem.isDone)
      }));
    },
    todosLeft() {
      return this.todoItems.filter(f => !f.isDone).length;
    }
  },
  watch: {
    todosLeft: function(newValue, _oldValue) {
      if (newValue == 0) {
        alert("hurray!! No todos left!");
      }
    }
  },
  methods: {
    onAddTodo(title) {
      const newTodo = {
        id: this.counter++,
        title: title,
        isComplete: false
      };

      console.log(title);
      fetch("http://localhost:9292/api/v1/todos", {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(newTodo)
      }).then(json => this.todoItems.push(newTodo));
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