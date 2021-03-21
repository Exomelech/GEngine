import { Scene as ThreeScene, Vector3, AmbientLight, DirectionalLight } from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky';
import { StateController } from '../state/StateController';

export class Scene extends ThreeScene {

  constructor() {
    super();
  };

  initSky = () => {
    const sky = new Sky();
    sky.scale.setScalar(450000);
    this.add(sky);
    const { uniforms } = sky.material;
    uniforms.turbidity.value = 1.7;
    uniforms.rayleigh.value = 0.25;
    uniforms.mieCoefficient.value = 0.013;
    uniforms.mieDirectionalG.value = 0.67;
    uniforms.sunPosition.value = new Vector3(0, 45000, 0);
  };

  initLights = () => {
    const ambientLight = new AmbientLight(0xcccccc, 0.3);
    this.add(ambientLight);
    const directionalLight = new DirectionalLight(0xfff394, 0.6);
    directionalLight.position.set(10, 10, 10);
    this.add(directionalLight);
  };

  clear = () => {
    this.traverse( object => {
      if( !object.isMesh ) return;
      object.geometry.dispose();

      if( object.material.isMaterial ){
        this.clearMaterial(object.material);
      }else{
        for( const material of object.material ){
          this.clearMaterial(material);
        };
      };
    });
  };

  clearMaterial = material => {
    material.dispose();
    for (const key of Object.keys(material)) {
      const value = material[key];
      if (value && typeof value === 'object' && 'minFilter' in value) {
        value.dispose();
      };
    };
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