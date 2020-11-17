<template>
  <form>
    <input v-model="title" type="text" name="title" />
    <button @click.prevent="createTodo">Create Todo</button>
  </form>
</template>

<script>
export default {
  name: "TodoForm",
  data() {
    return {
      title: ""
    };
  },
  methods: {
    createTodo() {
      const newTodo = {
        title: this.title,
        isComplete: false
      };

      this.$store.dispatch('todos/createTodo', newTodo)
    }
  }
};
</script>
