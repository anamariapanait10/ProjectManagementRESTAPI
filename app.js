const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const routes = require('./src/routes/index.js');
const errorHandler = require('./src/middlewares/error-handler.js');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node.js REST API',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                BearerAuth: { // Name your security scheme
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT', // Optional, specify only for JWT bearer tokens
                }
            }
        },
        security: [{
          BearerAuth: [] // Applying security globally
        }]
    },
    apis: ['./src/routes/*.js', './swagger/schemas.yaml']
}
const swaggerSpec = swaggerJSDoc(options);
if (process.env.NODE_ENV !== 'production') {
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}


mongoose.connect(
    'mongodb+srv://anamariapanait10:' + process.env.MONGO_ATLAS_PW + '@node-rest-api.yrggsdk.mongodb.net/?retryWrites=true&w=majority&appName=node-rest-api',
);

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use(routes);
app.use(errorHandler);

module.exports = app;