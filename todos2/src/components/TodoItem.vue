<template>
  <li>
    <input type="checkbox" />
    <span>{{ todoItem.title }}</span>
    <button>X</button>
    {{ todoItem.title }}
  </li>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todoItem"]
};
</script>
