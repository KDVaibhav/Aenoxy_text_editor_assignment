import mongoose, { Model, Schema } from 'mongoose';

interface User{
    username: string;
    email?: string;
    password: string;
}

interface Iuser extends User, Document{};

const UserSchema: Schema<Iuser> = new Schema<Iuser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

const User: Model<Iuser>=mongoose.model<Iuser>(
    "User",
    UserSchema
)

export {User, UserSchema};