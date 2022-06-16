let express = require('express')
let path = require('path')
let router = express.Router()

var factory = require('./containsDuplicate.js')

router.get('/', (req, res) => {
  if (!req.body.numbers) {
    res.send('Numbers not Found')
    return
  }

  let arrOfStr = req.body.numbers.trim().split(' ')
  const arrOfNum = arrOfStr.map((str) => {
    return Number(str)
  })

  console.log(arrOfNum)
  const arrayLength = arrOfNum.length

  factory().then((instance) => {
    const bytesPerElement = instance.HEAP32.BYTES_PER_ELEMENT
    const arrayPointer = instance._malloc(arrayLength * bytesPerElement)

    instance.HEAP32.set(arrOfNum, arrayPointer / bytesPerElement)

    const containsDuplicate = instance.cwrap('containsDuplicate', 'boolean', [
      'number',
      'number',
    ])
    res.send(containsDuplicate(arrayLength, arrayPointer))

    instance._free(arrayPointer)
  })
})

module.exports = router
