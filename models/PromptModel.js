import { models, model, Schema } from 'mongoose'

const PromptSchema = new Schema(
   {
      creator: {
         type: Schema.Types.ObjectId,
         ref: 'user',
      },
      prompt: {
         type: String,
         required: [true, 'Prompt is required'],
      },
      tag: {
         type: String,
         required: [true, 'Tag is required'],
      },
   },
   { timestamps: true }
)

const PromptModel =
   models.prompt || model('prompt', PromptSchema)

export default PromptModel
