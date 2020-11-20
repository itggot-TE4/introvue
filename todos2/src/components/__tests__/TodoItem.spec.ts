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
      id: 1,
      title: "hello, world!"
    }

    const pushFunction = jest.fn();

    const wrapper = shallowMount(TodoItem, {
      global: {
        mocks: {
          $router: {
            push: pushFunction
          }
        }
      },
      props: { todoItem }
    });
    wrapper.find('span').trigger("click");
    expect(pushFunction).toHaveBeenCalledWith(expect.objectContaining({ name: "Todo" }));
    expect(pushFunction).toHaveBeenCalledWith({ name: "Todo", params: { id: todoItem.id } });
  });

  it("renders correctly", () => {
    const todoItem = {
      id: 1,
      title: "hello, world!",
      description: "foobar",
      isCompleted: true
    }
    const wrapper = shallowMount(TodoItem, {
      props: { todoItem }
    });

    expect(wrapper.html()).toMatchSnapshot();
})
});
