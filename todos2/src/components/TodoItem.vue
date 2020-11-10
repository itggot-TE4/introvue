<template>
  <li>
     {{todoItem.title}}
  </li>
</template>

<script>
export default {
  name: "TodoItem",
  props: ['todoItem']
};
</script>
