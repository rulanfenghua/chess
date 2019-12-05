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
    id: cc.Label,
    spaceName: cc.Label,
    num: cc.Label,
    property: cc.Label,
    color: ''
  },

  // LIFE-CYCLE CALLBACKS:
  init(data) {
    this.id.string = data.id
    this.spaceName.string = data.name
    this.num.string = data.num
    this.property.string = data.property
    this.node.color = new cc.color(data.color)
  },

  // onLoad () {},

  start() {
    
  },

  // update (dt) {},
});
