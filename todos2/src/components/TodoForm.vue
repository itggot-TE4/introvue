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

      fetch("http://localhost:9292/api/v1/todos", {
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(newTodo)
      }).then(json => this.$store.commit('addTodo', newTodo));
    }
  }
};
</script>
