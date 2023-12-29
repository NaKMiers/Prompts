import mongoose from 'mongoose'

let isConnected = false // track the connection

export const connectToDB = async () => {
   mongoose.set('strictQuery', true)

   if (isConnected) {
      console.log('MongoDB is already connected')
      return
   }

   try {
      await mongoose.connect(process.env.MONGODB, {
         dbName: 'prompts',
      })

      isConnected = true

      console.log('MongoDB connected successfully')
   } catch (err) {
      console.log('MongoDb connected failure: ', err)
   }
}
