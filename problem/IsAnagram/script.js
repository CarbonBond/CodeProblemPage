import Module from './isAnagram.js'
let instance = null
let form = document.querySelector('.form')
let problemNode = document.querySelector('.numArr')
let input = document.createElement('input')
input.classList.add('button')
input.type = 'submit'
input.value = 'TEST'

let result = document.querySelector('.result')
result.textContent = 'Click Test'

input.addEventListener('click', (e) => {
  e.preventDefault()

  document.activeElement.blur()

  let arrOfStr = problemNode.value.trim().toLowerCase().split(' ')

  const isAnagram = instance.cwrap('isAnagram', 'boolean', ['string', 'string'])

  result.textContent = isAnagram(arrOfStr[0], arrOfStr[1])
})

Module().then((i) => {
  instance = i

  form.appendChild(input)
})
