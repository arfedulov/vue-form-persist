<template>
  <div class="page">
    <h1>Persistent vue forms demo</h1>

    <h2 class="page__heading">Form with default persist key</h2>
    <demo-form />

    <h2 class="page__heading">Form with persist-id attribute</h2>
    <demo-form persist-id="form1" />

    <h2 class="page__heading">Form with another persist-id attribute</h2>
    <demo-form persist-id="form2" />
  </div>
</template>

<script>
import DemoForm from "@/components/DemoForm.vue";

export default {
  name: "DemoApp",
  components: {
    DemoForm
  }
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page__heading {
  margin-top: 20px;
}
</style>
