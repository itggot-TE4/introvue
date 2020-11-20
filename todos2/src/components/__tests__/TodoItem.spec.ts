import { shallowMount } from "@vue/test-utils";
import TodoItem from "@/components/TodoItem.vue";

describe("TodoItem.vue", () => {
  it("renders props.todoItem.title when passed", () => {
    const todoItem = {
        title: "hello, world!"
    }
    const wrapper = shallowMount(TodoItem, {
      props: { todoItem }
    });
    expect(wrapper.text()).toMatch(todoItem.title);
  });
});
