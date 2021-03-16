<template>
  <div id="app">
    <example-form />
    <example-form persist-id="test" />
  </div>
</template>

<script>
import ExampleForm from "@/components/ExampleForm.vue";

export default {
  name: "App",
  components: {
    ExampleForm
  }
};
</script>

<style></style>
