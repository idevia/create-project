import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import chalk from 'chalk'
const { loadFiles } = require('graphql-import-files')
import { ApolloServer, gql } from 'apollo-server-express'
const { resolvers } = require(`./${process.env.API_VERSION}/resolvers`)
const typeDefs = loadFiles('**/typeDefs/**/*.{graphql,gql}')
class App {
  public app: express.Application
  private apolloServer: any
  private PORT: string | number
  constructor() {
    // super()
    this.app = express()
    this.PORT = process.env.PORT || 5000
  }

  private _setupDb(): void {
    if (process.env.DB_URL) {
      mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      const db = mongoose.connection
      db.on('connected', () => {
        console.log(chalk.cyanBright.bold('Database connected'))
      })
      db.on('error', () => {
        chalk.bold.redBright('MongoDB Connection error')
      })
    }
  }

  public run(): void {
    this._setupDb()
    this._setupConfig()
    this._setupApolloServer()
    this._setupRequestLogger()

    this.app.listen(this.PORT, () => {
      console.log(chalk.bold.yellowBright(`Server is running on port: ${this.PORT}`))
      console.log(
        `Server ready at http://localhost:${this.PORT}${this.apolloServer.graphqlPath}`
      )
    })
  }

  private _setupApolloServer(): void {
    this.apolloServer = new ApolloServer({
      typeDefs,
      resolvers
    })

    this.apolloServer.applyMiddleware({ app: this.app })
  }

  private _setupConfig(): void {
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    // this.app.use(cors())
  }

  private _setupRequestLogger(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*')
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      )
      res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE')
      console.log(
        `[${new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`,
        chalk.underline.bgRgb(110, 96, 204).whiteBright(req.method),
        chalk.bold.white(req.url)
      )
      next()
    })
  }
}

export default App
