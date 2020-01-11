import mainCore from 'mainCore';

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
    this.originX = this.node.x
    this.n = 0
    this.step = 0
    this.stepAll = 0
    this.posTo = cc.v2(0, 0)

    this.updateN()
    this.tilesThisX = this.conformNode.convertToWorldSpaceAR(this.tiles_instance.position)
    this.anchor = this.tiles_instance.convertToWorldSpaceAR(this.tiles_instance.children[0].position)
  },

  start() {
    this.node.on('touchmove', this.move, this)
    this.node.on('touchstart', () => {
      this.on = true
      this.originX = this.node.x

      var tiles = this.tiles_instance.children
      var min = this._minTile()
      if (this.n > 0) {
        var tileTo = tiles[min + this.n]
      } else {
        tileTo = tiles[min]
      }
      this.posTo = this.conformNode.convertToNodeSpaceAR(this.tiles_instance.convertToWorldSpaceAR(tileTo.position))
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

  updateN() { // 更新随机向前的量
    this.n = Math.floor(Math.random() * 2) > 0 ? 1 : (Math.floor(Math.random() * 4) > 0 ? 2 : (Math.floor(Math.random() * 2) > 0 ? 3 : 4))
    console.log('n', this.n)
  },
  updateStep(n) { // 更新记录向前移动
    this.stepAll += n
    console.log('stepAll', this.stepAll)
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

  move(event) {
    var delta = event.getDelta()
    if (delta.x > 0) {
      this.node.x = this.node.x + delta.x
    }
    
    if (this.node.x - this.posTo.x > this.tiles_instance.children[0].width / 9 * this.tiles_instance.scale) {
      this.node.x = this.posTo.x + this.tiles_instance.children[0].width / 9 * this.tiles_instance.scale
    } else if (this.node.x - this.originX < -this.tiles_instance.children[0].width / 9 * this.tiles_instance.scale) {
      this.node.x = this.originX - this.tiles_instance.children[0].width / 9 * this.tiles_instance.scale
    }
  },
  moveEnd() {
    var tiles = this.tiles_instance.children

    this.node.stopAllActions()
    var min = this._minTile()
    var some = tiles.find(tile => {
      var pos = this.conformNode.convertToNodeSpaceAR(this.tiles_instance.convertToWorldSpaceAR(tile.position))
      var width = tile.width / 2 * this.tiles_instance.scale // 回弹距离
      var some = Math.abs(pos.x - this.node.x) < width
      if (some) {
        this.node.runAction(cc.moveTo(0.4, pos.x, this.node.y))
      }
      return some
    })
    if (tiles.indexOf(some) != min) {
      this.updateStep(tiles.indexOf(some) - min)
      this.updateN()
      var distance = (tiles[min].x - some.x) * this.tiles_instance.scale
      this.conformNode.runAction(cc.moveTo(0.4, this.conformNode.x + distance, this.conformNode.y))

      if (this.tiles_instance.convertToWorldSpaceAR(tiles[65].position).x - this.anchor.x < 0) {
        var pitch = Math.round(((this.tiles_instance.convertToWorldSpaceAR(tiles[65].position).x - this.anchor.x) / (tiles[0].width * this.tiles_instance.scale)))
        var subPos = (tiles[60].x - tiles[59 + pitch].x) * this.tiles_instance.scale
        this.tiles_instance.position = this.conformNode.convertToNodeSpaceAR(this.tilesThisX).sub(cc.v2(subPos, 0))
      }

      var id = this.stepAll % 64 == 0 ? 1 : this.stepAll % 64
      var value = tiles[id].getComponent('spaceTemplate').init()
      mainCore(value)
    }
  }
});
