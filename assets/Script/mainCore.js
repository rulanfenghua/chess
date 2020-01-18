import sections from 'DataBase/sections'
import traits from 'DataBase/traits'

function parserS(dose) { // parser-section 解析等级 dose 传入量值
  var deviator // 偏量
  var elements // 五行

  if (!dose) {
    if (!JSON.parse(cc.sys.localStorage.getItem('elements'))) {
      elements = truncate(Date.now())
      cc.sys.localStorage.setItem('elements', JSON.stringify({ data: elements }))
    } else {
      elements = JSON.parse(cc.sys.localStorage.getItem('elements')).data
    }
    deviator = calculate(elements, _max(elements))
  } else {
    elements = JSON.parse(cc.sys.localStorage.getItem('elements')).data
    console.log('elements B', elements)
    var elementsAdd = _addTo(dose, elements)
    cc.sys.localStorage.setItem('elements', JSON.stringify({ data: elementsAdd }))
    calculateS(elements)
    console.log('elements A', elements)

    var maxIndex = _max(elements)
    var deviator1 = calculate(elements, maxIndex)

    var maxIndexThis = dose[0]
    var deviator2 = dose[1]
    var power = (maxIndex - maxIndexThis) >= 0 ? (maxIndex - maxIndexThis) : 5 + (maxIndex - maxIndexThis)
    var factor = Math.pow(0.56, power)
    deviator = deviator2 + deviator1 * factor

    var ratioD = _randomLevel(deviator / ((elements[0] + elements[1] + elements[2] + elements[3] + elements[4]) / 5))
    var age = Math.floor(Math.floor(parseInt(cc.sys.localStorage.getItem('stepAll')) / 12) / 3) + 1

    for (let section in sections) {
      var sectionP = section.split(',')
      var levelP = parseInt(sectionP[1])
      // if (age == parseInt(sectionP[0].slice(0, 2)) && maxIndexThis == parseInt(sectionP[0].slice(-1))) {
      if (maxIndexThis == parseInt(sectionP[0].slice(-1))) {
        if (ratioD == levelP) {
          switch (sections[section][0]) {
            case 0: // 选择特质
              return [0, sections[section][1], sections[section].slice(2)]
            default:
              break;
          }
        }
      }
    }
  }
}

function parserT(params, stepAll) { // parser-text
  var traitsPs = [] // traits-parser 解析后的特质
  var step = 0
  if (stepAll) {
    step = stepAll
  }
  params.forEach(trait => {
    var traitDe = traits.get(trait).split(',') // trait-details
    switch (parseInt(traitDe[0])) {
      case 0: // +百分比
        traitsPs.push([0, trait, traitDe[1], traitDe[2].split('?'), parseInt(traitDe) ? parseInt(traitDe[3]) + step : 0]) // 状态，名字，解释，计算方式，时间
        break;
      case 1: // +数值
        traitsPs.push([1, trait, traitDe[1], traitDe[2].split('?'), parseInt(traitDe) ? parseInt(traitDe[3]) + step : 0])
        break;
      case 2: // +计算和
        traitsPs.push([2, trait, traitDe[1], traitDe[2].split('?'), parseInt(traitDe) ? parseInt(traitDe[3]) + step : 0]) // 状态，名字，解释，数值，时间
        break;
      case 3: // +计算比
        traitsPs.push([3, trait, traitDe[1], traitDe[2].split('?'), parseInt(traitDe) ? parseInt(traitDe[3]) + step : 0])
        break;
      case 4: { // 状态组
        var traitsParse = []
        if (cc.sys.localStorage.getItem('traits')) {
          traitsParse = JSON.parse(cc.sys.localStorage.getItem('traits')).data
          var traitsSl = []
          traitsParse.forEach(element => {
            traitsSl.push(element[1])
          })
          var index = 0
          traitsSl.forEach(trait => {
            if (traitDe[1].split('?').indexOf(trait) !== -1) {
              index = traitDe[1].split('?').indexOf(trait) + 1
            }
          })
          parserT(traitDe[1].split('?')[index], step)
        }
        break;
      }
      case -1:
        traitsPs.push([-1, trait, traitDe[1], traitDe[2].split('?'), parseInt(traitDe) ? parseInt(traitDe[3]) + step : 0])
        break;
      default:
        break;
    }
  })
  return traitsPs
}

