import mongoose, { Document } from "mongoose";
import bcryptjs from "bcryptjs";

const SALT_WORK_FACTOR = 10;

const { Schema } = mongoose;

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  createdAt?: Date;
}

const userSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcryptjs.genSalt(SALT_WORK_FACTOR);
    this.password = await bcryptjs.hash(this.password, salt);

    return next();
  } catch (error: any) {
    return next(error);
  }
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
