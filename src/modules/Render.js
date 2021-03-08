import { WebGLRenderer } from 'three';

export class Render extends WebGLRenderer {

  constructor(camera, scene, params) {
    super({ antialias: false });
    this.setSize(window.innerWidth, window.innerHeight);
    // this.dom = this.renderer.domElement;
    this.camera = camera;
    this.scene = scene;
  };

  onWindowResize = (w, h) => {
    this.setSize(w, h);
  };

  think = () => {
    this.render(this.scene, this.camera);
  };

};
