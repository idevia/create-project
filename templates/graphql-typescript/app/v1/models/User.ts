import { Schema, model } from 'mongoose'

// user interface
import { IUser } from '../interfaces/User'

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: false
    },
    email: {
      type: String,
      unique: true,
      index: true,
      required: true
    },
    status: {
      type: String,
      required: false
    },
    password: {
      type: String,
      required: true
    },
    photo: {
      type: String,
      required: false
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

export default model<IUser>('User', UserSchema)
