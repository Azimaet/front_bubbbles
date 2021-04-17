/*
 ** Doc Ben Nadel for the Equalizer module part
 ** https://github.com/bennadel/JavaScript-Demos/blob/master/demos/linked-sliders-angular9/src/app/equalizer.ts
 */
export class GasTank {
  constructor() {
    this.name = "Air";

    this.minimum = 0;

    this.maximum = 100;

    this.values = [21, 79, 0, 0];

    this.lastIncrementedIndex = -1;

    this.lastTargetIndex = -1;

    this.breathable = true;

    this.ppO2 = 1.4;

    this.maxOperatingDepth = 56.6;
  }

  /* Public Methods */
  setName() {
    if (this.values[0] === 100) {
      this.name = "Oxygen";
      this.breathable = true;
    } else if (this.values[1] === 100) {
      this.name = "Nitrogen";
      this.breathable = false;
    } else if (this.values[2] === 100) {
      this.name = "Helium";
      this.breathable = false;
    } else if (this.values[3] === 100) {
      this.name = "Hydrogen";
      this.breathable = false;
    } else if (this.values[1] === 100) {
      this.name = "Nitrogen";
      this.breathable = false;
    } else if (this.values[0] === 21 && this.values[1] === 79) {
      this.name = "Air";
      this.breathable = true;
    } else if (
      this.values[0] > 21 &&
      this.values[0] < 100 &&
      this.values[1] < 79 &&
      this.values[1] > 0 &&
      this.values[2] === 0 &&
      this.values[3] === 0
    ) {
      this.name = "Nitrox";
      this.breathable = true;
    } else if (
      this.values[0] > 0 &&
      this.values[2] > 0 &&
      this.values[1] === 0 &&
      this.values[3] === 0
    ) {
      this.name = "Heliox";
      this.breathable = true;
    } else if (
      this.values[0] > 0 &&
      this.values[3] > 0 &&
      this.values[1] === 0 &&
      this.values[2] === 0
    ) {
      this.name = "Hydrox";
      this.breathable = true;
    } else if (
      this.values[0] > 0 &&
      this.values[2] > 0 &&
      this.values[1] > 0 &&
      this.values[3] === 0
    ) {
      this.name = "Trimix";
      this.breathable = true;
    } else if (
      this.values[0] > 0 &&
      this.values[3] > 0 &&
      this.values[2] > 0 &&
      this.values[1] === 0
    ) {
      this.name = "Hydreliox";
      this.breathable = true;
    } else {
      this.name = "Unknown gaz";
      this.breathable = false;
    }
    return this.name;
  }

  setValue(targetIndex, newValue, protectedGas) {
    if (targetIndex !== this.lastTargetIndex) {
      this.lastTargetIndex = targetIndex;
    }
    let currentValue = this.values[targetIndex];
    let nextValue = this.constrain(newValue);
    let delta = nextValue - currentValue;

    if (!delta) {
      return this.values.slice();
    }

    let bank = 0;
    this.values.forEach((val, i) => {
      if (i !== targetIndex && !protectedGas.includes(i)) {
        bank += parseInt(val);
      }
    });

    if (Math.sign(delta) === 1 && bank === 0) {
      console.log("bug");
      return this.values.slice();
    }

    if (Math.sign(delta) === 1 && delta > bank) {
      console.log("bug");
      return this.values.slice();
    }

    this.values[targetIndex] = nextValue;
    let deltaToDistribute = Math.abs(delta);
    let step = delta > 0 ? -1 : 1;

    while (deltaToDistribute) {
      if (++this.lastIncrementedIndex >= this.values.length) {
        this.lastIncrementedIndex = 0;
      }

      if (this.lastIncrementedIndex === this.lastTargetIndex) {
        continue;
      }

      if (protectedGas.includes(this.lastIncrementedIndex)) {
        continue;
      }

      let currentValue = this.values[this.lastIncrementedIndex];

      nextValue = this.constrain(currentValue + step);

      if (nextValue !== currentValue) {
        this.values[this.lastIncrementedIndex] = nextValue;
        deltaToDistribute--;
      }
    }
    return this.values.slice();
  }

  setDepth() {
    // Max Over Depth (o2)
    let mod =
      Math.round((this.ppO2 / (this.values[0] / 100) - 1) * 10 * 10) / 10;

    this.maxOperatingDepth = mod;
  }

  /* Private Methods */
  constrain(value) {
    value = Math.max(value, this.minimum);
    value = Math.min(value, this.maximum);
    return value;
  }
}
