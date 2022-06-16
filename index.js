const express = require('express')

const containsDuplicate = require('./problem/ContainsDuplicate/script.js')

const app = express()
const port = 3000

// For parsing application/json
app.use(express.json())


app.use('/problem/containsDuplicate', containsDuplicate)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
