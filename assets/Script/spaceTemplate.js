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
    spaceValue.set(1, [0, (32 + 16 + 8 + 4 + 2 + 1) * LL])
    spaceValue.set(2, [4, 0 * LL])
    spaceValue.set(3, [1, (16 + 1) * NN])
    spaceValue.set(4, [4, (32 + 2) * WN])
    spaceValue.set(5, [1, (16 + 4 + 2 + 1) * WL])
    spaceValue.set(6, [0, (32 + 16 + 8 + 2) * WN])
    spaceValue.set(7, [4, 2 * WL])
    spaceValue.set(8, [1, 16 * LL])
    spaceValue.set(9, [2, (32 + 16 + 4 + 2 + 1) * NN])
    spaceValue.set(10, [0, (32 + 16 + 8 + 2 + 1) * WL])
    spaceValue.set(11, [4, (4 + 2 + 1) * WW])
    spaceValue.set(12, [0, (32 + 16 + 8) * WW])
    spaceValue.set(13, [0, (32 + 16 + 8 + 4 + 1) * WL])
    spaceValue.set(14, [3, (32 + 8 + 4 + 2 + 1) * LL])
    spaceValue.set(15, [4, 4 * WW])
    spaceValue.set(16, [2, 8 * WW])
    spaceValue.set(17, [0, (16 + 8 + 1) * WW])
    spaceValue.set(18, [4, (32 + 4 + 2) * WW])
    spaceValue.set(19, [4, (2 + 1) * WL])
    spaceValue.set(20, [2, (32 + 16) * WL])
    spaceValue.set(21, [3, (32 + 8 + 1) * LL])
    spaceValue.set(22, [4, (32 + 4 + 1) * WL])
    spaceValue.set(23, [4, 32 * WN])
    spaceValue.set(24, [4, 1 * WW])
    spaceValue.set(25, [0, (32 + 16 + 8 + 1) * NN])
    spaceValue.set(26, [4, (32 + 4 + 2 + 1) * WL])
    spaceValue.set(27, [4, (32 + 1) * LL])
    spaceValue.set(28, [0, (16 + 8 + 4 + 2) * WN])
    spaceValue.set(29, [1, (16 + 2) * NN])
    spaceValue.set(30, [3, (32 + 8 + 4 + 1) * WL])
    spaceValue.set(31, [0, (16 + 8 + 4) * WL])
    spaceValue.set(32, [2, (8 + 4 + 2) * WL])
    spaceValue.set(33, [0, (32 + 16 + 8 + 4) * NN])
    spaceValue.set(34, [2, (8 + 4 + 2 + 1) * WL])
    spaceValue.set(35, [3, (32 + 8) * WL])
    spaceValue.set(36, [4, (4 + 1) * WN])
    spaceValue.set(37, [2, (32 + 16 + 4 + 1) * NN])
    spaceValue.set(38, [3, (32 + 8 + 2 + 1) * NN])
    spaceValue.set(39, [1, (16 + 4) * NN])
    spaceValue.set(40, [2, (8 + 4) * WL])
    spaceValue.set(41, [4, (32 + 2 + 1) * NN])
    spaceValue.set(42, [2, (32 + 16 + 1) * LL])
    spaceValue.set(43, [0, (16 + 8 + 4 + 2 + 1) * LL])
    spaceValue.set(44, [0, (32 + 16 + 8 + 4 + 2) * L])
    spaceValue.set(45, [0, (16 + 8) * WL])
    spaceValue.set(46, [4, (4 + 2) * LL])
    spaceValue.set(47, [0, (16 + 8 + 2) * WL])
    spaceValue.set(48, [1, (16 + 4 + 2) * LL])
    spaceValue.set(49, [0, (16 + 8 + 4 + 2 + 1) * LL])
    spaceValue.set(50, [3, (32 + 8 + 4 + 2) * WN])
    spaceValue.set(51, [2, (8 + 1) * WL])
    spaceValue.set(52, [4, (32 + 4) * WN])
    spaceValue.set(53, [2, (32 + 16 + 4) * LL])
    spaceValue.set(54, [2, (8 + 2 + 1) * NN])
    spaceValue.set(55, [2, (8 + 4 + 1) * LL])
    spaceValue.set(56, [3, (32 + 8 + 4) * NN])
    spaceValue.set(57, [2, (32 + 16 + 4 + 2) * WL])
    spaceValue.set(58, [0, (16 + 8 + 2 + 1) * LL])
    spaceValue.set(59, [2, (32 + 16 + 2) * NN])
    spaceValue.set(60, [1, (16 + 2 + 1) * LL])
    spaceValue.set(61, [2, (32 + 16 + 2 + 1) * NN])
    spaceValue.set(62, [2, (8 + 4) * WL])
    spaceValue.set(63, [1, (16 + 4 + 1) * WL])
    spaceValue.set(0, [3, (32 + 8 + 2) * WN])
    this.spaceValue = spaceValue
  },

  start() {},

  // update (dt) {},
});
