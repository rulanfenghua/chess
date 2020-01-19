import { parserS, parserT, traitsFilter, traitsComingFilter } from 'mainCore';

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
    },
    introduce: {
      default: null,
      type: cc.Label
    },
    section: {
      default: null,
      type: cc.Prefab
    },
    dialogue: {
      default: null,
      type: cc.Node
    },
    view: {
      default: null,
      type: cc.Node
    },
    tagPrefab: {
      default: null,
      type: cc.Prefab
    },
    content: {
      default: null,
      type: cc.Node
    },
    background: {
      default: null,
      type: cc.Node
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.originX = this.node.x
    this.n = 0
    this.step = 0
    this.stepAll = parseInt(cc.sys.localStorage.getItem('stepAll')) ? parseInt(cc.sys.localStorage.getItem('stepAll')) : 0
    this.posTo = cc.v2(0, 0)
    this.on = false

    this.updateN()
    this.tilesThisX = this.conformNode.convertToWorldSpaceAR(this.tiles_instance.position)
    this.anchor = this.tiles_instance.convertToWorldSpaceAR(this.tiles_instance.children[0].position)
  },

  start() {
    if (this.stepAll) {
      var id = this.stepAll % 64 == 0 && this.stepAll > 0 ? 64 : this.stepAll % 64
      var tiles = this.tiles_instance.children
    
      var subPos = this.tiles_instance.convertToWorldSpaceAR(tiles[id].position).x - this.anchor.x
      this.tiles_instance.position = this.conformNode.convertToNodeSpaceAR(this.tilesThisX).sub(cc.v2(subPos, 0))
    }

    this.node.on('touchmove', this.move, this)
    this.node.on('touchstart', () => {
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
    this.n = Math.floor(Math.random() * 2) > 0 ? 2 : (Math.floor(Math.random() * 4) > 0 ? 3 : (Math.floor(Math.random() * 2) > 0 ? 1 : 4))
  },
  updateStep(n) { // 更新记录向前移动
    this.stepAll += n
    cc.sys.localStorage.setItem('stepAll', this.stepAll)

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
  _onEvent(nodeTh) {
    var clickEventHandler = new cc.Component.EventHandler()
    clickEventHandler.target = this.node
    clickEventHandler.component = 'player'
    clickEventHandler.handler = 'callbackBn'

    var button = nodeTh.getComponent(cc.Button)
    button.clickEvents.push(clickEventHandler)
  },

  move(event) {
    if (this.on) {
      return
    }
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

      this.dialogue.runAction(cc.moveTo(0.4, 0, this.dialogue.y))
      this.on = true

      var id = this.stepAll % 64 == 0 ? 64 : this.stepAll % 64
      var value = tiles[id].getComponent('spaceTemplate').init()

      var options = parserS(value)
      this.introduce.string = options[1] + ', '
      options[2] = traitsComingFilter(options[2])
      var sections = []
      var sectionN = null // section-node

      var numberL = Math.floor(Math.random() * 2) > 0 ? 3 : (Math.floor(Math.random() * 4) > 0 ? 2 : (Math.floor(Math.random() * 2) > 0 ? 1 : 4))
      for (let i = 0; i < numberL; i++) {
        let randomO = Math.floor(Math.random() * options[2].length)
        sections.push(options[2][randomO])
        options[2].splice(randomO, 1)
      }
      var traitsPs = parserT(sections, this.stepAll)
      for (let i = 0; i < this.view.children.length - 2; i++) {
        this.view.children[2 + i].destroy()
      }
      if (options[0] == 0) {
        for (let i = 0; i < traitsPs.length; i++) {
          sectionN = cc.instantiate(this.section)
          this.view.addChild(sectionN)
          if (traitsPs[i][0] == -1) {
            sectionN.getComponent(cc.Label).string = i + ', ' + traitsPs[i][1]
          } else {
            sectionN.getComponent(cc.Label).string = i + ', ' + traitsPs[i][1] + ',' + traitsPs[i][2]
          }
          sectionN.y = this.view.height / 2 - 19 - sectionN.height / 2 - i * (sectionN.height + 2)
          sectionN.getComponent('sectionTemplate').init(traitsPs[i][3][0], traitsPs[i][1], traitsPs[i][2], this.stepAll, traitsPs[i][4])
          this._onEvent(sectionN)
        }
      }
    }
  },

  callbackBn(event) {
    var traitId = event.target.getComponent('sectionTemplate').traitId
    var traitName = event.target.getComponent('sectionTemplate').traitName
    var introduce = event.target.getComponent('sectionTemplate').introduce
    var date = event.target.getComponent('sectionTemplate').date
    var during = event.target.getComponent('sectionTemplate').during
    
    var traits = []
    if (cc.sys.localStorage.getItem('traits')) {
      traits = JSON.parse(cc.sys.localStorage.getItem('traits')).data
    }
    if (traitName != '继续..') {
      traits.push([traitId, traitName, introduce, date, during])
    }
    traits = traitsFilter(traits)
    this.background.getComponent('controller').contentMoveController(traits)
    cc.sys.localStorage.setItem('traits', JSON.stringify({ data: traits }))
    this.dialogue.runAction(cc.moveTo(0.4, -1280, this.dialogue.y))
    this.on = false
  }
});
