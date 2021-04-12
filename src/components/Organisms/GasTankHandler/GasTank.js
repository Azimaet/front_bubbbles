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
  }

  /* Public Methods */
  setName() {
    if (this.values[0] === 21 && this.values[1] === 79) {
      console.log("Air");
      this.name = "Air";
    } else if ((this.values[0] = 100)) {
      console.log("Oxygen");
      this.name = "Oxygen";
    } else if (
      this.values[0] > 21 &&
      this.values[0] < 100 &&
      this.values[1] < 79 &&
      this.values[1] > 0 &&
      this.values[2] === 0 &&
      this.values[3] === 0
    ) {
      console.log("Nitrox");
      this.name = "Nitrox";
    } else {
      console.log("Unknown");
      this.name = "Unknown gaz";
    }
    return this.name;
  }

  setValue(targetIndex, newValue) {
    if (targetIndex !== this.lastTargetIndex) {
      this.lastTargetIndex = targetIndex;
    }

    let currentValue = this.values[targetIndex];
    let nextValue = this.constrain(newValue);
    let delta = nextValue - currentValue;

    if (!delta) {
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
      let currentValue = this.values[this.lastIncrementedIndex];

      nextValue = this.constrain(currentValue + step);
      if (nextValue !== currentValue) {
        this.values[this.lastIncrementedIndex] = nextValue;
        deltaToDistribute--;
      }
    }
    return this.values.slice();
  }

  /* Private Methods */
  constrain(value) {
    value = Math.max(value, this.minimum);
    value = Math.min(value, this.maximum);
    return value;
  }
}