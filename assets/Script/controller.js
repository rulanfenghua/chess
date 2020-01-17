import {parserS, parserT} from 'mainCore';

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
    paddingRt: 0
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    parserS()
  },

  start() {
    var traitsSl = []
    if (cc.sys.localStorage.getItem('traits')) {
      traitsSl = JSON.parse(cc.sys.localStorage.getItem('traits')).data // traits-select
    }
    var traitsPs = parserT(traitsSl)
    traitsPs.forEach(element => {
      var tagNew = cc.instantiate(this.tagPrefab)
      tagNew.getComponent('tagTemplate').init(element[1], element[2])
      var contentC = this.content.children[element[3][0]].getChildByName('content')
      contentC.addChild(tagNew)
      var index = contentC.children.length - 1
      tagNew.x = contentC.children[index - 1].x + contentC.children[index - 1].width / 2 + tagNew.width / 2 + 4
      if (tagNew.x + tagNew.width / 2 + this.paddingRt > contentC.width) {
        contentC.width = tagNew.x + tagNew.width / 2 + this.paddingRt
      }
    })
    for (let i = 0; i < 5; i++) {
      this.content.children[i].getChildByName('content').getComponent('contentMove').autoMove()
    }
  },

  // update (dt) {},
  
});
