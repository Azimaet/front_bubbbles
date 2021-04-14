<template>
  <!-- <Icon width="50" height="200" icon-name="IconTank" viewBox="0 0 25 75">
    <IconTank />
  </Icon> -->
  <div class="sliderset">
    <p>{{ gasName }}</p>
    <div>
      <label for="oxygen">Oxygen</label>
      <input type="range" name="oxygen" min="0" max="100" v-model="oxygen" />
      <input type="text" name="oxygen" min="0" max="100" v-model="oxygen" />
      <!-- <input type="checkbox" v-model="padlock" value="0" @change="toggleLock" /> -->
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
      <!-- <input type="checkbox" v-model="padlock" value="1" @change="toggleLock" /> -->
    </div>
    <div>
      <label for="helium">Helium</label>
      <input type="range" name="helium" min="0" max="100" v-model="helium" />
      <input type="text" name="helium" min="0" max="100" v-model="helium" />
      <!-- <input type="checkbox" v-model="padlock" value="2" @change="toggleLock" /> -->
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
      <!-- <input type="checkbox" v-model="padlock" value="3" @change="toggleLock" /> -->
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
  props: {
    padlock: {
      type: Array,
      default: [],
    },
  },
  setup(props) {
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

    function getProtectedGas() {
      let arr = props.padlock.map(function(x) {
        return parseInt(x, 10);
      });
      return arr;
    }

    const toggleLock = () => {
      let protectedGas = getProtectedGas();
      console.log(protectedGas);
    };

    function updateGazTank(index, newVals) {
      let protectedGas = getProtectedGas();

      gasTank.setValue(index, newVals, protectedGas);
      [
        oxygen.value,
        nitrogen.value,
        helium.value,
        hydrogen.value,
      ] = gasTank.values;

      gasTank.setName();
      gasName.value = gasTank.name;
    }

    watch(oxygen, (newVals) => {
      updateGazTank(0, newVals);
    });

    watch(nitrogen, (newVals) => {
      updateGazTank(1, newVals);
    });

    watch(helium, (newVals) => {
      updateGazTank(2, newVals);
    });

    watch(hydrogen, (newVals) => {
      updateGazTank(3, newVals);
    });

    return { oxygen, nitrogen, helium, hydrogen, gasName, toggleLock };
  },
};
</script>
