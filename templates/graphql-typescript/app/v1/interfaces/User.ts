import { Document, Types } from 'mongoose'

// models
export interface IUser extends Document {
  email: string
  password: string
  name?: string
  photo?: string
  status?: string
}
