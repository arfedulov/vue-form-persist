<template>
  <form class="form">
    <label class="form__field">
      Username:
      <input v-model="username" type="text" name="username" @input="persist" />
    </label>
    <label class="form__field">
      Email:
      <input v-model="email" type="email" name="email" @input="persist" />
    </label>
    <label class="form__field">
      Address:
      <input v-model="address" type="text" name="address" @input="persist" />
    </label>
  </form>
</template>

<script>
import { persistorMixin } from "@/lib/persistorMixin";

export default {
  name: "DemoForm",
  mixins: [persistorMixin(["username", "email", "address"])],
  data() {
    return {
      username: "",
      email: "",
      address: ""
    };
  }
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 350px;
  max-width: 100%;
}

.form__field {
  width: 100%;
  margin: 8px 0;
}

input {
  width: 100%;
}
</style>
