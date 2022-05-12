import User from '../models/user.model.js'
import connectDB from '../config/database.js'

connectDB()

export const findUsers = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 0
    const limit = req.query.limit ? parseInt(req.query.limit) : 8

    const startIndex = page * limit

    try {

        const users = await User.find().skip(startIndex).limit(limit)

        res.send({ users: users })

    } catch (e) {
        res.status(500).send({ message: `error in findUsers ${e.message}` })

    }

}

export const getTotalUsersCount = async () => {
    try {
        const totalUsersCount = await User.estimateDocumentCount()
        return totalUsersCount
    } catch (e) {
        res.status(500).send({ message: `erro in getTotalUsers ${e.message}` })
    }


}

export const patchUser = async (req, res) => {
    const id = JSON.stringify(req.params.id)
    console.log(`here is id in patchUser ${id}`)
    const { email, updated_at } = req.body
    console.log(`im in patchUser ${email, updated_at}`)
    try {
        //const response = await User.findByIdAndUpdate(id, { email, updated_at })
        const user = await User.findOne(id)
        user.email = email;
        user.updated_at = updated_at

        await user.save();

        console.log(`found user ${user}`)
        res.send("user data updated")
    } catch (e) {
        res.status(500).send({ message: `error in patchUser ${e.message}` })
    }
}