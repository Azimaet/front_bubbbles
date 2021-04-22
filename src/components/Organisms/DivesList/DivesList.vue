<template>
  <h2>List of User's Dives!</h2>
  <button @click="add">Add Dive</button>
  <DiveForm
    v-for="(dive, index) in dives.slice().reverse()"
    :key="index"
    :is="dive"
    :dive="dive"
  />
</template>

<script>
import DiveForm from "./../DiveForm/DiveForm.vue";

export default {
  name: "DivesList",
  components: {
    DiveForm,
  },

  methods: {
    add() {
      this.dives.push(DiveForm);
    },
  },
  // filters: {
  //   reverse(dives) {
  //     console.log(dives);
  //     return dives.slice().reverse();
  //   },
  // },
  data() {
    return {
      store: this.$store,
      dives: this.$store.state.dives,
    };
  },
};
</script>

<style></style>
