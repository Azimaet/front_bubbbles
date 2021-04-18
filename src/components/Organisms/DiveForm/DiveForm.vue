<template>
  <form action="#" class="">
    <h2>Add a Dive!</h2>

    <label for="dive-date">Date:</label>
    <input type="datetime-local" name="dive-date" value="2018-06-12T19:30" />

    <label for="max_depth">Total time: (mn)</label>
    <input type="number" name="total-time" required />

    <label for="max_depth">Max depth: </label>
    <input type="number" name="max-depth" required />

    <label for="temperature">Temperature: </label>
    <input type="text" name="temperature" />

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

    <GasTankHandler />

    <input type="submit" value="Submit" />
  </form>
</template>

<script>
import { Dive } from "./Dive.js";
import GasTankHandler from "../../Molecules/GasTankHandler/GasTankHandler.vue";
export default {
  name: "DiveForm",
  components: {
    GasTankHandler,
  },
  data: {},
};
</script>

<style scoped>
form {
  border: 1px solid black;
}
</style>
