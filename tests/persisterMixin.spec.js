import { mount } from "@vue/test-utils";
import AppForm from "@/components/ExampleForm.vue";

const waitMs = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

describe("ExampleForm.vue", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("save input value to localStorage after 1000ms", async () => {
    expect.assertions(1);
    const wrapper = mount(AppForm);

    const username = wrapper.find('[name="username"]');
    username.element.value = "hello";
    await username.trigger("input");

    const email = wrapper.find('[name="email"]');
    email.element.value = "a@b.com";
    await email.trigger("input");

    const assress = wrapper.find('[name="address"]');
    assress.element.value = "abc";
    await assress.trigger("input");

    await waitMs(1200);

    const savedData = JSON.parse(localStorage.getItem("ExampleForm"));

    expect(savedData).toEqual({
      username: "hello",
      email: "a@b.com",
      address: "abc"
    });
  });

  it("restore data from local storage", () => {
    const savedData = {
      username: "aaaa",
      email: "aaaa@ggg.com",
      address: "123"
    };
    localStorage.setItem("ExampleForm", JSON.stringify(savedData));

    const wrapper = mount(AppForm);

    expect(wrapper.vm.username).toBe(savedData.username);
    expect(wrapper.vm.email).toBe(savedData.email);
    expect(wrapper.vm.address).toBe(savedData.address);
  });
});
