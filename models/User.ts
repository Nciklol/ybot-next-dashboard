import * as mongoose from "mongoose";

interface User {
    id: string;
    username: string;
    discriminator: string;
    avatar?: string;
    bot?: boolean
}

const userSchema = new mongoose.Schema({
    id: String,
    username: String,
    discriminator: String,
    avatar: String,
    bot: String
})

export default mongoose.models.Users || mongoose.model<User>("Users", userSchema);