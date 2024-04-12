import express from 'express'
import 'dotenv/config'
import { getAllFiles as defaultGetAllFiles } from './services/externalApiService.js'

const appContainer = (dependencies = {}) => {
  const app = express()
  const { getAllFiles = defaultGetAllFiles } = dependencies

  app.get('/files/data', async (req, res) => {
    try {
      const files = await getAllFiles()
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(files)
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  })

  return app
}

export default appContainer
