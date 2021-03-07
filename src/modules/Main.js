// import * as three from 'three';
import Stats from 'stats.js';
import { proxyEvents } from './proxyEvents';
import { Camera } from './Camera';
import { Render } from './Render';
import { Scene } from './Scene';
import { StateController } from '../state/StateController';
import { Loader } from '../state/Loader';

export class Main {

  constructor(showFPS = false) {
    // proxyEvents.createEvent('onMouseLock');
    this.enable = false;
    this.camera = new Camera();
    this.camera.setPos(0, 2, 0);
    this.scene = new Scene();
    this.scene.initSky();
    this.scene.initLights();
    this.render = new Render(this.camera.camera, this.scene.scene);
    this.showFPS = showFPS;
    if (showFPS) this.initFPSShow();
    this.initWindowEvents();
    this.updateMainLoop();
    //StateController.addMainClass(this);
  };

  initWindowEvents = () => {
    this.topLayer = document.getElementById('interface');
    const renderDiv = document.getElementById('render');
    renderDiv.appendChild(this.render.dom);
    this.topLayer.addEventListener('click', this.onRequestPointerLock);
    window.addEventListener('resize', this.onWindowResize, false);
    document.addEventListener('pointerlockchange', this.onPointerlockchange);
    proxyEvents.subscribeEvent('onEscape', () => {
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
    proxyEvents.triggerEvent('onMouseLock', { state });
  };

  onWindowResize = () => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    this.camera.onWindowResize(width, height);
    this.render.onWindowResize(width, height);
  };

  updateMainLoop = () => {
    if (this.showFPS) this.statsPanel.begin();
    this.camera.think();
    this.render.think();
    if (this.showFPS) this.statsPanel.end();
    requestAnimationFrame(this.updateMainLoop);
  };

  changeMap = map => {
    // const map = Loader.getModel('maps', name);
    // @ts-ignore
    map.name = 'map';
    //console.log(map);
    this.scene.addObject(map);
  };

};
