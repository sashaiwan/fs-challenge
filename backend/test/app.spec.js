import request from 'supertest'
import { expect } from '@bundled-es-modules/chai'
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

    it('should simulate server error and return status 500', async () => {
      const mockService = {
        getAllFiles: () => Promise.reject(new Error('Internal Server Error'))
      }
      const app = appContainer(mockService)

      const response = await request(app).get('/files/data')
      expect(response.status).to.equal(500)
      expect(response.body).to.deep.equal({ message: 'Internal Server Error' })
    })
  })
})
