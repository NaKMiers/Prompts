import PromptModel from '@models/PromptModel'
import { connectToDB } from '@utils/database'

export const GET = async (req, { params }) => {
   console.log('/api/users/:id/posts')
   try {
      await connectToDB()

      const prompts = await PromptModel.find({
         creator: params.id,
      })
         .populate('creator')
         .lean()

      return new Response(JSON.stringify(prompts), {
         status: 200,
      })
   } catch (error) {
      return new Response('Failed to fetch all prompts', {
         status: 500,
      })
   }
}
