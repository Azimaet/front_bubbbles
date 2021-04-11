<template>
  <!-- <Icon width="50" height="200" icon-name="IconTank" viewBox="0 0 25 75">
    <IconTank />
  </Icon> -->
  <p>{{ gasLabel }}</p>

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
import { ref, watchEffect } from "vue";
import Icon from "../../Atoms/Icon/Icon.vue";
import IconTank from "../../Atoms/Icon/icons/IconTank.vue";

export default {
  name: "GasTankWidget",
  components: {
    Icon,
    IconTank,
  },
  setup() {
    const oxygen = ref("");
    const nitrogen = ref("");
    const helium = ref("");
    const hydrogen = ref("");
    const gasLabel = ref("");

    oxygen.value = 21;
    nitrogen.value = 79;
    helium.value = 0;
    hydrogen.value = 0;
    gasLabel.value = "Air";

    let lastGasValues = [
      oxygen.value,
      nitrogen.value,
      helium.value,
      hydrogen.value,
    ];

    function getLastGasEdited() {
      if (lastGasValues[0] !== oxygen.value) {
        return "oxygen";
      } else if (lastGasValues[1] !== nitrogen.value) {
        return "nitrogen";
      } else if (lastGasValues[2] !== helium.value) {
        return "helium";
      } else if (lastGasValues[3] !== helium.value) {
        return "hydrogen";
      } else {
        return false;
      }
    }

    function equalizeGasFractions(lastGasEdit) {
      let maxGasTotal = 100;
      let currentGasTotal =
        parseInt(oxygen.value) +
        parseInt(nitrogen.value) +
        parseInt(helium.value) +
        parseInt(hydrogen.value);
      let toEqualize = currentGasTotal - maxGasTotal;

      if (Math.sign(toEqualize) === 1) {
        if (lastGasEdit !== "oxygen" && oxygen.value > 0) {
          oxygen.value = oxygen.value - toEqualize;
        } else if (lastGasEdit !== "nitrogen" && nitrogen.value > 0) {
          nitrogen.value = nitrogen.value - toEqualize;
        } else if (lastGasEdit !== "helium" && helium.value > 0) {
          helium.value = helium.value - toEqualize;
        } else if (lastGasEdit !== "hydrogen" && hydrogen.value > 0) {
          hydrogen.value = hydrogen.value - toEqualize;
        }
      }

      if (Math.sign(toEqualize) === -1) {
        if (lastGasEdit !== "oxygen" && oxygen.value < 100) {
          oxygen.value = oxygen.value - toEqualize;
        } else if (lastGasEdit !== "nitrogen" && nitrogen.value < 100) {
          nitrogen.value = nitrogen.value - toEqualize;
        } else if (lastGasEdit !== "helium" && helium.value < 100) {
          helium.value = helium.value - toEqualize;
        } else if (lastGasEdit !== "hydrogen" && hydrogen.value < 100) {
          hydrogen.value = hydrogen.value - toEqualize;
        }
      }

      // Fix when user action is too loud

      // if (Math.sign(oxygen.value) === -1) {
      //   if (Math.abs(oxygen.value) === nitrogen.value) {
      //     oxygen.value = 0;
      //     nitrogen.value = 0;
      //   } else if (Math.abs(oxygen.value) === helium.value) {
      //     oxygen.value = 0;
      //     helium.value = 0;
      //   } else if (Math.abs(oxygen.value) === hydrogen.value) {
      //     oxygen.value = 0;
      //     hydrogen.value = 0;
      //   }
      // } else if (Math.sign(nitrogen.value) === -1) {
      //   if (Math.abs(nitrogen.value) === oxygen.value) {
      //     nitrogen.value = 0;
      //     oxygen.value = 0;
      //   } else if (Math.abs(nitrogen.value) === helium.value) {
      //     nitrogen.value = 0;
      //     helium.value = 0;
      //   } else if (Math.abs(nitrogen.value) === hydrogen.value) {
      //     nitrogen.value = 0;
      //     hydrogen.value = 0;
      //   }
      // } else if (Math.sign(helium.value) === -1) {
      //   if (Math.abs(helium.value) === oxygen.value) {
      //     helium.value = 0;
      //     oxygen.value = 0;
      //   } else if (Math.abs(helium.value) === nitrogen.value) {
      //     helium.value = 0;
      //     nitrogen.value = 0;
      //   } else if (Math.abs(helium.value) === hydrogen.value) {
      //     helium.value = 0;
      //     hydrogen.value = 0;
      //   }
      // } else if (Math.sign(hydrogen.value) === -1) {
      //   if (Math.abs(hydrogen.value) === oxygen.value) {
      //     hydrogen.value = 0;
      //     oxygen.value = 0;
      //   } else if (Math.abs(hydrogen.value) === nitrogen.value) {
      //     hydrogen.value = 0;
      //     nitrogen.value = 0;
      //   } else if (Math.abs(hydrogen.value) === helium.value) {
      //     hydrogen.value = 0;
      //     helium.value = 0;
      //   }
      // }
    }

    function getGasLabel() {
      let label = "";
      if (
        parseInt(oxygen.value) === 21 &&
        parseInt(nitrogen.value) === 79 &&
        parseInt(helium.value) === 0 &&
        parseInt(hydrogen.value) === 0
      ) {
        label = "Air";
      } else if (
        parseInt(oxygen.value) === 100 &&
        parseInt(nitrogen.value) === 0 &&
        parseInt(helium.value) === 0 &&
        parseInt(hydrogen.value) === 0
      ) {
        label = "Oxygen";
      } else if (
        parseInt(oxygen.value) > 21 &&
        parseInt(nitrogen.value) < 78 &&
        parseInt(helium.value) === 0 &&
        parseInt(hydrogen.value) === 0
      ) {
        label = "Nitrox";
      } else {
        label = "NON RECONNU";
      }
      return label;
    }

    watchEffect(() => {
      let lastGasEdit = getLastGasEdited(lastGasValues);
      equalizeGasFractions(lastGasEdit);
      gasLabel.value = getGasLabel();

      lastGasValues = [
        oxygen.value,
        nitrogen.value,
        helium.value,
        hydrogen.value,
      ];
    });
    return { oxygen, nitrogen, helium, hydrogen, gasLabel };
  },
};
</script>
