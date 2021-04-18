<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Icon>
    <IconTank />
  </Icon>
  <DiveForm />
  {{ data }}
</template>

<script>
import DiveForm from "./components/Organisms/DiveForm/DiveForm.vue";
import Icon from "./components/Atoms/Icon/Icon.vue";
import IconTank from "./components/Atoms/Icon/icons/IconTank.vue";

export default {
  name: "App",
  components: {
    DiveForm,
    Icon,
    IconTank,
  },

  data() {
    return {
      data: this.$store.state.name,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
