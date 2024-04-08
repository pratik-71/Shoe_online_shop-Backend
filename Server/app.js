const express = require("express")
const app = express()
const port = process.env.PORT || 3001
const cors = require("cors")
const connection = require("./database")
const { setupCronJob } = require("../Controllers/Scheduled_code")

const corsOptions = {
    exposedHeaders: ["x-auth-token", "Authorization"],
  };
app.use(cors(corsOptions))

app.use("/auth",require("../Routes/auth"))
app.use("/products",require("../Routes/product"))
app.use(express.json())


setupCronJob()


app.listen(port,()=>console.log("Listening on port 3001 ...... "+port))
connection()