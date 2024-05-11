import mongoose, { Schema, Document } from "mongoose";
import type { UserData } from "@/types";

export interface User extends Document, UserData {}

const UserDataSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar_url: { type: String, required: true },
  bio: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  userId: { type: String, required: true, unique: false },
});

const UserModel =
  mongoose.models.User || mongoose.model<User>("User", UserDataSchema);

export default UserModel;
