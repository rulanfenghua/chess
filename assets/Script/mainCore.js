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
    calculateS(elements)
    var maxIndex = _max(elements)
    var deviator1 = calculate(elements, maxIndex)

    var maxIndexThis = _addTo(dose, elements)
    cc.sys.localStorage.setItem('elements', JSON.stringify({ data: elements }))
    var deviator2 = dose[1]
    var power = (maxIndex - maxIndexThis) >= 0 ? (maxIndex - maxIndexThis) : 5 + (maxIndex - maxIndexThis)
    var factor = Math.pow(0.56, power)
    deviator = deviator2 + deviator1 * factor
    var ratioD = _randomLevel(deviator / ((elements[0] + elements[1] + elements[2] + elements[3] + elements[4]) / 5))
    var age = Math.floor(Math.floor(parseInt(cc.sys.localStorage.getItem('stepAll')) / 12) / 3) + 1

    for (let section in sections) {
      var sectionP = section.split(',')
      var levelP = parseInt(sectionP[1])
      if (age == parseInt(sectionP[0].slice(0, 2)) && maxIndexThis == parseInt(sectionP[0].slice(-1))) {
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

function parserT(params) { // parser-text
  var traitsPs = [] // traits-parser 解析后的特质
  params.forEach(trait => {
    console.log('trait', trait)
    var traitDe = traits.get(trait).split(',') // trait-details
    console.log('traitDe', traitDe)
    switch (parseInt(traitDe[0])) {
      case 0: // +百分比
        traitsPs.push([0, trait, traitDe[1], traitDe[2].split('?')])
        break;
      case 1: // +数值
        traitsPs.push([1, trait, traitDe[1], traitDe[2].split('?')])
        break;
      default:
        break;
    }
  })
  return traitsPs
}

function calculateS(elements) { // calculate-sum
  var traitsSl = []
  if (cc.sys.localStorage.getItem('traits')) {
    traitsSl = JSON.parse(cc.sys.localStorage.getItem('traits')).data // traits-select
  }
  var traitsPs = parserT(traitsSl)
  var sum0 = [] // 1类百分比和
  var sum1 = [] // 2类数值和
  switch (traitsPs[0]) {
    case 0:
      sum0.push(traitsPs[3])
      break;
    case 1:
      sum1.push(traitsPs[3])
      break;
    default:
      break;
  }
  sum0.forEach(param => {
    elements[param[0]] *= param[1]
  })
  sum1.forEach(param => {
    elements[param[0]] += param[1]
  })
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
  elements[dose[0]] += dose[1]
  return dose[0]
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
function _randomLevel(params) {
  const min = -3.27
  const max = 5.27
  var range = []
  for (let i = 0; i < 8; i++) {
    range.push(min + (max - min) / 7 * i)
  }
  if (params < range[0]) {
    return 8
  } else if (params >= range[0] && params < range[1]) {
    return 7
  } else if (params >= range[1] && params < range[2]) {
    return 6
  }else if (params >= range[2] && params < range[3]) {
    return 5
  } else if (params >= range[3] && params < range[4]) {
    return 4
  }else if (params >= range[4] && params < range[5]) {
    return 3
  } else if (params >= range[5] && params < range[6]) {
    return 2
  }else if (params >= range[6] && params < range[7]) {
    return 1
  }else if (params >= range[7]) {
    return 0
  }
}

export {parserS, parserT}