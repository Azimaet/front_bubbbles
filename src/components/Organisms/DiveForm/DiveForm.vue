<template>
  <form action="#" class="">
    <h3>Add a Dive!</h3>

    <label for="dive-date">Date:</label>
    <input
      type="datetime-local"
      name="dive-date"
      :value="dive.date ? dive.date : timestamp"
    />

    <label for="total-time">Total time: (mn)</label>
    <input
      type="number"
      name="total-time"
      :value="dive.totalTime ? dive.totalTime : 40"
      required
    />

    <label for="max-depth">Max depth: </label>
    <input
      type="number"
      name="max-depth"
      :value="dive.maxDepth ? dive.maxDepth : 18"
      required
    />

    <label for="temperature">Temperature: </label>
    <input
      type="text"
      name="temperature"
      :value="dive.temperature ? dive.temperature : 20"
      required
    />

    <input list="environment" placeholder="Select environment diving" />
    <datalist id="environment">
      <option value="Sea"> </option>
      <option value="Pool"> </option>
      <option value="River"> </option>
      <option value="Lake"> </option>
    </datalist>

    <input list="status" placeholder="Select your role in the team" />
    <datalist id="status">
      <option value="Exploration"> </option>
      <option value="Learning"> </option>
      <option value="Leading / Teaching"> </option>
      <option value="Professional"> </option>
      <option value="Solo"> </option>
    </datalist>

    <GasTankHandler
      v-for="(gastank, index) in dive.gazs"
      :key="index"
      :is="gastank"
    />

    <input type="submit" value="Submit" />
  </form>
</template>

<script>
import GasTankHandler from "../../Molecules/GasTankHandler/GasTankHandler.vue";

export default {
  name: "DiveForm",
  components: {
    GasTankHandler,
  },
  props: {
    dive: {
      type: Object,
    },
  },
  setup() {
    const timestamp = new Date().toISOString();

    return {
      timestamp,
    };
  },
};
</script>

<style scoped>
form {
  border: 1px solid black;
}
</style>
