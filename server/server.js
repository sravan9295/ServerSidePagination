import express from 'express'
import cors from 'cors'
import User from './models/user.model.js'
import { findUsers, getTotalUsersCount, patchUser } from './controllers/userController.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", findUsers);
app.get("/getTotalUsersCount", getTotalUsersCount)
app.patch("/:id", patchUser)
// must change to controllers like above
// app.get("/", async (req, res) => {
//     const page = req.query.page ? parseInt(req.query.page) : 0
//     const limit = req.query.limit ? parseInt(req.query.limit) : 5

//     const startIndex = (page) * limit


//     const results = {}
//     try {
//         results.totalUsers = await User.estimatedDocumentCount();
//         results.usersData = await User.find({}).skip(startIndex).limit(limit);

//         res.send(results)
//     } catch (e) {
//         res.sendStatus(500);
//         res.send({ message: e.message })
//     }

// })


// create a separte folder for routes eg: ./routers/userRouter
// app.patch("/:id", async (req, res) => {
//     const { id, email, updated_at } = req.body
//     //console.log(`request.params updated_at ${updated_at}`)
//     //console.log(`.........woh....... ${email}`)
//     //const query = { "_id": req.params.id }
//     //req.newData.email = req.user.email
//     const update = { email, updated_at }
//     const doc = await User.findByIdAndUpdate(id, update)
//     // const query = await User.findByIdAndUpdate(id, update, { upsert: true }, function (err, doc) {
//     //     if (err) return res.sendStatus(500, { error: `Error while updating backend ${err.message}` })
//     //     return res.send("Successfully Saved from backend")
//     // }).clone()
// })
app.listen(3005, () => {
    console.log("server started on 3005")
})