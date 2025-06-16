const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const { connect } = require('mongoose');
const connectionDB = require('./config/db')

// initialization
dotenv.config()
const app = express();

// middleware
app.use(cors({origin: '*'}));
app.use(express.json());

// connectionDB
connectionDB();

// RootRoute
const rootRoute = require("./routes/rootRoute");
app.use("/",rootRoute);

// RegisterUser
const registerUserRoute = require('./routes/registerUserRoute');
app.use('/api/user', registerUserRoute);

// checkUserProfile
const userProfileCompleteRoute = require('./routes/userProfileCompleteRoute');
app.use('/api/users',userProfileCompleteRoute)

const createProfileRoute = require('./routes/createProfileRoute');
app.use('/api/users', createProfileRoute); 

// Create New Estimate
const createestimateRoute = require('./routes/createEstimate');

app.use('/api/estimates', createestimateRoute);
// Get All Estimate

const getEstimateRoute = require('./routes/getAllEstimates');
app.use('/api/estimates', getEstimateRoute);

const test = require('./routes/test');
app.use('/test', test);

app.listen(process.env.PORT ,  () =>{
    console.log(`server started on port  ${process.env.PORT}`);
    
});