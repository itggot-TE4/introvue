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
    <button @click="$emit('del-todo', todoItem.id)">X</button>
    {{ todoItem.title }}
  </li>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todoItem"],
  methods: {
    showTodo() {
      this.$router.push({name: 'Todo', params: {id: this.todoItem.id}});
    }
  }
};
</script>

<style>
.is-complete {
  text-decoration: line-through;
}
</style>
