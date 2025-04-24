import express from "express"
import bodyParser from "body-parser"

import corsConfig from "./src/config/cors.config.js"
import { syllabusRouter } from "./src/routes/syllabus.routes.js"
import { userRouter } from "./src/routes/user.routes.js"
import { meetingRouter } from "./src/routes/meeting.routes.js"
import { certificateRouter } from "./src/routes/certificate.routes.js"
import { noticeboardRouter } from "./src/routes/notice.routes.js"
import { routineRouter } from "./src/routes/routine.routes.js"
import { departmentRouter } from "./src/routes/department.routes.js"



const server = express()

server.use(corsConfig)
server.use(bodyParser.json({ limit: "50mb" }))
server.use(express.json({ limit: "50mb" }))
server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }))

server.use('/api/v1/syllabus', syllabusRouter)
server.use('/api/v1/users', userRouter)
server.use('/api/v1/meeting', meetingRouter)
server.use('/api/v1/certificate', certificateRouter)
server.use('/api/v1/noticeboard', noticeboardRouter)
server.use('/api/v1/routine', routineRouter);
server.use('/api/v1/department', departmentRouter);


server.get("/", (req, res) => {
    res.send("application is running.... ").json({
        message: "all ok "
    })
})


export default server