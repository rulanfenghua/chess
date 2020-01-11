import mainCore from 'mainCore';

cc.Class({
  extends: cc.Component,

  properties: {
    tiles_instance: {
      default: null,
      type: cc.Node
    },
    player: {
      default: null,
      type: cc.Node
    },
    conformNode: {
      default: null,
      type: cc.Node
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    mainCore()
  },

  start() {
  },

  // update (dt) {},
  
});
