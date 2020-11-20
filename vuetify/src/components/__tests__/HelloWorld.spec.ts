import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import Vue from "vue";
import vuetify from "vuetify";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "Vuetify";

    Vue.use(vuetify);

    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
