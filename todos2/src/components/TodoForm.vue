<template>
  <form>
    <input v-model="title" type="text" name="title" placeholder="title"/>
    <input
      v-model="description"
      type="text"
      name="description"
      placeholder="description"
    />
    <button @click.prevent="createTodo">{{ text }}</button>
  </form>
</template>

<script>
import { watch, ref } from "vue";

export default {
  name: "TodoForm",
  props: {
    todo: {
      type: Object,
      default: () => {
        return { title: "" };
      }
    },
    text: {
      type: String,
      default: "Create Todo"
    }
  },
  methods: {
    createTodo() {
      this.$emit("add-todo", {
        title: this.title,
        description: this.description
      });
    }
  },
  setup(props) {
    const title = ref(null);
    const description = ref(null);

    watch(
      () => props.todo,
      async (newVal, oldVal) => {
        title.value = newVal.title;
        description.value = newVal.description;
      }
    );
    return { title, description };
  }
};
</script>
