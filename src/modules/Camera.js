import { Vector3, PerspectiveCamera, MathUtils } from 'three';
// import { FreeCam } from './camera/cameraFreeCam';
import { proxyEvents } from './proxyEvents';
import { StateController } from '../state/StateController';
import DefConfig from '../configs/camera_def';
const { degToRad, radToDeg, clamp } = MathUtils;

export class Camera {
  static CAMERA_ENUMS = {
    FREECAM: 0,
    FIRSTPERSON: 1,
    THIRDPERSON: 2,
    ORBITAL: 3,
    VEHICLE: 4,
    CUSTOM: 5
  };

  static Pi180 = 1.5707963268;

  static typeCheck(type) {
    const enums = Object.values(Camera.CAMERA_ENUMS);
    return enums.includes(type);
  }

  static angRadCheck(str) {
    return (str === 'deg' || str === 'ang');
  }

  constructor(type = 0, params = DefConfig) {
    this.type = Camera.typeCheck(type) ? type : 0;
    this.cameraInit(params);
    this.initControl();
  }

  cameraInit = (p) => {
    this.camera = new PerspectiveCamera(p.fov, window.innerWidth / window.innerHeight, p.near, p.far);
    this.camera.setFocalLength(15);
    this.camera.rotation.reorder('YXZ');
    this.camera.up.set(0, 1, 0);
    this.supportVecRight = new Vector3();
    this.supportVecForward = new Vector3();
    this.supportVecUp = new Vector3();
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
    proxyEvents.subscribeEvent('onMouseLock', (e) => {
      this.mouseEnable = e.state;
    });
    if (this.type === 0) {
      proxyEvents.subscribeEvent('onMouseMove', (e) => {
        this.firstPerson(e);
      });
    }
  };

  firstPerson = (e) => {
    if (this.mouseEnable) {
      const movementX = e.x * 0.1;
      const movementY = e.y * 0.075;
      this.addAng(-movementY, -movementX);
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
        this.camera.position.addScaledVector(forward, dist);
      };
      if (strafe_left || strafe_right) {
        const right = this.getRight();
        const dist = (strafe_right - strafe_left) * (this.flySpeed + speedUp);
        this.camera.position.addScaledVector(right, dist);
      };
      if (jump || ctrl) {
        const dist = (jump - ctrl) * (this.flySpeed + speedUp);
        this.camera.position.addScaledVector(this.camera.up, dist);
      };
    };
  };

  setPos = (x = 0, y = 0, z = 0) => {
    this.camera.position.set(x, y, z);
  };

  addPos = (x = 0, y = 0, z = 0) => {
    const { x: x1, y: y1, z: z1 } = this.camera.position;
    this.camera.position.set(x + x1, y + y1, z + z1);
  };

  addVec = (vec) => {
    this.camera.position.add(vec);
  };

  getPos = () => this.camera.position;
  // const { x, y, z } = this.camera.position;

  addAng = (pitch = 0, yaw = 0, roll = 0, units = 'deg') => {
    const { x, y, z } = this.camera.rotation;
    if (units === 'deg') {
      const newPitch = clamp(x + degToRad(pitch), -Camera.Pi180, Camera.Pi180);
      // this.camera.rotation.set(x + degToRad(pitch), y + degToRad(yaw), z + degToRad(roll));
      this.camera.rotation.set(newPitch, y + degToRad(yaw), 0);
    } else if (units === 'rad') {
      const newPitch = clamp(x + pitch, -Camera.Pi180, Camera.Pi180);
      this.camera.rotation.set(newPitch, y + yaw, z + roll);
    } else {
      console.warn(`Invalid units type: ${units}`);
    }
  };

  setAng = (pitch = 0, yaw = 0, roll = 0, units = 'deg') => {
    if (units === 'deg') {
      this.camera.rotation.set(degToRad(pitch), degToRad(yaw), degToRad(roll));
    } else if (units === 'rad') {
      this.camera.rotation.set(pitch, roll, yaw);
    } else {
      console.warn(`Invalid units type: ${units}`);
    }
  };

  getAng = (units = 'deg') => {
    const { x, y, z } = this.camera.rotation;
    if (!Camera.angRadCheck(units)) units = 'deg';
    if (units === 'deg') {
      return {
        pitch: radToDeg(x),
        yaw: radToDeg(z),
        roll: radToDeg(y)
      };
    }
    return {
      pitch: x,
      yaw: z,
      roll: y
    };
  };

  getUp = () => {
    this.getRight();
    this.supportVecUp.crossVectors(this.camera.up, this.supportVecRight);
    this.supportVecUp.applyAxisAngle(this.supportVecRight, this.camera.rotation.x + Camera.Pi180).normalize();
    return this.supportVecUp;
  };

  getForward = () => {
    this.getRight();
    this.supportVecForward.crossVectors(this.camera.up, this.supportVecRight);
    this.supportVecForward.applyAxisAngle(this.supportVecRight, this.camera.rotation.x).normalize();
    return this.supportVecForward;
  };

  getRight = () => {
    this.supportVecRight.setFromMatrixColumn(this.camera.matrix, 0);// .normalize();
    return this.supportVecRight;
  };

  onWindowResize = (w, h) => {
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  };

  think = () => {
    if( this.type === 0 ){
      this.freeMovement(StateController.inputs, StateController.clientState);
    };
  };

};
