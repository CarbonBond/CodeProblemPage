import Module from './containsDuplicate.js'
let instance = null
let form = document.querySelector('.form')
let numArrNode = document.querySelector('.numArr')
let input = document.createElement('input')
let arrOfNum = [1, 2, 3, 4]
let arrayLength = arrOfNum.length
input.classList.add('button')
input.type = 'submit'
input.value = 'TEST'

let result = document.querySelector('.result')
result.textContent = 'Click Test'

input.addEventListener('click', (e) => {
  e.preventDefault()
  document.activeElement.blur()
  let arrOfStr = numArrNode.value.trim().split(' ')
  arrOfNum = arrOfStr.map((num) => parseInt(num))
  arrayLength = arrOfNum.length
  if (instance === null) return
  const bytesPerElement = instance.HEAP32.BYTES_PER_ELEMENT
  const arrayPointer = instance._malloc(arrayLength * bytesPerElement)

  instance.HEAP32.set(arrOfNum, arrayPointer / bytesPerElement)

  const containsDuplicate = instance.cwrap('containsDuplicate', 'boolean', [
    'number',
    'number',
  ])

  result.textContent = containsDuplicate(arrayLength, arrayPointer)
  instance._free(arrayPointer)
})

Module().then((i) => {
  instance = i

  form.appendChild(input)
})
