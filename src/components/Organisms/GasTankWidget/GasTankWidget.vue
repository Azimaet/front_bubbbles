<template>
  <!-- <Icon width="50" height="200" icon-name="IconTank" viewBox="0 0 25 75">
    <IconTank />
  </Icon> -->
  <p>Veuillez ajuster vos gazs</p>
  <div class="sliderset">
    <div>
      <label for="oxygen">Oxygen</label>
      <input type="range" name="oxygen" min="0" max="100" v-model="oxygen" />
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
    </div>
    <div>
      <label for="helium">Helium</label>
      <input type="range" name="helium" min="0" max="100" v-model="helium" />
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
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import Icon from "../../Atoms/Icon/Icon.vue";
import IconTank from "../../Atoms/Icon/icons/IconTank.vue";

export default {
  name: "GazTankWidget",
  components: {
    Icon,
    IconTank,
  },
  setup() {
    const oxygen = ref("");
    const nitrogen = ref("");
    const helium = ref("");
    const hydrogen = ref("");

    oxygen.value = 21;
    nitrogen.value = 79;
    helium.value = 0;
    hydrogen.value = 0;

    let lastGasValues = [
      oxygen.value,
      nitrogen.value,
      helium.value,
      hydrogen.value,
    ];

    // function sumGasFractions() {
    //   let sum = oxygen.value + nitrogen.value + helium.value + hydrogen.value;
    // }

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
      console.log(lastGasEdit);
      let maxGasTotal = 100;
      let currentGasTotal =
        oxygen.value + nitrogen.value + helium.value + hydrogen.value;

      let toEqualize = currentGasTotal - maxGasTotal;

      if (Math.sign(toEqualize) === 1) {
        if (lastGasEdit === "oxygen") {
          nitrogen.value = nitrogen.value - toEqualize;
        } else if (lastGasEdit === "nitrogen") {
          helium.value = helium.value - toEqualize;
        } else if (lastGasEdit === "helium") {
          hydrogen.value = hydrogen.value - toEqualize;
        } else if (lastGasEdit === "hydrogen") {
          oxygen.value = oxygen.value - toEqualize;
        }
      }
      // console.log(
      //   "OX: " +
      //     oxygen.value +
      //     "| N:" +
      //     nitrogen.value +
      //     "| HE:" +
      //     helium.value +
      //     "| HY:" +
      //     hydrogen.value
      // );
    }

    watchEffect(() => {
      let lastGasEdit = getLastGasEdited(lastGasValues);
      equalizeGasFractions(lastGasEdit);

      lastGasValues = [
        oxygen.value,
        nitrogen.value,
        helium.value,
        hydrogen.value,
      ];
    });
    return { oxygen, nitrogen, helium, hydrogen };
  },
};
</script>
