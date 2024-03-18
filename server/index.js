const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const EventEmitter = require('events')
const LocalStrategy = require('passport-local').Strategy;
let clients ={}
var socket = require('socket.io');
const app = express();
const connectDb = require('./db.js')
const employeeRoutes = require('./controllers/employee.controller')
const {errorHandler} = require('./middlewares')
app.use(cors({origin:'http://18.234.41.188:8000',credentials:true})) //http://18.234.41.188:4200/ --> dont add forward slash in the end of url
const User = require('./models/register.model.js')
const passport = require('passport')
const { initializingPassport, isAuthenticated, sendUser } = require('./passportConfig.js')
const expressSession = require('express-session')
var cookieParser = require('cookie-parser')
app.use(cookieParser())
const MongoStore = require('connect-mongo')
var jwt = require('jsonwebtoken');
var server = require('http').Server(app)
// var server = app.listen(5000, function(){
//     console.log('listening for requests on port 5000');
// });
// var io = socket(server);
var io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(errorHandler)


app.use(expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store:new MongoStore({mongoUrl: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@ac-o3xbpk6-shard-00-00.aqiyahr.mongodb.net:27017,ac-o3xbpk6-shard-00-01.aqiyahr.mongodb.net:27017,ac-o3xbpk6-shard-00-02.aqiyahr.mongodb.net:27017/${process.env.MONGO_DB}?ssl=true&replicaSet=atlas-6zw7zq-shard-0&authSource=admin&retryWrites=true&w=majority`}),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 * 4 * 6
    }
}))
initializingPassport(passport);

app.use(passport.initialize());
app.use(passport.session())

app.use('/api/employees',employeeRoutes)

mongoose.set('strictQuery', true);

io.on('connection', (socket) => {

    console.log(`New connection ${socket.id}`)
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });
    socket.on('typing', function(data){
        io.sockets.emit('typing', data);
    });

});

app.get('/test',(req,res)=>{
    res.send('Hello World')
})

app.post('/api/employees/register', async (req,res)=>{
    // const user  = await User.findOne({email: req.body.email});
    // console.log(user)
    // if(user) return res.status(400).send("User Already Exists");

    const newUser = await User.create(req.body);
    res.status(201).send({
        successMsg: "User Registered Successfullly!!!"
    });
})

app.post("/api/employees/login",passport.authenticate("local",{failureRedirect:"/login-failure",successRedirect:"/login-success"}))

app.get('/login-failure',(req,res)=>{
    res.send({
        failureMsg:"User Login Failed"
    })
})

app.get('/login-success',sendUser,async(req,res)=>{
    const user = req.user.username;
    const options = {
        expiresIn: "7d"
    }
    const jwtToken = jwt.sign({user}, 'secret123', options);
    res.send({
        token: jwtToken,
        username: user,
        successMsg:"User Logged in Successfully",
    })
})

app.get("/profile",isAuthenticated,(req,res)=>{
    res.send(req.user)
})

app.get("/logout",isAuthenticated,(req,res)=>{
    req.logOut();
    res.send({
        successMsg:"User Logged out Successfully"
    })
})

connectDb()
    .then(()=>{
        console.log('Connected to Database')
        server.listen(3000,()=>{
            console.log('Server started at 3000')
        })
    })
    .catch(err => {
        console.log(err)
    })
    module.exports = {
        app: app
    }


