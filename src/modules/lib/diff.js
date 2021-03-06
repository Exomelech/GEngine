import { MathUtils } from 'three';
const { degToRad, radToDeg, clamp } = MathUtils;

const initAxises = (obj) => {
  obj.rotation.reorder('YXZ');
  obj.up.set(0, 1, 0);
};

const setAng = (obj, pitch = 0, yaw = 0, roll = 0, units = 'deg') => {
  if (units === 'deg') {
    obj.rotation.set(degToRad(pitch), degToRad(yaw), degToRad(roll));
  } else if (units === 'rad') {
    obj.rotation.set(pitch, yaw, roll);
  } else {
    console.warn(`Invalid units type: ${units}`);
  }
};

export { initAxises, setAng };
