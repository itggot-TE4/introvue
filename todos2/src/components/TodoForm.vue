<template>
   <form> 
      <input type="text" name="title">
      <button>Create Todo</button>
   </form>
</template>

<script>
export default {
  name: "TodoForm",
  data() {
     return {
        title: ""
     }
  }
};
</script>
