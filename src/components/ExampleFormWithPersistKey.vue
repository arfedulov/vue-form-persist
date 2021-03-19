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
import { persisterMixin } from "@/lib/persistorMixin";

export default {
  name: "ExampleFormWithPersistKey",
  mixins: [
    persisterMixin(["username", "email", "address"], {
      persistKey: "test-persist-id"
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
