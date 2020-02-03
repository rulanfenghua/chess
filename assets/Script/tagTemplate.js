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
    padding: 0,
    showPrefab: {
      default: null,
      type: cc.Prefab
    }
  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  start() {
    this.node.on('touchstart', this.showDetails, this)
    this.node.on('touchend', this.end, this)
    this.node.on('touchcancel', this.end, this)
    // this.node.on('mouseenter', this.showDetails, this)
    // this.node.on('mouseleave', this.end, this)
  },

  init(traitId, traitName, introduce, date, during) {
    this.node.getChildByName('line').getComponent(cc.Label).string = traitName
    var width = this.node.getChildByName('line').width * traitName.length / 2
    this.node.width = width + this.padding * 2
    this.introduce = introduce
    this.date = date
    this.during = during
  },
  initCanvans(canvans) {
    this.canvans = canvans
  },

  showDetails(event) {
    const positionEvent = event.getLocation()
    var positionThis = this.canvans.convertToNodeSpaceAR(positionEvent)
    var showIt = cc.instantiate(this.showPrefab)
    this.canvans.addChild(showIt)
    showIt.setPosition(positionThis)
    if (positionEvent + showIt.width > this.canvans.width / 2) {
      showIt.anchorX = 1
    }

    var year = 0
    var mouth = 0
    var year2 = 0
    var mouth2 = 0
    year = Math.floor(Math.floor(parseInt(this.date) / 12)) + 1
    mouth = this.date % 12 + 1
    if (this.during == 0) {
      showIt.getChildByName('label').getComponent(cc.Label).string = this.introduce + '\n' + '获得时间：' + year + '年' + mouth + '月'
    } else {
      year2 = Math.floor(Math.floor(parseInt(this.during) / 12)) + 1
      mouth2 = this.during % 12 + 1
      showIt.getChildByName('label').getComponent(cc.Label).string = this.introduce + '\n' + '获得时间：' + year + '年' + mouth + '月' + '\n' + '持续时间：' + year2 + '年' + mouth2 + '月'
    }
  },
  end() {
    this.canvans.getChildByName('show').destroy()
  }

  // update (dt) {},
});
