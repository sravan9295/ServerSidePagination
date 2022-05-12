import mongoose from 'mongoose'


const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        created_at: { type: String, required: true },
        updated_at: { type: String, required: true },
    },
    { collection: 'user_collections' }
)

const User = mongoose.model('user_collections', UserSchema)

export default User;