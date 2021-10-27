import { PerspectiveCamera } from 'three';
import { EventBus } from 'Shared';
import { StateController } from '@C/state/StateController';
import { Object3DControls } from './lib/Object3DControls';
import DefConfig from '../configs/camera_def';

class Camera extends PerspectiveCamera{

  static CAMERA_ENUMS = {
    FREECAM: 0,
    FIRSTPERSON: 1,
    THIRDPERSON: 2,
    ORBITAL: 3,
    VEHICLE: 4,
    CUSTOM: 5
  };

  static typeCheck(type) {
    const enums = Object.values(Camera.CAMERA_ENUMS);
    return enums.includes(type);
  };

  static ASPECT_FORMATS = {
    "16/9": 16/9,
    "4/3": 4/3
  };

  constructor(type = 0, params) {
    const merged = {
      ...DefConfig,
      params,
    }
    super(
      merged.fov,
      Camera.ASPECT_FORMATS[merged.aspect],
      merged.near,
      merged.far
    );
    this.type = Camera.typeCheck(type) ? type : 0;
    this.cameraInit(merged);
    this.initControl();
  }

  cameraInit = (p) => {
    // this.ref = new PerspectiveCamera(p.fov, Camera.ASPECT_FORMATS[p.aspect], p.near, p.far);
    this.setFocalLength(15);
    this.rotation.reorder('YXZ');
    this.up.set(0, 1, 0);
    // const {
    //   pitch, yaw, roll, units
    // } = p.angle;
    // this.setAng(pitch, yaw, roll, units);
    const { x, y, z } = p.pos;
    this.setPos(x, y, z);
    this.flySpeed = p.flySpeed;
  };

  initControl = () => {
    this.mouseEnable = false;
    EventBus.subscribeEvent('onMouseLock', (e) => {
      this.mouseEnable = e.state;
    });
    if (this.type === 0) {
      EventBus.subscribeEvent('onMouseMove', (e) => {
        this.firstPerson(e);
      });
    }
  };

  firstPerson = (e) => {
    if (this.mouseEnable) {
      const movementX = e.x * 0.1;
      const movementY = e.y * 0.075;
      this.addAngDegCameraMode(-movementY, -movementX);
    }
  };

  freeMovement = (e, state) => {
    //console.log(state);
    if( state === 'ingame' ){
      const {
        move_forward, move_backward, strafe_left, strafe_right, shift, jump, ctrl
      } = e.keys;
      const speedUp = +shift * 1;
      if (move_forward || move_backward) {
        const forward = this.getForward();
        const dist = (move_forward - move_backward) * (this.flySpeed + speedUp);
        // this.camera.position.addScaledVector(forward, dist);
        this.addScaledVector(forward, dist)
      };
      if (strafe_left || strafe_right) {
        const right = this.getRight();
        const dist = (strafe_right - strafe_left) * (this.flySpeed + speedUp);
        // this.camera.position.addScaledVector(right, dist);
        this.addScaledVector(right, dist)
      };
      if (jump || ctrl) {
        const dist = (jump - ctrl) * (this.flySpeed + speedUp);
        // this.camera.position.addScaledVector(this.camera.up, dist);
        this.addScaledVector(this.up, dist)
      };
    };
  };

  onWindowResize = (w, h) => {
    this.aspect = w / h;
    this.updateProjectionMatrix();
  };

  think = () => {
    if( this.type === 0 ){
      this.freeMovement(StateController.inputs, StateController.clientState);
    };
  };

};

Object.assign( Camera.prototype, Object3DControls );

export { Camera };