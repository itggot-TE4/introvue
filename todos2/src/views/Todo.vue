<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <TodoForm :todo="post" @add-todo="onUpdateTodo" text="Update"/>
  </div>
</template>

<script>
import { ref } from "vue"
import { useRoute } from "vue-router"
import TodoForm from "@/components/TodoForm"

export default {
  name: "Todo",
  components: {
    TodoForm
  },
  setup() {
    const route = useRoute();

    const post = ref(null)
    const getPost = async () => {
      const temp = await fetch(
        `http://localhost:9292/api/v1/todos/${route.params.id}`,
        {
          method: "get",
          headers: {
            "content-type": "application/json"
          }
        }
      );
      post.value = await temp.json();
    };
    getPost();

    const onUpdateTodo = obj => {
      fetch(`http://localhost:9292/api/v1/todos/${route.params.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          title: obj.title,
          description: obj.description
        })
      }).then(() => {
        alert("Updated");
      });
    }

    return { post, onUpdateTodo };
  }
};
</script>
