<template>
  <!-- <Icon width="50" height="200" icon-name="IconTank" viewBox="0 0 25 75">
    <IconTank />
  </Icon> -->
  <p>{{ gasName }}</p>

  <div class="sliderset">
    <div>
      <label for="oxygen">Oxygen</label>
      <input type="range" name="oxygen" min="0" max="100" v-model="oxygen" />
      <input type="text" name="oxygen" min="0" max="100" v-model="oxygen" />
    </div>
    <div>
      <label for="nitrogen">Nitrogen</label>
      <input
        type="range"
        name="nitrogen"
        min="0"
        max="100"
        v-model="nitrogen"
      />
      <input type="text" name="nitrogen" min="0" max="100" v-model="nitrogen" />
    </div>
    <div>
      <label for="helium">Helium</label>
      <input type="range" name="helium" min="0" max="100" v-model="helium" />
      <input type="text" name="helium" min="0" max="100" v-model="helium" />
    </div>
    <div>
      <label for="hydrogen">Hydrogen</label>
      <input
        type="range"
        name="hydrogen"
        min="0"
        max="100"
        v-model="hydrogen"
      />
      <input type="text" name="hydrogen" min="0" max="100" v-model="hydrogen" />
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import Icon from "../../Atoms/Icon/Icon.vue";
import IconTank from "../../Atoms/Icon/icons/IconTank.vue";
import { GasTank } from "./GasTank.js";

export default {
  name: "GasTankHandler",
  components: {
    Icon,
    IconTank,
  },
  setup() {
    const oxygen = ref("");
    const nitrogen = ref("");
    const helium = ref("");
    const hydrogen = ref("");
    const gasName = ref("");
    const gasTank = new GasTank();

    oxygen.value = gasTank.values[0];
    nitrogen.value = gasTank.values[1];
    helium.value = gasTank.values[2];
    hydrogen.value = gasTank.values[3];
    gasName.value = gasTank.name;

    watch(oxygen, (newVal) => {
      gasTank.setValue(0, newVal);
      [
        oxygen.value,
        nitrogen.value,
        helium.value,
        hydrogen.value,
      ] = gasTank.values;
      // gasTank.setName();
    });
    watch(nitrogen, (newVal) => {
      gasTank.setValue(1, newVal);
      [
        oxygen.value,
        nitrogen.value,
        helium.value,
        hydrogen.value,
      ] = gasTank.values;
      // gasTank.setName();
    });
    watch(helium, (newVal) => {
      gasTank.setValue(2, newVal);
      [
        oxygen.value,
        nitrogen.value,
        helium.value,
        hydrogen.value,
      ] = gasTank.values;
      // gasTank.setName();
    });
    watch(hydrogen, (newVal) => {
      gasTank.setValue(3, newVal);
      [
        oxygen.value,
        nitrogen.value,
        helium.value,
        hydrogen.value,
      ] = gasTank.values;
      // gasTank.setName();
    });
    return { oxygen, nitrogen, helium, hydrogen, gasName };
  },
};
</script>
