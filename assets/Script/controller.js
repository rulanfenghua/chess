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
    },
    button: {
      default: null,
      type: cc.Button
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.tilesThisX = this.conformNode.convertToWorldSpaceAR(this.tiles_instance.position)
    this.anchor = this.tiles_instance.convertToWorldSpaceAR(this.tiles_instance.children[0].position)
  },

  start() {
  },

  // update (dt) {},

  onBtnStart() {
    var n = Math.floor(Math.random() * 2) > 0 ? 1 : (Math.floor(Math.random() * 4) > 0 ? 2 : (Math.floor(Math.random() * 2) > 0 ? 3 : 4))
    this.player.getComponent('player').updateN(n)

    var step = this.player.getComponent('player').step
    this.player.getComponent('player').updateStep(true)

    this.button.interactable = false
    var tiles = this.tiles_instance.children
    var distance = (tiles[0].x - tiles[step].x) * this.tiles_instance.scale
    this.conformNode.runAction(cc.moveTo(0.4, this.conformNode.x + distance, this.conformNode.y))
    setTimeout(() => {
      this.button.interactable = true
      if (this.tiles_instance.convertToWorldSpaceAR(this.tiles_instance.children[65].position).x - this.anchor.x < 0) {
        var pitch = Math.round(((this.tiles_instance.convertToWorldSpaceAR(this.tiles_instance.children[65].position).x - this.anchor.x) / (this.tiles_instance.children[0].width * this.tiles_instance.scale)))
        var subPos = (tiles[60].x - tiles[59 + pitch].x) * this.tiles_instance.scale
        this.tiles_instance.position = this.conformNode.convertToNodeSpaceAR(this.tilesThisX).sub(cc.v2(subPos, 0))
      }
    }, 700)

    var id = this.player.getComponent('player').stepAll % 64
    var value = this.tiles_instance.children[id].getComponent('spaceTemplate').init()
    console.log('value', value)
  }
});
