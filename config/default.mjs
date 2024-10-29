import dotenv from 'dotenv'
dotenv.config()

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '../')

export default Object.freeze({
  dbName: process.env.DATABASE_NAME,
  dbUrl: process.env.MONGODB_URL,
  mongoURI: `${process.env.MONGODB_URL}${process.env.DATABASE_NAME}`,
  port: process.env.PORT,
  rootDir,
})
