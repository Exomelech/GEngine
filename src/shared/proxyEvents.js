class ProxyEvents{

  constructor(){
    this.events = {};
    this.globalEvents = [];
    console.log('Proxy Events inited');
  };
  
  createEvent = (name) => {
    if( this.events[name] === undefined ){
      this.events[name] = [];
    };
  };

  subscribeEvent = (name, callback, autoinit = false) => {
    if( autoinit ){
      this.createEvent(name);
    };
    if( this.events[name] !== undefined ){
      this.events[name].push((args) => callback(args));
    }else{
      console.warn(`No such event name: ${name}`);
    };
  };

  triggerEvent = (name, args) => {
    if( this.events[name] !== undefined ){
      this.events[name].map((callback) => callback(args));
    };
  };

  // addGlobalEvent = (callback, args) => {
  //   this.globalEvents.push(() => callback(args));
  // };

  // triggerGlobalEvents = () => {
  //   this.globalEvents.map((event) => event());
  // };

};

const proxyEvents = new ProxyEvents();
export { proxyEvents };