function calculateS(elements) { // calculate-sum
  var traitsSum = []
  if (cc.sys.localStorage.getItem('traits')) {
    traitsSum = JSON.parse(cc.sys.localStorage.getItem('traits')).data // traits-select
    var traitsSl = []
    traitsSum.forEach(element => {
      traitsSl.push(element[1])
    })
    var traitsPs = parserT(traitsSl)

    var sum0 = [] // 1类百分比和
    var sum1 = [] // 2类数值和
    traitsPs.forEach(trait => {
      switch (trait[0]) {
        case 0:
          sum0.push(trait[3])
          break;
        case 1:
          sum1.push(trait[3])
          break;
        default:
          break;
      }
    })
    if (sum0.length != 0) {
      let sumPercent = [0, 0, 0, 0, 0]
      sum0.forEach(param => {
        sumPercent[parseInt(param[0])] += parseFloat(param[1])
      })
      for (let i = 0; i < 5; i++) {
        elements[i] = elements[i] + elements[i] * sumPercent[i] / 100
      }
    }
    
    if (sum1.length != 0) {
      sum1.forEach(param => {
        elements[parseInt(param[0])] += parseFloat(param[1])
      })
    }
  }
  
}

function traitsFilter(traits, stepAll) {
  var traitsFl = traits.filter(trait => {
    if (trait[4] != 0 && trait[4] > stepAll) {
      return false
    }
    return true
  })
  return traitsFl
}

function calculate(elements, maxIndex) {
  return (elements[maxIndex] + elements[(maxIndex + 1) % 5]) - (elements[(maxIndex + 2) % 5] + elements[(maxIndex + 3) % 5] + elements[(maxIndex + 4) % 5])
}
function truncate(num) {
  var numString = num.toString()

  var randomEs = []
  randomEs.push(parseInt(numString.slice(-1)))
  randomEs.push(parseInt(numString.slice(-2, -1)))
  randomEs.push(parseInt(numString.slice(-3, -2)))
  randomEs.push(parseInt(numString.slice(-4, -3)))
  randomEs.push(parseInt(numString.slice(-5, -4)))

  var elementsInit = []
  randomEs.forEach(e => {
    elementsInit.push(Math.random() * 626.82 / 10 + (-240 + 626.82 * e / 10))
  })
  return elementsInit
}
function _addTo(dose, elements) {
  var elementsAdd = elements
  // todo 数组拷贝
  console.log
  elementsAdd[dose[0]] += dose[1]
  return elementsAdd
}
function _max(elements) {
  var max = elements[0]
  var maxIndex = 0
  for (var i = 1; i < elements.length; i++) {
    if (elements[i] > max) {
      max = elements[i]
      maxIndex = i
    }
  }
  return maxIndex
}
function _randomLevel(param) {
  const min = -3.27
  const max = 5.27
  var range = []
  for (let i = 0; i < 8; i++) {
    range.push(min + (max - min) / 7 * i)
  }
  if (param < range[0]) {
    return 8
  } else if (param >= range[0] && param < range[1]) {
    return 7
  } else if (param >= range[1] && param < range[2]) {
    return 6
  }else if (param >= range[2] && param < range[3]) {
    return 5
  } else if (param >= range[3] && param < range[4]) {
    return 4
  }else if (param >= range[4] && param < range[5]) {
    return 3
  } else if (param >= range[5] && param < range[6]) {
    return 2
  }else if (param >= range[6] && param < range[7]) {
    return 1
  }else if (param >= range[7]) {
    return 0
  }
}

export {parserS, parserT, traitsFilter}