<template>
  <h2>List of User's Dives!</h2>
  <button @click="add">Add Dive</button>
  <DiveForm v-for="(dive, index) in dives" :key="index" :is="dive" />
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

  data() {
    return {
      store: this.$store,
      dives: [DiveForm],
    };
  },
};
</script>

<style></style>
