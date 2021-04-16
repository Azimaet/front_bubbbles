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
    if (this.values[0] === 100) {
      this.name = "Oxygen";
    } else if (this.values[0] === 21 && this.values[1] === 79) {
      this.name = "Air";
    } else if (
      this.values[0] > 21 &&
      this.values[0] < 100 &&
      this.values[1] < 79 &&
      this.values[1] > 0 &&
      this.values[2] === 0 &&
      this.values[3] === 0
    ) {
      this.name = "Nitrox";
    } else if (
      this.values[0] > 0 &&
      this.values[2] > 0 &&
      this.values[1] === 0 &&
      this.values[3] === 0
    ) {
      this.name = "Heliox";
    } else if (
      this.values[0] > 0 &&
      this.values[3] > 0 &&
      this.values[1] === 0 &&
      this.values[2] === 0
    ) {
      this.name = "Hydrox";
    } else if (
      this.values[0] > 0 &&
      this.values[2] > 0 &&
      this.values[1] > 0 &&
      this.values[3] === 0
    ) {
      this.name = "Trimix";
    } else if (
      this.values[0] > 0 &&
      this.values[3] > 0 &&
      this.values[2] > 0 &&
      this.values[1] === 0
    ) {
      this.name = "Hydreliox";
    } else {
      this.name = "Unknown gaz";
    }
    return this.name;
  }

  setValue(targetIndex, newValue, protectedGas) {
    // If the target index has changed, let's reset our distribution references.
    if (targetIndex !== this.lastTargetIndex) {
      this.lastTargetIndex = targetIndex;
    }
    // On récupère la valeur courante (celle d'avant le changement)
    let currentValue = this.values[targetIndex];
    // Constrain the application of the new value to the target index.
    let nextValue = this.constrain(newValue);
    // Get the portion of the new value that was actually consumed.
    let delta = nextValue - currentValue;
    // If no portion of the new value was actually consumed, there's nothing left to do
    if (!delta) {
      return this.values.slice();
    }

    /* 
    Maintenant, il faut checker que la valeur demandée est bien décrémentable: sinon ca va louper à donf
    En effet, il est possible que des valeurs gazs soient protégées, et donc no modifiables.
    Il faut donc regarder que dans les valeurs libres, nous ayons assez de rest pour décrémenter.
    On set bank à 0 et on additionne toutes les values sauf le gaz courant et les gazs protégées
    */
    let bank = 0;
    this.values.forEach((val, i) => {
    if (i !== targetIndex && !protectedGas.includes(i)) {
      bank += parseInt(val);
      }
    });

    // If delta est positive mais la bank est de 0, c'est pas ok
    if ((Math.sign(delta) === 1) && bank === 0){
      return this.values.slice();
    }
    // If delta est positif et supérieure à la bank est de 0, c'est pas ok
    if ((Math.sign(delta) === 1) && delta > bank){
      return this.values.slice();
    }


    // At this point, we've validated the new value against the target value, we can
    // apply the new value back to the collection.
    this.values[targetIndex] = nextValue;
    // Now, we have to distribute the INVERSE of the delta to the rest of the values
    // in the equalizer. We want to distribute the delta equally across all of the
    // other facets, so let's keep looping and handing out a single step.
    let deltaToDistribute = Math.abs(delta);
    let step = delta > 0 ? -1 : 1;

    // Since we know that the equalizer values will always maintain a fixed sum, we
    // know that it is safe to keep looping until the delta has been fully consumed.
    while (deltaToDistribute) {
      // console.log("deltaToDistribute : " + deltaToDistribute);
      // console.log("lastIncrementedIndex : " + this.lastIncrementedIndex)
      // console.log("lastIncrementedIndex : " + this.lastTargetIndex)
      // Increment and constrain the next index.
      if (++this.lastIncrementedIndex >= this.values.length) {
        this.lastIncrementedIndex = 0;
      }
      // As we distribute the inverse delta, always skip the target index as this
      // index received the whole of the new value above.
      if (this.lastIncrementedIndex === this.lastTargetIndex) {
        continue;
      }

      if (protectedGas.includes(this.lastIncrementedIndex)) {
        continue;
      }
      // Constrain the application of the STEP to the current index. It's possible
      // that this index has already reached a local maximum and cannot be updated.
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
  // I constrain the given value to be within the min-max range.
  constrain(value) {
    value = Math.max(value, this.minimum);
    value = Math.min(value, this.maximum);
    return value;
  }
}
