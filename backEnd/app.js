let express = require("express")
let app = express()

// security
let cors = require("cors")
let hpp = require("hpp")
let helmet = require("helmet")
let rateLimit = require("express-rate-limit")

let connectToDB = require("./config/connectToDB")
const { notFound, errorHandling } = require("./middlewares/errors")

connectToDB()
require("dotenv").config()
app.use(express.json())
app.use(hpp())
app.use(helmet())
app.use(cors())

app.use(rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 200
}))

// routes
app.get("/test", (req, res) => {
    res.send("test")
})

app.use("/UserAuth", require("./routs/UserRouts/Auth"))
app.use("/UserRouts", require("./routs/UserRouts/UserRouts"))
app.use("/PostRouts", require("./routs/PostRoute"))
app.use("/CommentRouts", require("./routs/CommentRout"))
app.use("/CategoryRouts", require("./routs/CategoryRout"))
app.use(notFound)
app.use(errorHandling)

let port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server is listening on port", port)
})
