import { LoadingManager } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { ModelsManifest } from 'Shared';

class InnerLoader{

  constructor(){
    this.threeLoader = new LoadingManager();
    this.objLoader = new OBJLoader(this.threeLoader);
    this.mtlLoader = new MTLLoader(this.threeLoader);
    this.avaibleLists = {};
    this.loadedModels = {
      maps: {},
      general: {}
    };
    this.validModels = {
      maps: [],
      general: []
    };
    this.onLoad = false;
    //this.contentPrefix = '../src';
  };

  internalModelsListUpdate = () => {
    this.avaibleLists = {};
    ModelsManifest.forEach(el => {
      this.avaibleLists[el.name] = el.list;
    });
    // console.log(this.avaibleLists);
  };

  loadMTL = async path => {
    return new Promise( res => {
      this.mtlLoader.load(path,
        mat => {
          mat.preload();
          res(mat);
        },
        () => {},
        () => { res(false) }
      )
    });
  };

  loadOBJ = async (model, texture) => {
    return new Promise( async res => {
      const mat = await this.loadMTL(texture);
      if( mat ){
        await this.objLoader.setMaterials(mat).load(model,
          obj => { res(obj) },
          () => {},
          () => { res(false) }
        );
      }else{
        res(false);
      };
    });
  };

  loadModelsList = async (name, cb) => {
    this.onLoad = true;
    if( this.avaibleLists[name] !== undefined ){
      for( const sub_title in this.avaibleLists[name] ){
        const sub = this.avaibleLists[name][sub_title];
        for( const el_name in sub ){
          const modelPath = `/content/${sub[el_name]}`;
          const objPath = `${modelPath}.obj`;
          const mtlPath = `${modelPath}.mtl`;
          const model = await this.loadOBJ( objPath, mtlPath );
          if( model ){
            if( this.validModels[sub_title].indexOf(el_name) === -1 ){
              this.validModels[sub_title].push(el_name);
            };
            this.loadedModels[sub_title][el_name] = model;
          }else{
            console.warn(`Loader: loadModelsList error, no such model name: ${el_name} in sub cat: ${sub_title} of list: ${name}`);
          };
        };
      };
      this.onLoad = false;
      cb(true, this.loadedModels);
    }else{
      console.warn(`Loader: loadModelsList error, no such list name: "${name}"!`);
      this.onLoad = false;
      cb(false, name);
    };
  };

  getModel = (name, cat = 'general') => {
    if( !this.onLoad ){
      if( this.loadedModels[cat][name] !== undefined ){
        return this.loadedModels[cat][name];
      }else{
        console.warn(`Loader: getModel error: no such model: ${name}`);
      };
    };
    return false;
  };

};

export const Loader = new InnerLoader();