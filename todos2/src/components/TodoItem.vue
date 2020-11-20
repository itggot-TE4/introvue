<template>
  <li>
    <input
      :checked="todoItem.isCompleted"
      @change="toggleCompleted(todoItem.id)"
      type="checkbox"
    />
    <span data-unit="title" @click="showTodo" :class="{ 'is-complete': todoItem.isCompleted }">{{
      todoItem.title
    }}</span>
    <button data-unit="deleteBtn" @click="delTodo(todoItem.id)">X</button>
  </li>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "TodoItem",
  props: ["todoItem"],
  methods: {
    showTodo() {
      this.$router.push({ name: "Todo", params: { id: this.todoItem.id } });
    },
    ...mapActions("todos", ["delTodo", "toggleCompleted"])
  }
};
</script>

<style>
.is-complete {
  text-decoration: line-through;
}
</style>
