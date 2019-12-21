/* eslint-disable no-undef */
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
    id: NaN
  },

  // LIFE-CYCLE CALLBACKS:
  init() {
    return this.spaceValue.get(this.id)
  },

  onLoad() {
    let LL = 6.14
    let WL = 3.86
    let WN = -2.14
    let NN = -4
    let WW = 1
    let L = 4

    let spaceValue = new Map()
    spaceValue.set(1, {'金': (32 + 16 + 8 + 4 + 2 + 1) * LL})
    spaceValue.set(2, {'土': 0 * LL})
    spaceValue.set(3, {'水': (16 + 1) * NN})
    spaceValue.set(4, {'土': (32 + 2) * WN})
    spaceValue.set(5, {'水': (16 + 4 + 2 + 1) * WL})
    spaceValue.set(6, {'金': (32 + 16 + 8 + 2) * WN})
    spaceValue.set(7, {'土': 2 * WL})
    spaceValue.set(8, {'水': 16 * LL})
    spaceValue.set(9, {'木': (32 + 16 + 4 + 2 + 1) * NN})
    spaceValue.set(10, {'金': (32 + 16 + 8 + 2 + 1) * WL})
    spaceValue.set(11, {'土': (4 + 2 + 1) * WW})
    spaceValue.set(12, {'金': (32 + 16 + 8) * WW})
    spaceValue.set(13, {'金': (32 + 16 + 8 + 4 + 1) * WL})
    spaceValue.set(14, {'火': (32 + 8 + 4 + 2 + 1) * LL})
    spaceValue.set(15, {'土': 4 * WW})
    spaceValue.set(16, {'木': 8 * WW})
    spaceValue.set(17, {'金': (16 + 8 + 1) * WW})
    spaceValue.set(18, {'土': (32 + 4 + 2) * WW})
    spaceValue.set(19, {'土': (2 + 1) * WL})
    spaceValue.set(20, {'木': (32 + 16) * WL})
    spaceValue.set(21, {'火': (32 + 8 + 1) * LL})
    spaceValue.set(22, {'土': (32 + 4 + 1) * WL})
    spaceValue.set(23, {'土': 32 * WN})
    spaceValue.set(24, {'土': 1 * WW})
    spaceValue.set(25, {'金': (32 + 16 + 8 + 1) * NN})
    spaceValue.set(26, {'土': (32 + 4 + 2 + 1) * WL})
    spaceValue.set(27, {'土': (32 + 1) * LL})
    spaceValue.set(28, {'金': (16 + 8 + 4 + 2) * WN})
    spaceValue.set(29, {'水': (16 + 2) * NN})
    spaceValue.set(30, {'火': (32 + 8 + 4 + 1) * WL})
    spaceValue.set(31, {'金': (16 + 8 + 4) * WL})
    spaceValue.set(32, {'木': (8 + 4 + 2) * WL})
    spaceValue.set(33, {'金': (32 + 16 + 8 + 4) * NN})
    spaceValue.set(34, {'木': (8 + 4 + 2 + 1) * WL})
    spaceValue.set(35, {'火': (32 + 8) * WL})
    spaceValue.set(36, {'土': (4 + 1) * WN})
    spaceValue.set(37, {'木': (32 + 16 + 4 + 1) * NN})
    spaceValue.set(38, {'火': (32 + 8 + 2 + 1) * NN})
    spaceValue.set(39, {'水': (16 + 4) * NN})
    spaceValue.set(40, {'木': (8 + 4) * WL})
    spaceValue.set(41, {'土': (32 + 2 + 1) * NN})
    spaceValue.set(42, {'木': (32 + 16 + 1) * LL})
    spaceValue.set(43, {'金': (16 + 8 + 4 + 2 + 1) * LL})
    spaceValue.set(44, {'金': (32 + 16 + 8 + 4 + 2) * L})
    spaceValue.set(45, {'金': (16 + 8) * WL})
    spaceValue.set(46, {'土': (4 + 2) * LL})
    spaceValue.set(47, {'金': (16 + 8 + 2) * WL})
    spaceValue.set(48, {'水': (16 + 4 + 2) * LL})
    spaceValue.set(49, {'金': (16 + 8 + 4 + 2 + 1) * LL})
    spaceValue.set(50, {'火': (32 + 8 + 4 + 2) * WN})
    spaceValue.set(51, {'木': (8 + 1) * WL})
    spaceValue.set(52, {'土': (32 + 4) * WN})
    spaceValue.set(53, {'木': (32 + 16 + 4) * LL})
    spaceValue.set(54, {'木': (8 + 2 + 1) * NN})
    spaceValue.set(55, {'木': (8 + 4 + 1) * LL})
    spaceValue.set(56, {'火': (32 + 8 + 4) * NN})
    spaceValue.set(57, {'木': (32 + 16 + 4 + 2) * WL})
    spaceValue.set(58, {'金': (16 + 8 + 2 + 1) * LL})
    spaceValue.set(59, {'木': (32 + 16 + 2) * NN})
    spaceValue.set(60, {'水': (16 + 2 + 1) * LL})
    spaceValue.set(61, {'木': (32 + 16 + 2 + 1) * NN})
    spaceValue.set(62, {'木': (8 + 4) * WL})
    spaceValue.set(63, {'水': (16 + 4 + 1) * WL})
    spaceValue.set(0, {'火': (32 + 8 + 2) * WN})
    this.spaceValue = spaceValue
  },

  start() {},

  // update (dt) {},
});
