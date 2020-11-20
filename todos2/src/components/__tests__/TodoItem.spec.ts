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

  it("does not render props.todoItem.description when passed", () => {
    const todoItem = {
        description: "hello, world!"
    }
    const wrapper = shallowMount(TodoItem, {
      props: { todoItem }
    });
    expect(wrapper.text()).not.toMatch(todoItem.description);
  });

  it("navigates to route /todos/<id> when clicked on", () => {
    const todoItem = {
        title: "hello, world!"
    }

    const wrapper = shallowMount(TodoItem, {
        mocks: {
            $router: {
                push: jest.fn()
            }
        },
        props: { todoItem }
      });
    wrapper.find('span').trigger("click");
    expect(wrapper.text()).toMatch(todoItem.title);
  });
});
