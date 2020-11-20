import { createStore, Store } from "vuex";
import todos from "@/store/modules/todos"; 

const todoItem = {
    id: 1,
    title: "Hello"
}

let store : Store<{}>

describe('todos.ts', () => {
    beforeAll(() => {
        store = createStore<{}>({
            modules: { todos }
        });
    })

    it('adds element to todos state', () => {
        store.commit('todos/addTodo', todoItem);
        expect(store.state).toBeGreaterThan(0);
    })
})