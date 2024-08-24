import express from 'express';
import swaggerui from 'swagger-ui-express';
import swaggerdoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authroutes from './routes/authroutes.js';
import errormiddleware from './middleware/authmiddleware.js';
import userroutes from './routes/userroutes.js';
import jobroutes from './routes/jobroutes.js'
import helmet from 'helmet';
import xss from 'xss-clean';
import mongosanitize from 'express-mongo-sanitize';


const app = express();

dotenv.config();

connectDB();
const option = {
    definition:{
        openapi:'3.0.0',
    info:{
        title:'job portal application',
        description:'node expressjs job portal application'
    },
    servers:[
        {
            url:"https://nodejs-job-portal-application-1.onrender.com"
        }
    ]
    },
    apis:['./routes/*.js'],  
};

const spec = swaggerdoc(option)

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(xss());
app.use(mongosanitize());

app.use('/api/v1/auth',authroutes);
app.use('/api/v1/user',userroutes);
app.use('/api/v1/job',jobroutes);

app.use('/api-doc',swaggerui.serve,swaggerui.setup(spec));

app.use(errormiddleware);

const PORT  = process.env.PORT || 70;
app.listen(PORT,()=>{
    console.log(`Listining at the port:${PORT}`);
});
