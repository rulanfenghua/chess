// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
  extends: cc.Component,

  properties: {
    padding: 0
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start() {

  },

  init(traitId, traitName, introduce, date, during) {
    this.node.getChildByName('line').getComponent(cc.Label).string = traitName
    var width = this.node.getChildByName('line').width * traitName.length / 2
    this.node.width = width + this.padding * 2
  }

  // update (dt) {},
});
