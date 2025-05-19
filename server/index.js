const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors');
const { connect } = require('mongoose');
const connectionDB = require('./config/db')

// initialization
dotenv.config()
const app = express();

// middleware
app.use(cors(
    {
        origin: '*'
    }
));
app.use(express.json());

// connectionDB
connectionDB();

// RootRoute
const rootRoute = require("./routes/rootRoute");
app.use("/",rootRoute);

// // AuthRoute
// const authRoute = require("./routes/authRoute");
// app.use("/api",authRoute);

const registerUserRoute = require('./routes/registerUserRoute');
app.use('/api/user', registerUserRoute);

app.listen(process.env.PORT ,  () =>{
    console.log(`server started on port  ${process.env.PORT}`);
    
});