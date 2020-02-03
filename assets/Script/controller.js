import {parserS} from 'mainCore';

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
    content: {
      default: null,
      type: cc.Node
    },
    tagPrefab: {
      default: null,
      type: cc.Prefab
    },
    paddingLf: 0,
    paddingRt: 0,
    canvans: {
      default: null,
      type: cc.Node
    },
    time: {
      default: null,
      type: cc.Label
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    parserS()

    var stepAll = 0
    if (cc.sys.localStorage.getItem('stepAll')) {
      stepAll = cc.sys.localStorage.getItem('stepAll')
    }
    var year = 0
    var mouth = 0
    year = Math.floor(Math.floor(parseInt(stepAll) / 12)) + 1
    mouth = stepAll % 12 + 1
    this.time.string = year + '年' + mouth + '月'
  },

  start() {
    var traitsSl = []
    if (cc.sys.localStorage.getItem('traits')) {
      traitsSl = JSON.parse(cc.sys.localStorage.getItem('traits')).data // traits-select
      this.contentMoveController(traitsSl)
    }
  },

  contentMoveController(traits) {
    var lengthNew = [0, 0, 0, 0, 0]
    for (let j = 0; j < this.content.children.length; j++) {
      var contentThis = this.content.children[j].getChildByName('content')
      for (let i = 0; i < contentThis.children.length; i++) {
        contentThis.children[i].destroy()
      }
      lengthNew[j] = contentThis.children.length
    }


    traits.forEach(element => {
      var tagNew = cc.instantiate(this.tagPrefab)
      tagNew.getComponent('tagTemplate').init(element[0], element[1], element[2], element[3], element[4])
      tagNew.getComponent('tagTemplate').initCanvans(this.canvans)
      var contentC = this.content.children[element[0]].getChildByName('content')
      contentC.addChild(tagNew)
      var index = contentC.children.length - 1 - lengthNew[element[0]]

      if (index - 1 < 0) {
        tagNew.x = tagNew.width / 2 + this.paddingLf
      } else {
        tagNew.x = contentC.children[index - 1].x + contentC.children[index - 1].width / 2 + tagNew.width / 2 + 4
      }

      if (tagNew.x + tagNew.width / 2 + this.paddingRt > contentC.width) {
        contentC.width = tagNew.x + tagNew.width / 2 + this.paddingRt
      }
    })
    for (let i = 0; i < 5; i++) {
      this.content.children[i].getChildByName('content').getComponent('contentMove').autoMove()
    }
  },

  backTo() {
    cc.director.loadScene('start')
  }

  // update (dt) {},
  
});
