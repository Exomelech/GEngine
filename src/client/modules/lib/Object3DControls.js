import { Vector3, MathUtils } from 'three';
const { degToRad, radToDeg, clamp } = MathUtils;

export const Object3DControls = {

  Pi180: 1.5707963268,
  supportVecRight: new Vector3(),
  supportVecForward: new Vector3(),
  supportVecUp: new Vector3(),

  setPos(x = 0, y = 0, z = 0){
    this.position.set(x, y, z);
  },

  addPos(x = 0, y = 0, z = 0){
    const { x: x1, y: y1, z: z1 } = this.position;
    this.position.set(x + x1, y + y1, z + z1);
  },

  addVec(vec){ this.position.add(vec); },

  getPos(){ this.position; },

  addAngDeg(pitch = 0, yaw = 0, roll = 0){
    const { x, y, z } = this.rotation;
    this.rotation.set(x + degToRad(pitch), y + degToRad(yaw), z + degToRad(roll));
  },

  addAngDegCameraMode(pitch = 0, yaw = 0){
    const { x, y } = this.rotation;
    const newPitch = clamp(x + degToRad(pitch), -Object3DControls.Pi180, Object3DControls.Pi180);
    this.rotation.set(newPitch, y + degToRad(yaw), 0);
  },

  setAngDeg(pitch = 0, yaw = 0, roll = 0){
    this.rotation.set(degToRad(pitch), degToRad(yaw), degToRad(roll));
  },

  getAngDeg(){
    const { x, y, z } = this.camera.rotation;
    return {
      pitch: radToDeg(x),
      yaw: radToDeg(z),
      roll: radToDeg(y)
    };
  },

  getUp(){
    this.getRight();
    this.supportVecUp.crossVectors(this.up, this.supportVecRight);
    this.supportVecUp.applyAxisAngle(this.supportVecRight, this.rotation.x + Object3DControls.Pi180).normalize();
    return this.supportVecUp;
  },

  getForward(){
    this.getRight();
    this.supportVecForward.crossVectors(this.up, this.supportVecRight);
    this.supportVecForward.applyAxisAngle(this.supportVecRight, this.rotation.x).normalize();
    return this.supportVecForward;
  },

  getRight(){
    this.supportVecRight.setFromMatrixColumn(this.matrix, 0);// .normalize();
    return this.supportVecRight;
  },

  addScaledVector(dir, len){ this.position.addScaledVector(dir, len); }

};