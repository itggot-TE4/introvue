<template>
  <li>
    <input
      :checked="todoItem.isCompleted"
      @change="$emit('toggle-completed', todoItem.id)"
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
    }
  }
};
</script>

<style>
.is-complete {
  text-decoration: line-through;
}
</style>
