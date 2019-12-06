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
    conformNode: {
      default: null,
      type: cc.Node
    },
    tiles_instance: {
      default: null,
      type: cc.Node
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.on = false
    this.originX = this.node.x
    this.stepTile = 0
    this.step = 0

    var n = Math.floor(Math.random() * 2) > 0 ? 1 : (Math.floor(Math.random() * 4) > 0 ? 2 : (Math.floor(Math.random() * 2 > 0 ? 3 : 4)))
    this.updateN(n, true)
  },

  start() {
    this.node.on('touchmove', (event) => {
      this.move(event)
    }, this)
    this.node.on('touchstart', () => {
      this.on = true
      this.originX = this.node.x
    })
    this.node.on('touchend', () => {
      this.moveEnd()
    })
    this.node.on('touchcancel', () => {
      this.moveEnd()
    })
  },

  update(dt) {

  },

  updateN(n, isFirst) {
    if (isFirst) {
      this.stepTile = this._minTile() + n
    } else {
      this.stepTile = this._minTile() + 1 + n
    }
    console.log('n', n)
  },
  updateStep(reset) {
    if (reset) {
      this.step = 0
    } else {
      this.step++
    }
  },

  _minTile() {
    var tiles = this.tiles_instance.children

    // 求出player附着的tile位置min
    var min = 0
    var pos = this.conformNode.convertToNodeSpaceAR(this.tiles_instance.convertToWorldSpaceAR(tiles[min].position))
    for (var i = 1; i < tiles.length; i++) {
      var pos2 = this.conformNode.convertToNodeSpaceAR(this.tiles_instance.convertToWorldSpaceAR(tiles[i].position))
      if (Math.abs(pos2.x - this.originX) < Math.abs(pos.x - this.originX)) {
        min = i
        pos = pos2
      }
    }
    return min
  },

  move(event) { // todo 放在update里
    var delta = event.getDelta()
    var tiles = this.tiles_instance.children

    // this.node.stopAllActions()
    if (this.on) {
      this.node.x += delta.x

      var min = this._minTile()
      if (min < this.stepTile) {
        var tileTo = tiles[min + 1]
      } else {
        tileTo = tiles[min]
      }
      var posTo = this.conformNode.convertToNodeSpaceAR(this.tiles_instance.convertToWorldSpaceAR(tileTo.position))
      if (this.node.x - posTo.x > tileTo.width / 9 * this.tiles_instance.scale || this.node.x - this.originX < -tileTo.width / 9 * this.tiles_instance.scale) {
        this.on = false
        this.node.stopAllActions()
      }
    }
  },
  moveEnd() {
    var tiles = this.tiles_instance.children

    this.node.stopAllActions()
    var min = this._minTile()
    var some = tiles.some(tile => {
      var pos = this.conformNode.convertToNodeSpaceAR(this.tiles_instance.convertToWorldSpaceAR(tile.position))
      var width = tile.width / 2 * this.tiles_instance.scale // 回弹距离
      var some = Math.abs(pos.x - this.node.x) < width
      if (some) {
        this.node.runAction(cc.moveTo(0.4, pos.x, this.node.y))
        if (tile != tiles[min]) {
          this.updateStep(false)
        }
      }
      return some
    })
    if (!some) {
      this.node.runAction(cc.moveTo(0.4, this.originX, this.node.y))
    }
  }
});
