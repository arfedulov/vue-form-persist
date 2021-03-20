<template>
  <form>
    <label>
      Username:
      <input v-model="username" type="text" name="username" @input="persist" />
    </label>
    <label>
      Email:
      <input v-model="email" type="email" name="email" @input="persist" />
    </label>
    <label>
      Address:
      <input v-model="address" type="text" name="address" @input="persist" />
    </label>
  </form>
</template>

<script>
import { persistorMixin } from "@/lib/persistorMixin";

export default {
  name: "ExampleFormWithCustomDebounceTime",
  mixins: [
    persistorMixin(["username", "email", "address"], {
      debounceTime: 100
    })
  ],
  data() {
    return {
      username: "",
      email: "",
      address: ""
    };
  }
};
</script>
