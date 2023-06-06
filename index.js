const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session")
const redis = require("redis");
const RedisStore = require("connect-redis").default


const {
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

const MongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/Testing?authSource=admin`;

mongoose
  .connect(MongoURL, { useNewURLParser: true, useUnifiedTopology: true })
  .then((res) => console.log("SuccessFully Connected to Database"))
  .catch((e) => console.log(e));


const app = express();
app.use(express.json())


// Initialize client.
let redisClient = redis.createClient({
  url: 'redis://redis:6379',
  host: REDIS_URL,
  port: REDIS_PORT,
})
redisClient.connect().then(()=>{
  console.log("SuccessFully Connected to Redis")
}).catch(console.error)


// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
})

// // Initialize sesssion storage.
app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: SESSION_SECRET,
    cookie:{
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 30000,
    }
  })
)


require('./urls/urls')(app);



app.get("/", (req, res) => {
  res.send("Hello wheresdqweasds are you");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listen on PORT 3000"));
