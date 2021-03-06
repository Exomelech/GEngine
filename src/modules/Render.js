import { WebGLRenderer } from 'three';

export class Render {
  constructor(camera, scene, params) {
    this.renderer = new WebGLRenderer({ antialias: false });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.dom = this.renderer.domElement;
    this.camera = camera;
    this.scene = scene;
  }

  onWindowResize = (w, h) => {
    this.renderer.setSize(w, h);
  };

  think = () => {
    this.renderer.render(this.scene, this.camera);
  };
}
