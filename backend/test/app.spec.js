import request from 'supertest'
import { expect } from 'chai'
import appContainer from '../app.js'
import { formattedFile1, formattedFile2 } from './helpers.js'

describe('app', () => {
  describe('GET /files/data', () => {
    it('should return data and status 200', async () => {
      const mockService = {
        getAllFiles: () => Promise.resolve([formattedFile1, formattedFile2])
      }
      const app = appContainer(mockService)

      const response = await request(app).get('/files/data')
      expect(response.status).to.have.equal(200)
      expect(response.body).to.be.an('array')
      expect(response.body).to.deep.equal([formattedFile1, formattedFile2])
    })

    it('should return status 500 on service failure', async () => {
      const mockService = {
        getAllFiles: () => Promise.reject(new Error('Service Error'))
      }
      const app = appContainer(mockService)

      const response = await request(app).get('/files/data')
      expect(response.status).to.equal(500)
      expect(response.body).to.deep.equal({ message: 'Internal Server Error' })
    })
  })
})
