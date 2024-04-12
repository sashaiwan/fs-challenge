import axios from 'axios'
import { EXTERNAL_API_SECRET } from '../utils/config.js'
import { parse } from 'csv-parse/sync'

const allFilesUrl = 'https://echo-serv.tbxnet.com/v1/secret/files'
const singleFileUrl = (fileName) =>
  `https://echo-serv.tbxnet.com/v1/secret/file/${fileName}`

const options = {
  headers: {
    Authorization: `Bearer ${EXTERNAL_API_SECRET}`
  }
}

/**
 * Return an array with the names of all files listed from external source
 */
async function getAllListedFiles() {
  const response = await axios.get(allFilesUrl, options)
  const filesJson = response.data
  return filesJson.files
}

/**
 * Get single file from external source
 * @param {string} fileName
 * @returns
 */
async function getSingleFile(fileName) {
  try {
    const response = await axios.get(singleFileUrl(fileName), options)
    // Assuming the external source always respects the REST protocol
    if (response.status === 200) {
      return { success: true, data: response.data }
    } else {
      return {
        success: false,
        error: new Error(`${fileName} could not be downloaded`)
      }
    }
  } catch (error) {
    console.error(error.message)
    // AxiosError wrapper
    return { success: false, error }
  }
}

async function getRawFilesArray() {
  const rawFiles = []

  const allFilesArray = await getAllListedFiles()
  const filesPromises = allFilesArray.map((url) => getSingleFile(url))
  const results = await Promise.all(filesPromises)

  // TODO: Implement a non-blocking forEach, could be a bottleneck for large datasets
  results.forEach((result, index) => {
    if (result.success) {
      rawFiles.push(result.data)
    } else {
      console.error(
        `Error in file ${allFilesArray[index]}: ${result.error.message}`
      )
    }
  })

  return rawFiles
}

export async function getAllFiles() {
  try {
    const results = []
    const rawFiles = await getRawFilesArray()

    for (const csvFile of rawFiles) {
      // Sync parse could be a bottleneck for large csv files, instead should use the Stream API
      const records = parse(csvFile, {
        columns: true,
        relax_column_count: true
      })

      const validRecords = records.filter(
        (record) => record.text && record.number && record.hex
      )

      if (validRecords.length > 0) {
        const validData = {
          file: validRecords[0].file,
          lines: validRecords.map((record) => ({
            text: record.text,
            number: parseInt(record.number, 10),
            hex: record.hex
          }))
        }

        results.push(validData)
      }
    }
    return results
  } catch (error) {
    console.error('Error processing CSV:', error.message)
    throw error
  }
}
