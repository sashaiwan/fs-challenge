import express from 'express'
import 'dotenv/config'
import fileService from './services/externalApiService.js'

const appContainer = (dependencies = {}) => {
  const app = express()
  const { getAllFiles = fileService.getAllFiles } = dependencies
  const { getAllListedFiles = fileService.getAllListedFiles } = dependencies

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

  app.get('/files/list', async (req, res) => {
    try {
      const filesList = await getAllListedFiles()
      res.status(200).json(filesList)
    } catch (error) {
      console.error(error.message)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  })

  return app
}

export default appContainer
