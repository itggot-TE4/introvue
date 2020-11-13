<template>
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
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";
import TodoForm from "@/components/TodoForm.vue";
import TodoFilter from "@/components/TodoFilter.vue";
import { v4 as uuid } from 'uuid';

export default {
  name: "Todos",
  data() {
    return {
      showTodos: true,
      filter: "",
      todoItems: []
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
          (!this.showTodos && todoItem.isCompleted)
      }));
    },
    todosLeft() {
      return this.todoItems.filter(f => !f.isCompleted).length;
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
    onAddTodo(obj) {
      const newTodo = {
        id: uuid(),
        title: obj.title,
        description: obj.description,
        isComplete: false
      };

      fetch("http://localhost:9292/api/v1/todos", {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(newTodo)
      })
        .then(json => {
          return json.json()
        })
        .then(resp => this.todoItems.push(resp));
    },
    onFilterTodos(filter) {
      this.filter = filter;
    },
    onDelTodo(id) {
      fetch(`http://localhost:9292/api/v1/todos/${id}`, {
        method: "delete",
        headers: {
          "content-type": "application/json"
        }
      }).then(
        json => (this.todoItems = this.todoItems.filter(f => f.id !== id))
      );
    },
    onToggleCompleted(id) {
      const todoItem = this.todoItems.find(f => f.id == id);
      fetch(`http://localhost:9292/api/v1/todos/${id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          isCompleted: todoItem.isCompleted
        })
      }).then(json => {
        console.log("heck yeaa");
        todoItem.isCompleted = !todoItem.isCompleted;
      });
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
