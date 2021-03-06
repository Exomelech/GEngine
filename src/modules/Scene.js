import * as three from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky';
import { StateController } from '../state/StateController';

export class Scene {

  constructor() {
    this.scene = new three.Scene();
  };

  addObject = (obj) => {
    this.scene.add(obj);
  };

  initSky = () => {
    const sky = new Sky();
    sky.scale.setScalar(450000);
    this.addObject(sky);
    const { uniforms } = sky.material;
    uniforms.turbidity.value = 1.7;
    uniforms.rayleigh.value = 0.25;
    uniforms.mieCoefficient.value = 0.013;
    uniforms.mieDirectionalG.value = 0.67;
    uniforms.sunPosition.value = new three.Vector3(0, 45000, 0);
  };

  initLights = () => {
    const ambientLight = new three.AmbientLight(0xcccccc, 0.3);
    this.addObject(ambientLight);
    const directionalLight = new three.DirectionalLight(0xfff394, 0.6);
    directionalLight.position.set(10, 10, 10);
    this.addObject(directionalLight);
  };

  // changeMap = name => {
  //   const map = StateController.getModel('maps', name);
  //   if( map ){
  //     this.addObject(map);
  //   }else{
  //     console.warn(`Scene: loadMap error: no such map: ${name}`);
  //   };
  // };

};