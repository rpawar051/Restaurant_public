const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
//const User = require("./models/User");



app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/uploads', express.static('uploads'));



const postsRoute = require('./routes/posts');
app.use('/', postsRoute);

//app.use(session({
//    secret: 'ssshhhhh',
//    // create new redis store.
//    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl : 260}),
//    saveUninitialized: false,
//    resave: false
//}));

/*
app.get('/',(req, res)=>{
    console.log("Rahul pawar");
    res.send('Hello');
})

app.post('/signup', (req, res, next)=>{
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    console.log(newUser);
    newUser.save(err => {
        if (err) {
            return res.status(400).json({
                title: "error",
                error: "email in use"
            })
        }
        return res.status(200).json({
            title: "signup success"
        })


    })
})
*/


mongoose.connect(
    'mongodb://localhost:27017/restaurant',
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log('connected to DB'))
	.then(() => console.log("Mongodb connected"))
    .catch(err => console.log(err));



const port = process.env.PORT || 5000;

app.listen(port, (err)=> {
    if (err) return console.log(err);
    console.log("server running op port "+ port);
});


