// import * as three from 'three';
import Stats from 'stats.js';
import { EventBus } from 'Shared';
import { Camera } from './Camera';
import { Render } from './Render';
import { Scene } from './Scene';
import { StateController } from '@C/state/StateController';
import { Phys } from './objects/phys';
// import { Loader } from '../state/Loader';

export class Main {

  constructor(showFPS = false) {
    this.enable = true;
    this.camera = new Camera();
    this.camera.setPos(0, 2, 0);
    this.scene = new Scene();
    this.scene.initSky();
    this.scene.initLights();
    this.render = new Render(this.camera, this.scene);
    this.showFPS = showFPS;
    if(showFPS) this.initFPSShow();

    this.physWorld = Phys.initPhys();
    console.log(this.physWorld);

    this.initWindowEvents();
    this.updateMainLoop();
  };

  initWindowEvents = () => {
    this.topLayer = document.getElementById('interface');
    const renderDiv = document.getElementById('render');
    renderDiv.appendChild(this.render.domElement);
    this.topLayer.addEventListener('click', this.onRequestPointerLock);
    window.addEventListener('resize', this.onWindowResize, false);
    document.addEventListener('pointerlockchange', this.onPointerlockchange);
    EventBus.subscribeEvent('onEscape', () => {
      document.exitPointerLock();
    });
  };

  initFPSShow = () => {
    this.statsPanel = new Stats();
    this.statsPanel.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild(this.statsPanel.dom);
  };

  addToScene = (obj) => this.scene.addObject(obj);

  onRequestPointerLock = () => {
    const state = StateController.clientState;
    if( state === 'ingame' || state === 'ingameMenu' ){
      this.topLayer.requestPointerLock();
    };
  };

  onPointerlockchange = () => {
    const state = document.pointerLockElement === this.topLayer;
    EventBus.triggerEvent('onMouseLock', { state });
  };

  onWindowResize = () => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    this.camera.onWindowResize(width, height);
    this.render.onWindowResize(width, height);
  };

  updateMainLoop = () => {
    if( this.enable ){
      if (this.showFPS) this.statsPanel.begin();
      this.camera.think();
      this.render.think();
      if (this.showFPS) this.statsPanel.end();
      requestAnimationFrame(this.updateMainLoop);
    };
  };

  changeMap = map => {
    // const map = Loader.getModel('maps', name);
    map.name = 'map';
    //console.log(map);
    this.scene.add(map);
  };

  dispose = () => {
    console.log('dispose renderer!');
    this.enable = false;
    this.render.domElement.remove();
    this.render.dispose();
    // this.camera.dispose();
    this.scene.clear();
  };

};
