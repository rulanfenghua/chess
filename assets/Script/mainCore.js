var database = require('database')

module.exports = function(dose) {
  var deviator

  if (!dose) {
    database.elements = [0, 0, 0, 0, 0] // todo 初始五行and五行具体运算()

    deviator = calculate(elements, _max(elements))
  } else {
    var elements = database.elements
    var maxIndex = _max(elements)
    var deviator1 = calculate(elements, maxIndex)

    var maxIndexThis = _addTo(dose, elements)
    database.elements = elements
    var deviator2 = calculate(elements, maxIndexThis)
    var power = (maxIndex - maxIndexThis) >= 0 ? (maxIndex - maxIndexThis) : 5 + (maxIndex - maxIndexThis)
    var factor = Math.pow(0.56, power)
    deviator = deviator2 + deviator1 * factor
  }

  function calculate(elements, maxIndex) {
    return (elements[maxIndex] + elements[(maxIndex + 1) % 5]) - (elements[(maxIndex + 2) % 5] + elements[(maxIndex + 3) % 5] + elements[(maxIndex + 4) % 5])
  }

  function truncate(num) {
    var numString = num.toString()
    parseInt(numString.slice(-4))
    parseInt(numString.slice(-8, -4))
    
  }
  function _addTo(dose, elements) {
    var index
    for (const key in dose) {
      switch (key) {
        case '金':
          elements[0] += dose[key]
          index = 0
          break;
        case '水':
          elements[1] += dose[key]
          index = 1
          break;
        case '木':
          elements[2] += dose[key]
          index = 2
          break;
        case '火':
          elements[3] += dose[key]
          index = 3
          break;
        case '土':
          elements[4] += dose[key]
          index = 4
          break;
        default:
          break;
      }
    }
    return index
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

  return deviator
}