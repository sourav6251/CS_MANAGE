import express from "express"
import bodyParser from "body-parser"

import corsConfig from "./src/config/cors.config.js"
import { syllabusRouter } from "./src/routes/syllabus.routes.js"
import { certificateRouter } from "./src/routes/certificate.routes.js"
import { departmentRouter } from "./src/routes/department.routes.js"
import { semesterRouter } from "./src/routes/semester.routes.js"
// import { userRouter } from "./src/routes/user.router.js"
import { meetingRouter } from "./src/routes/meeting.routes.js"
import { noticeboardRouter } from "./src/routes/noticeboard.routes.js"
import { userRouter } from "./src/routes/user.routes.js"
// import { userRouter } from "./src/routes/user.routes.js"



const server = express()

server.use(corsConfig)
server.use(bodyParser.json({ limit: "50mb" }))
server.use(express.json({ limit: "50mb" }))
server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

// all routes 

server.use('/api/v1/certificate', certificateRouter)
server.use('/api/v1/syllabus', syllabusRouter)
server.use('/api/v1/department', departmentRouter)
server.use('/api/v1/semester', semesterRouter)
server.use('/api/v1/user', userRouter)
server.use('/api/v1/meeting', meetingRouter)
server.use('/api/v1/noticeboard', noticeboardRouter)

server.get("/", (req, res) => {
    res.send("application is run ").json({
        message: "all ok "
    })
})


export default server