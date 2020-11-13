<template>
  <div class="home">
    <div>
      {{ todo.title }}
    </div>
    <input type="text" v-model="todo.title" />
    <textarea v-model="todo.description" />
    <button @click="updateTodo">Update Todo</button>
  </div>
</template>

<script>
export default {
  name: "Todo",
  data() {
    return {
      todo: {
        title: "",
        description: "",
        isCompleted: 0
      }
    };
  },
  methods: {
    updateTodo() {
      this.todo = {
        title: this.todo.title,
        description: this.todo.description,
        isCompleted: this.todo.isCompleted
      }
      fetch(`http://localhost:9292/api/v1/todos/${this.$route.params.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(this.todo)
      })
    }
  },
  mounted() {
    console.log('making request')
    fetch(`http://localhost:9292/api/v1/todos/${this.$route.params.id}`, {
      method: "get",
      headers: {
        "content-type": "application/json"
      }
    }).then(res => {
        console.log(res)
        return res.json();
      })
      .then(json => (this.todo = json)).catch( error=> console.log(error))  

    // if logged in
    // console.log(this.$route.params);
  }
};
</script>
