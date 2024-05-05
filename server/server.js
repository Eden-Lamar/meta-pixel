const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()
require("colors")
const imageExifRoute = require("./routes/router")

const app = express()

// MY MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(morgan("dev"))
app.use("/api/v1", imageExifRoute)


// Setup PORT
const port = process.env.PORT || 8080

app.listen(port, () => {
	console.log(`\nTHE FORCE IS WITH YOU ON PORT ${port}...\n`.brightCyan)
})