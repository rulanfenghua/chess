export default function(dose) {
  var deviator
  var elementD

  if (!dose) {
    var elements = [0, 0, 0, 0, 0]
    cc.sys.localStorage.setItem('elements', JSON.stringify({ data: elements })) // todo 初始五行and五行具体运算() 金，水，木，火，土
    truncate(Date.now())

    deviator = calculate(elements, _max(elements))
    elementD = [_max(elements), deviator]
  } else {
    elements = JSON.parse(cc.sys.localStorage.getItem('elements')).data
    var maxIndex = _max(elements)
    var deviator1 = calculate(elements, maxIndex)

    var maxIndexThis = _addTo(dose, elements)
    cc.sys.localStorage.setItem('elements', JSON.stringify({ data: elements }))
    var deviator2 = dose[1]
    var power = (maxIndex - maxIndexThis) >= 0 ? (maxIndex - maxIndexThis) : 5 + (maxIndex - maxIndexThis)
    var factor = Math.pow(0.56, power)
    deviator = deviator2 + deviator1 * factor
    elementD = [maxIndexThis, deviator]
  }

  function calculate(elements, maxIndex) {
    return (elements[maxIndex] + elements[(maxIndex + 1) % 5]) - (elements[(maxIndex + 2) % 5] + elements[(maxIndex + 3) % 5] + elements[(maxIndex + 4) % 5])
  }

  function truncate(num) {
    console.log(num)
    var numString = num.toString()
    parseInt(numString.slice(-1))
    parseInt(numString.slice(-3, -1))
    parseInt(numString.slice(-4, -2))
    parseInt(numString.slice(-5, -3))
    parseInt(numString.slice(-6, -4))
    
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
  console.log('elementD', elementD)
  console.log('elements', JSON.parse(cc.sys.localStorage.getItem('elements')).data)
  return elementD
}