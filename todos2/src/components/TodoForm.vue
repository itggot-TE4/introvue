<template>
   <form> 
      <input type="text" name="title">
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
        console.log("created!");
     }
  }
};
</script>
