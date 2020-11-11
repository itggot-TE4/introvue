<template>
   <form> 
      <input v-model="title" type="text" name="title">
      <button @click.prevent="createTodo">Create Todo</button>
   </form>
</template>

<script>
export default {
  name: "TodoForm",
  data() {
     return {
        title: ""
     }
  },
  methods: {
     createTodo() {
        this.$emit('add-todo', this.title);
     }
  }
};
</script>
