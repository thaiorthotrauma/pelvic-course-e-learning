import express from "express"
const app = express()
const port = process.env.PORT || 8080
app.use("/video", express.static("video"))
app.listen(port, () => { console.log("tots-pelvic-course-e-learning is live") })
