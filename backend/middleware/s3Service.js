import { v4 as uuidv4 } from 'uuid'
import { config } from 'dotenv'
import AWS from 'aws-sdk'

config()

export const s3Upload = async (file) => {
  const s3 = new AWS.S3()

  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `uploads/${uuidv4()}-${file.originalname}`,
    Body: file.buffer,
  }

  return await s3.upload(params).promise()
}

export const s3Delete = async (image) => {
  const s3 = new AWS.S3()
  if (
    image &&
    image.startsWith(
      'https://renta-car-sif-2022.s3.eu-central-1.amazonaws.com/'
    )
  ) {
    let params = {
      Bucket: process.env.BUCKET_NAME,
      Key: image.split('/').slice(3).join('/'),
    }
    s3.deleteObject(params, function (err, data) {
      if (err) console.log(err, err.stack) // an error occurred
      else console.log(data) // successful response
      /*
         data = {
         }
         */
    })

    // let getKeys = images.map((image) => {
    //   return {
    //     Key: image.split('/').slice(3).join('/'),
    //   }
    // })
    // let params = {
    //   Bucket: process.env.BUCKET_NAME,
    //   Delete: {
    //     Objects: getKeys,
    //     Quiet: false,
    //   },
    // }
    // s3.deleteObjects(params, function (err, data) {
    //   if (err) console.log(err, err.stack)
    //   else console.log(data)
    // })
  } else {
    console.log('Does not start with https://buckeyname')
  }
}
