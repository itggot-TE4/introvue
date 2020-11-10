<template>
  <li>
    <input @change="$emit('toggle-completed', todoItem.id)" type="checkbox" />
    <span>{{ todoItem.title }}</span>
    <button @click="$emit('del-todo', todoItem.id)">X</button>
    {{ todoItem.title }}
  </li>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todoItem"]
};
</script>
