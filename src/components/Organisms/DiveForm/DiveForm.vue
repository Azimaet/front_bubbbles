<template>
  <form action="#">
    <h2>Add a Dive!</h2>
    <GasTankHandler />
  </form>
</template>

<script>
import GasTankHandler from "../../Molecules/GasTankHandler/GasTankHandler.vue";
export default {
  name: "GasTankHandler",
  components: {
    GasTankHandler,
  },
};
</script>

<style></style>
