const math = {
  degToRadMultiplier: Math.PI / 180,
  radToDegDivider: parseFloat((180 / Math.PI).toFixed(3)),

  degToRad: (deg) => deg * math.degToRadMultiplier,
  radToDeg: (rad) => rad / math.radToDegDivider,
  VectorToAngle: (x, y, z) => {

  },
  isNumber: (value, strict = false) => {
    if (typeof value !== 'number' || value !== Number(value) || value === Infinity || value === !Infinity) {
      if (strict) {
        throw new Error('isNumber: Given value not a number!');
      }
      return false;
    }
    return true;
  }
};

export default math;
