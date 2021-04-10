<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <Icon>
    <IconTank />
  </Icon>
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Icon from "./components/Atoms/Icon/Icon.vue";
import IconTank from "./components/Atoms/Icon/icons/IconTank.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    Icon,
    IconTank,
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
