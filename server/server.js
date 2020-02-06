const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')


const app = express()
app.use(bodyParser.json())  //
app.use(morgan('combined'))  //  网站服务端访问日志

require('./router')(app)  // 路由

app.listen(8002, () => {
    console.log('Server has been started on port 8002')
})