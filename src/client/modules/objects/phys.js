import * as CANNON from 'cannon-es';

export class Phys {

  constructor(mesh){

  };

  static initPhys = () => {
    return new CANNON.World();
  };

};
