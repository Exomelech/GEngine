import React, {createContext, useContext} from 'react';
import { action, observable, makeAutoObservable, makeObservable } from 'mobx';
import create from 'zustand';
import { Main } from '@C/modules/Main';
import { Inputs } from './Inputs';
import { Loader } from './Loader';
import { EventBus } from 'Shared';

class InnerStateController {

  constructor() {
    this.nextState = 'menu';
    this.pending = false;
    this.inputs = new Inputs(this);
    this.loadModelsList('base');
    this.avaibleMaps = [];
    this.mapToLoad = 'none';
    this.clientState = 'loading';
    this.avaibleMaps = [];
    //EventBus.createEvent('mapChangeRequest');
    //makeAutoObservable(this);
    makeObservable(this, {
      avaibleMaps: observable,
      clientState: observable,
      onModelsListLoadComplete: action,
      startGame: action,
      onMouseLock: action
    });

    EventBus.subscribeEvent('onMouseLock', this.onMouseLock, true);

  };

  loadModelsList = name => {
    if( !this.pending ){
      this.pending = true;
      Loader.internalModelsListUpdate();
      //console.log(Loader.avaibleLists);
      Loader.loadModelsList(name, this.onModelsListLoadComplete);
      // Loader.loadModelsListParsing(name, this.onModelsListLoadComplete);
    };
  };

  @action onMouseLock = ({state}) => {
    if( state && this.clientState === 'ingameMenu' ){
      this.clientState = 'ingame';
    };
    if( !state && this.clientState === 'ingame' ){
      this.clientState = 'ingameMenu';
    };
  };

  @action onModelsListLoadComplete = (succes, models) => {
    this.pending = false;
    this.avaibleMaps = Loader.validModels.maps;
    this.clientState = this.nextState;
    //console.log( this.clientState );
    // console.log(models);
  };

  getMapsList = () => {
    return this.avaibleMaps;
  };

  getMapsListForSelect = () => {
    return this.avaibleMaps.map( el =>
      ({
        value: el,
        label: el
      })
    );
  };

  updateMapSelect = (name) => {
    this.mapToLoad = name;
  };

  initMainClass = () => {
    this.main = new Main();
  };

  @action startGame = () => {
    if( this.mapToLoad !== 'none' ){
      this.clientState = 'loading';
      this.initMainClass();
      const map = Loader.getModel(this.mapToLoad, 'maps');
      this.main.changeMap( map );
      this.clientState = 'ingameMenu';
    };
  };

  @action stopGame = () => {
    if( this.clientState === 'ingameMenu' ){
      this.main.dispose();
      delete this.main;
      console.log(this.main);
      this.clientState = 'menu';
    };
  };

  // getModel = (cat, name) => Loader.getModel(cat, name);

  // getScene = () => this.main.scene;
  // getCamera = () => this.main.camera;
  // getRender = () => this.main.render;

  // @action requestMapChange = async name => {
  //   if( !this.await ){
  //     this.await = true;
  //     //while( Loader.onLoad );
  //     //EventBus.triggerEvent('mapChangeRequest', {map: name});
  //     this.main.changeMap(name);
  //     this.await = false;
  //     console.log('Store: map changed')
  //   }else{
  //     console.warn('Store: request pending');
  //   };
  // };

};

const StateController = new InnerStateController();
const StateControllerContext = createContext( StateController );
const useStateController = () => useContext( StateControllerContext );
export { StateController, StateControllerContext, useStateController };