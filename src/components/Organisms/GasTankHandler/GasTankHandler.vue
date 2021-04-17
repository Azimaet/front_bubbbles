<template>
  <!-- <Icon width="50" height="200" icon-name="IconTank" viewBox="0 0 25 75">
    <IconTank />
  </Icon> -->
  <div class="sliderset">
    <p>{{ gasName }}</p>
    <div class="sliderset_gas-container">
      <label for="oxygen">Oxygen</label>
      <input
        type="range"
        name="oxygen"
        min="0"
        max="100"
        v-model="oxygen"
        class="gas_range--blue"
      />
      <input type="text" name="oxygen" min="0" max="100" v-model="oxygen" />
      <div class="gas_checkbox">
        <input
          type="checkbox"
          v-model="padlock"
          value="0"
          @change="toggleLockGasAction"
        />
      </div>
    </div>
    <div class="sliderset_gas-container">
      <label for="nitrogen">Nitrogen</label>
      <input
        type="range"
        name="nitrogen"
        min="0"
        max="100"
        v-model="nitrogen"
        class="gas_range--red"
      />
      <input type="text" name="nitrogen" min="0" max="100" v-model="nitrogen" />
      <div class="gas_checkbox">
        <input
          type="checkbox"
          v-model="padlock"
          value="1"
          @change="toggleLockGasAction"
        />
      </div>
    </div>
    <div class="sliderset_gas-container">
      <label for="helium">Helium</label>
      <input
        type="range"
        name="helium"
        min="0"
        max="100"
        v-model="helium"
        class="gas_range--green"
        disabled
      />
      <input
        type="text"
        name="helium"
        min="0"
        max="100"
        v-model="helium"
        disabled
      />
      <div class="gas_checkbox">
        <input
          type="checkbox"
          v-model="padlock"
          value="2"
          @change="toggleLockGasAction"
        />
      </div>
    </div>
    <div class="sliderset_gas-container">
      <label for="hydrogen">Hydrogen</label>
      <input
        type="range"
        name="hydrogen"
        min="0"
        max="100"
        v-model="hydrogen"
        class="gas_range--black"
        disabled
      />
      <input
        type="text"
        name="hydrogen"
        min="0"
        max="100"
        v-model="hydrogen"
        disabled
      />
      <div class="gas_checkbox">
        <input
          type="checkbox"
          v-model="padlock"
          value="3"
          @change="toggleLockGasAction"
        />
      </div>
    </div>

    <div>
      <p>Maximum Operating Depth: {{ maxOperatingDepth }}m.</p>
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
      default: ["2", "3"],
    },
  },
  setup(props) {
    const gasTank = new GasTank();
    const oxygen = ref("");
    const nitrogen = ref("");
    const helium = ref("");
    const hydrogen = ref("");
    const gasName = ref("");
    const maxOperatingDepth = ref("");

    oxygen.value = gasTank.values[0];
    nitrogen.value = gasTank.values[1];
    helium.value = gasTank.values[2];
    hydrogen.value = gasTank.values[3];
    gasName.value = gasTank.name;
    maxOperatingDepth.value = gasTank.maxOperatingDepth;

    function getProtectedGas(lastLockAction) {
      let arr = props.padlock;
      if (lastLockAction) {
        let pos = arr[lastLockAction];
        while (arr.length > 2) {
          if (arr[0] && arr[0] !== pos) {
            arr.splice(0, 1);
          } else if (arr[1] && arr[1] !== pos) {
            arr.splice(1, 1);
          } else if (arr[2] && arr[2] !== pos) {
            arr.splice(2, 1);
          } else if (arr[3] && arr[3] !== pos) {
            arr.splice(3, 1);
          }
        }
      }
      arr = arr.map(function(x) {
        return parseInt(x, 10);
      });
      return arr;
    }

    const toggleLockGasAction = (event) => {
      let protectedGas = getProtectedGas(event.target.value);
      const ranges = document.querySelectorAll("input[type='range']");
      const texts = document.querySelectorAll("input[type='text']");
      const checkboxs = document.querySelectorAll("input[type='checkbox']");

      for (const checkbox of checkboxs) {
        checkbox.checked = false;
      }
      for (const range of ranges) {
        range.disabled = false;
      }
      for (const text of texts) {
        text.disabled = false;
      }

      for (const i of protectedGas) {
        ranges[i].disabled = true;
        texts[i].disabled = true;
        checkboxs[i].checked = true;
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
      gasTank.setDepth();
      gasName.value = gasTank.name;
      maxOperatingDepth.value = gasTank.maxOperatingDepth;
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

    return {
      oxygen,
      nitrogen,
      helium,
      hydrogen,
      gasName,
      maxOperatingDepth,
      toggleLockGasAction,
    };
  },
};
</script>

<style scoped>
/* Generals */
.sliderset {
  width: 600px;
}

.sliderset_gas-container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: space-between;
  padding: 0 10px 10px;
}

/* Labels */
label {
  width: 15%;
}

/* Input Ranges */
input[type="range"] {
  height: 7px;
  -webkit-appearance: none;
  margin: 10px 0;
  width: 60%;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track,
input[type="range"]::-moz-range-track,
input[type="range"]::-ms-track {
  width: 100%;
  height: 7px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #ffffff;
  border-radius: 7px;
  border: 0px solid #fff;
}
input[type="range"]::-webkit-slider-thumb,
input[type="range"]::-moz-range-thumb,
input[type="range"]::-ms-thumb {
  border: 0px solid rgba(0, 0, 0, 0.1);
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: #d4d4d4;
  cursor: pointer;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.4), inset 0 0px 1px rgba(0, 0, 0, 0.3),
    0 1px 2px rgba(0, 0, 0, 0.6), 0 4px 2px rgba(0, 0, 0, 0.2),
    0 9px 4px rgba(0, 0, 0, 0.1), inset 0 2px 1px white;
}

input[type="range"]::-ms-fill-lower {
  border: 0px solid #010101;
  border-radius: 14px;
  box-shadow: 0px 0px 0px #000000;
}
input[type="range"]::-ms-fill-upper {
  border: 0px solid #010101;
  border-radius: 14px;
  box-shadow: 0px 0px 0px #000000;
}

input[type="range"].gas_range--blue {
  background: #9fd0e9;
  box-shadow: inset 0 0 4px rgba(0, 85, 151, 0.8),
    inset 0 0 2px rgba(0, 0, 0, 0.5);
}
input[type="range"].gas_range--red {
  background: #e69e9b;
  box-shadow: inset 0 0 4px rgba(163, 18, 0, 0.7),
    inset 0 0 2px rgba(0, 0, 0, 0.5);
}
input[type="range"].gas_range--green {
  background: #9edbbc;
  box-shadow: inset 0 0 4px rgba(19, 121, 72, 0.8),
    inset 0 0 2px rgba(0, 0, 0, 0.5);
}
input[type="range"].gas_range--black {
  background: #aaaaaa;
  box-shadow: inset 0 0 4px rgba(24, 24, 24, 0.8),
    inset 0 0 2px rgba(0, 0, 0, 0.5);
}

/* Inputs text */
input[type="text"] {
  width: 20%;
}

/* Input Ranges */
.gas_checkbox {
  width: 10%;
}
</style>
