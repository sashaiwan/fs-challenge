import nock from 'nock'
import { expect } from 'chai'
import { file1, file2, formattedFile1, formattedFile2 } from '../helpers.js'
import fileService from '../../services/externalApiService.js'

describe('externalApiService', () => {
  describe('getAllFiles', () => {
    beforeEach(() => {
      nock('https://echo-serv.tbxnet.com')
        .get('/v1/secret/files')
        .reply(200, {
          files: ['file1.csv', 'file2.csv']
        })

      nock('https://echo-serv.tbxnet.com')
        .get('/v1/secret/file/file1.csv')
        .reply(200, file1)

      nock('https://echo-serv.tbxnet.com')
        .get('/v1/secret/file/file2.csv')
        .reply(200, file2)
    })

    afterEach(() => {
      nock.cleanAll()
    })

    it('should parse CSV files and filter invalid ones', async () => {
      const filesResult = await fileService.getAllFiles()

      expect(filesResult).to.be.an('array')
      expect(filesResult.length).to.be.equal(2)
      expect(filesResult[0])
        .to.have.property('file')
        .that.equals(formattedFile1.file)
      expect(filesResult[1])
        .to.have.property('file')
        .that.equals(formattedFile2.file)

      expect(filesResult[0].lines).to.deep.equal(formattedFile1.lines)
    })

    it('should throw error if fails', async () => {
      nock('https://echo-serv.tbxnet.com').get('/v1/secret/files').reply(500)

      try {
        await fileService.getAllFiles()
      } catch (error) {
        error.should.have
          .property('message')
          .that.includes('Error processing CSV:')
      }
    })
  })
})
