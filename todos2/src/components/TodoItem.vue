<template>
  <li>
    <input
      :checked="todoItem.isCompleted"
      @change="toggleTodo"
      type="checkbox"
    />
    <span @click="showTodo" :class="{ 'is-complete': todoItem.isCompleted }">{{
      todoItem.title
    }}</span>
    <button @click="delTodo">X</button>
    {{ todoItem.title }}
  </li>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todoItem"],
  methods: {
    showTodo() {
      this.$router.push({ name: "Todo", params: { id: this.todoItem.id } });
    },
    delTodo() {
      fetch(`http://localhost:9292/api/v1/todos/${this.todoItem.id}`, {
        method: "delete",
        headers: {
          "content-type": "application/json"
        }
      }).then(json => this.$store.commit('delTodo', this.todoItem.id));
    },
    toggleTodo() {
      fetch(`http://localhost:9292/api/v1/todos/${this.todoItem.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          isCompleted: this.todoItem.isCompleted
        })
      }).then(json => {
        console.log("heck yeaa");
        this.todoItem.isCompleted = !this.todoItem.isCompleted;
      });
    }
  }
};
</script>

<style>
.is-complete {
  text-decoration: line-through;
}
</style>
