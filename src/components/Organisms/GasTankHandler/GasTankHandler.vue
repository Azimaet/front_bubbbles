<template>
  <!-- <Icon width="50" height="200" icon-name="IconTank" viewBox="0 0 25 75">
    <IconTank />
  </Icon> -->
  <div class="sliderset">
    <p>{{ gasName }}</p>
    <div>
      <label for="oxygen">Oxygen</label>
      <input
        type="range"
        name="oxygen"
        min="0"
        max="100"
        v-model="oxygen"
        class="gas_slider-range"
      />
      <input
        type="text"
        name="oxygen"
        min="0"
        max="100"
        v-model="oxygen"
        class="gas_slider-text"
      />
      <input
        type="checkbox"
        v-model="padlock"
        value="0"
        @change="toggleLockGasAction"
      />
    </div>
    <div>
      <label for="nitrogen">Nitrogen</label>
      <input
        type="range"
        name="nitrogen"
        min="0"
        max="100"
        v-model="nitrogen"
        class="gas_slider-range"
      />
      <input
        type="text"
        name="nitrogen"
        min="0"
        max="100"
        v-model="nitrogen"
        class="gas_slider-text"
      />
      <input
        type="checkbox"
        v-model="padlock"
        value="1"
        @change="toggleLockGasAction"
      />
    </div>
    <div>
      <label for="helium">Helium</label>
      <input
        type="range"
        name="helium"
        min="0"
        max="100"
        v-model="helium"
        class="gas_slider-range"
      />
      <input
        type="text"
        name="helium"
        min="0"
        max="100"
        v-model="helium"
        class="gas_slider-text"
      />
      <input
        type="checkbox"
        v-model="padlock"
        value="2"
        @change="toggleLockGasAction"
      />
    </div>
    <div>
      <label for="hydrogen">Hydrogen</label>
      <input
        type="range"
        name="hydrogen"
        min="0"
        max="100"
        v-model="hydrogen"
        class="gas_slider-range"
      />
      <input
        type="text"
        name="hydrogen"
        min="0"
        max="100"
        v-model="hydrogen"
        class="gas_slider-text"
      />
      <input
        type="checkbox"
        v-model="padlock"
        value="3"
        @change="toggleLockGasAction"
      />
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
    const gasTank = new GasTank();
    const oxygen = ref("");
    const nitrogen = ref("");
    const helium = ref("");
    const hydrogen = ref("");
    const gasName = ref("");

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

    const toggleLockGasAction = () => {
      let protectedGas = getProtectedGas();
      const ranges = document.querySelectorAll("input.gas_slider-range");
      const texts = document.querySelectorAll("input.gas_slider-text");

      for (const range of ranges) {
        range.disabled = false;
      }
      for (const text of texts) {
        text.disabled = false;
      }

      for (const i of protectedGas) {
        ranges[i].disabled = true;
        texts[i].disabled = true;
      }
    };

    function updateGazTank(index, newVal, oldVal) {
      let protectedGas = getProtectedGas();
        gasTank.setValue(index, newVal, protectedGas);

        [
          oxygen.value,
          nitrogen.value,
          helium.value,
          hydrogen.value,
        ] = gasTank.values;

        gasTank.setName();
        gasName.value = gasTank.name;
    }

    watch(oxygen, (newVal, oldVal) => {
      updateGazTank(0, newVal, oldVal);
    });

    watch(nitrogen, (newVal, oldVal) => {
      updateGazTank(1, newVal, oldVal);
    });

    watch(helium, (newVal, oldVal) => {
      updateGazTank(2, newVal, oldVal);
    });

    watch(hydrogen, (newVal, oldVal) => {
      updateGazTank(3, newVal, oldVal);
    });

    return { oxygen, nitrogen, helium, hydrogen, gasName, toggleLockGasAction };
  },
};
</script>
