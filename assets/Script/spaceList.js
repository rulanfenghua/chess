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
    spacePrefab: cc.Prefab,
    spacese: {
      default: null,
      type: cc.JsonAsset
    }
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    this.spacePool = new cc.NodePool('spaceTemplate')
  },

  start() {
    var json = this.spacese.json
    console.log(json)
    for (var i = 0; i < json.length; ++i) {
      var space = this.instantiate()
      this.node.addChild(space)
      space.getComponent('spaceTemplate').init(json[i])
    }
  },

  // update (dt) {},

  instantiate() {
    var spaceInstantiate = null
    if (this.spacePool.size() > 0) {
      spaceInstantiate = this.spacePool.get(this)
    } else {
      spaceInstantiate = cc.instantiate(this.spacePrefab)
    }
    return spaceInstantiate
  }
});
