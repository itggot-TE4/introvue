import { shallowMount, VueWrapper } from "@vue/test-utils";
import { createStore, Store } from "vuex";
import TodoItem from "@/components/TodoItem.vue";

const todoItem = {
  id: 1,
  title: "Hello, World!",
  description: "something else",
  isCompleted: true
}

let wrapper: VueWrapper<any>;
let store: Store<{}>;

const pushFunction = jest.fn();

describe("TodoItem.vue", () => {

  beforeAll(() => {
    const todos = {
      namespaced: true,
      actions: {
        delTodo: jest.fn()
      }
    }

    store = createStore<{}>({
      modules: { todos }
    });

    store.dispatch = jest.fn()

    wrapper = shallowMount(TodoItem, {
      props: { todoItem },
      global: {
        plugins: [store],
        mocks: {
          $router: {
            push: pushFunction
          }
        }
      },
    })
  });

  it("renders props.todoItem.title when passed", () => {
    expect(wrapper.text()).toMatch(todoItem.title);
  });

  it("does not render props.todoItem.description when passed", () => {
    expect(wrapper.text()).not.toMatch(todoItem.description);
  });

  it("navigates to route /todos/<id> when clicked on", () => {
    wrapper.find('[data-unit="title"]').trigger("click");
    expect(pushFunction).toHaveBeenCalledWith(expect.objectContaining({ name: "Todo" }));
    expect(pushFunction).toHaveBeenCalledWith({ name: "Todo", params: { id: todoItem.id } });
  });

  it("when delete button is pressed, vuex is called", async () => {
    wrapper.find('[data-unit="deleteBtn"]').trigger("click");
    await wrapper.vm.$nextTick()

    expect(store.dispatch).toHaveBeenCalledWith('todos/delTodo', todoItem.id);
  });

  it("renders correctly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  })
});
