import { User } from '../models'

const userResolvers = {
  Query: {
    users: async () => {
      try {
        let users = await User.find()
        return users
      } catch (e) {}
    }
  },
  Mutation: {
    createUser: async (_: any, args: any) => {
      try {
        let user = new User(args)
        user = await user.save()
        return user
      } catch (err) {
        console.log(err)
      }
    }
  }
}

export { userResolvers }
