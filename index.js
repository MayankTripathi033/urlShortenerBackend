const express = require('express');
require('dotenv').config()
const routes = require('./routes/urlRoutes')
const {connectDb} = require('./dbConnect')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const PORT = 8001;
const app = express();
app.use(express.json());
app.use('/url', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

connectDb(`${process.env.MONGODB_URI}short-url`).then(()=>console.log('Mongodb is Connected'))


app.listen(PORT, () => console.log(`Server Running on ${PORT}`))