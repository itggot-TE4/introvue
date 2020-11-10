const { createApp } = Vue;

const App = {
    name: "App",
    data() {
        return {
            text: "Hello, World!",
            items: [],
            counter: 0,
            title: ""
        };
    },
    methods: {
        onClick() {
            console.log("clicked!");
            this.items.push({
                index: this.counter++,
                title: this.title
            });
        },
        deleteItem(index) {
            this.items = this.items.filter((f) => f.index != index);
        }
    }
};

const app = createApp(App);

app.component('Hello', {
    name: 'Hello',
    props: ['text'],
    template: `#hello-world-template`
});

app.component('Item', {
    name: 'item',
    props: ['index', 'title'],
    methods: {
        deleteItem(index) {
            console.log("delete item: " + index);
            this.$emit('delete_item', index)
        }
    },
    template: `#item-template`
})

app.mount("#main");