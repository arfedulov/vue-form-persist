import { mount } from "@vue/test-utils";

import ExampleForm from "@/components/ExampleForm.vue";
import ExampleFormWithPersistKey from "@/components/ExampleFormWithPersistKey.vue";
import ExampleFormWithPersistIdAttribute from "@/components/ExampleFormWithPersistIdAttribute.vue";

const waitMs = ms =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

describe("persistorMixin.js", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("save input value to localStorage after 1000ms", async () => {
    expect.assertions(1);
    const wrapper = mount(ExampleForm);

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

    const wrapper = mount(ExampleForm);

    expect(wrapper.vm.username).toBe(savedData.username);
    expect(wrapper.vm.email).toBe(savedData.email);
    expect(wrapper.vm.address).toBe(savedData.address);
  });

  describe("when persistKey is provided in mixin options", () => {
    it("save data in local storage with provided persist key", async () => {
      expect.assertions(1);
      const wrapper = mount(ExampleFormWithPersistKey);

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

      const savedData = JSON.parse(localStorage.getItem("test-persist-id"));

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
      localStorage.setItem("test-persist-id", JSON.stringify(savedData));

      const wrapper = mount(ExampleFormWithPersistKey);

      expect(wrapper.vm.username).toBe(savedData.username);
      expect(wrapper.vm.email).toBe(savedData.email);
      expect(wrapper.vm.address).toBe(savedData.address);
    });
  });

  describe("when persist id data attr is provided on form element in template", () => {
    it("saves data to local storage with provided id", async () => {
      expect.assertions(1);
      const wrapper = mount(ExampleFormWithPersistIdAttribute);

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

      const savedData = JSON.parse(localStorage.getItem("test-id"));

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
      localStorage.setItem("test-id", JSON.stringify(savedData));

      const wrapper = mount(ExampleFormWithPersistIdAttribute).find(
        ExampleForm
      );

      expect(wrapper.vm.username).toBe(savedData.username);
      expect(wrapper.vm.email).toBe(savedData.email);
      expect(wrapper.vm.address).toBe(savedData.address);
    });
  });
});
