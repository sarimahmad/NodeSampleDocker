const postRouter = require("../routes/postroutes")
const authRouter = require("../routes/authroutes") 
module.exports = function(app){
    app.use("/api", postRouter)
    app.use("/api", authRouter)
}



