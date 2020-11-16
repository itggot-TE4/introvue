<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <TodoItem :todo-item="todoItem" />
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem.vue";

export default {
  name: "Todo",
  computed: {
    todoItem() {
      return this.$store.getters.getTodoById(+this.$route.params.id);
    }
  },
  watch: {
    todoItem(newValue, _oldValue) {
      if (newValue == undefined) {
        alert('OH NOES');
        this.$router.replace('../todos')
      }
    }
  },
  components: { TodoItem }
};
</script>
