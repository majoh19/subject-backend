const app = require('./app')
const { getConnection } = require('./database/db-connection')
const dotenv = require('dotenv').config()

const connection = getConnection()

app.set('Port', process.env.PORT)

app.listen(app.get('Port'), () => {
    console.log(`App listening on port ${app.get('Port')}`)
})