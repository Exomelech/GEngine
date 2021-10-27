import {EventBus} from 'Shared';
import {actions, keys} from './mappedInputs';

class Inputs{
  constructor(){
    this.mouse = {
      left: false,
      right: false,
      x: 0,
      y: 0
    };
    this.keys = actions.reduce((next, acc) => {
      acc[next] = false;
      return acc;
    }, {});
    this.initDocEvents();
    this.initAutorunsAndEvents();
  };

  initDocEvents = () => {
    document.body.addEventListener('keydown', this.onKeyDown);
    document.body.addEventListener('keyup', this.onKeyUp);
    document.addEventListener('mousemove', this.onMouseMove);
    //document.addEventListener('mo')
  };

  initAutorunsAndEvents = () => {
    EventBus.createEvent('onUse');
    EventBus.createEvent('movementButtons');
    EventBus.createEvent('onMouseMove');
    EventBus.createEvent('onEscape');
    EventBus.createEvent('onJump');
  };

  onKeyDown = (e) => {
    // e.preventDefault();
    if( e.repeat ) return;
    //console.log(e);
    //console.log(e.code);
    const action = Inputs.KEYSACTIONS[e.code];
    if( action !== undefined ){
      this.keys[action] = true;
      if(Inputs.inputsBindedEvents[action] !== undefined){
        Inputs.inputsBindedEvents[action]();
      };
    };
  };
  
  onKeyUp = (e) => {
    // e.preventDefault();
    //console.log(e);
    const action = Inputs.KEYSACTIONS[e.code];
    if( action !== undefined ){
      this.keys[action] = false;
    };
  };

  onMouseMove = (e) => {
    this.mouse.x = e.movementX;
    this.mouse.y = e.movementY;
    EventBus.triggerEvent('onMouseMove', {
      x: e.movementX,
      y: e.movementY,
    });
  };

  static KEYSACTIONS = actions;

  static inputsBindedEvents = {
    use: () => EventBus.triggerEvent('onUse'),
    jump: () => EventBus.triggerEvent('onJump'),
    escape: () => EventBus.triggerEvent('onEscape')
  };
};

export { Inputs };