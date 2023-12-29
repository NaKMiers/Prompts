import PromptModel from '@models/PromptModel'
import { connectToDB } from '@utils/database'

// GET
export const GET = async (req, { params }) => {
   try {
      await connectToDB()

      const prompt = await PromptModel.findById(params.id)
      if (!prompt)
         return new Response('Prompt not found', {
            status: 404,
         })

      return new Response(JSON.stringify(prompt), {
         status: 200,
      })
   } catch (error) {
      return new Response('Failed to fetch all prompts', {
         status: 500,
      })
   }
}

// PATCH
export const PATCH = async (req, { params }) => {
   const { prompt, tag } = await req.json()

   try {
      await connectToDB()

      const existingPrompt = await PromptModel.findById(
         params.id
      )

      if (!existingPrompt)
         return new Response('Prompt Not Found', {
            status: 404,
         })

      existingPrompt.prompt = prompt
      existingPrompt.tag = tag

      await existingPrompt.save()

      return new Response(JSON.stringify(existingPrompt), {
         status: 200,
      })
   } catch (error) {
      return new Response('Failed to update prompt', {
         status: 500,
      })
   }
}

// DELETE
export const DELETE = async (req, { params }) => {
   try {
      await connectToDB()

      await PromptModel.findByIdAndDelete(params.id)

      return new Response('Delete prompt Successfully', {
         status: 200,
      })
   } catch (error) {
      return new Response('Failed to delete prompt', {
         status: 500,
      })
   }
}