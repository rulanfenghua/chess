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
    on: false,
    originX: 0
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

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

  init(background_instance, tiles_instance) {
    this.background_instance = background_instance
    this.tiles_instance = tiles_instance
  },

  move(event) {
    var delta = event.getDelta()
    var tiles = this.tiles_instance.children

    // this.node.stopAllActions()
    if (this.on) {
      this.node.x += delta.x

      var min = 0
      var pos = this.background_instance.convertToNodeSpaceAR(this.tiles_instance.convertToWorldSpaceAR(tiles[min].position))
      for (var i = 1; i < tiles.length; i++) {
        var pos2 = this.background_instance.convertToNodeSpaceAR(this.tiles_instance.convertToWorldSpaceAR(tiles[i].position))
        if (Math.abs(pos2.x - this.originX) < Math.abs(pos.x - this.originX)) {
          min = i
          pos = pos2
        }
      }

      if (min + 1 < tiles.length) {
        var tileTo = tiles[min + 1]
      } else {
        tileTo = tiles[min]
      }
      var posTo = this.background_instance.convertToNodeSpaceAR(this.tiles_instance.convertToWorldSpaceAR(tileTo.position))
      if (this.node.x - posTo.x > tileTo.width / 9 || this.node.x - this.originX < -tileTo.width / 9) {
        this.on = false
      }
    }
  },
  moveEnd() {
    var tiles = this.tiles_instance.children

    this.node.stopAllActions()
    var some = tiles.some(tile => {
      var pos = this.background_instance.convertToNodeSpaceAR(this.tiles_instance.convertToWorldSpaceAR(tile.position))
      var width = tile.width / 2 * this.tiles_instance.scale // 回弹距离
      console.log(width)
      var some = Math.abs(pos.x - this.node.x) < width
      if (some) {
        // this.node.x = pos.x
        this.node.runAction(cc.moveTo(0.4, pos.x, this.node.y))
      }
      return some
    })
    if (!some) {
      // this.node.x = this.originX
      this.node.runAction(cc.moveTo(0.4, this.originX, this.node.y))
    }
  }
});
