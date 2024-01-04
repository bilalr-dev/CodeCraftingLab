import mongoose, { model, models, Schema } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: 'Category' },
  courses: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Course'
    }
  ],
});

export const Category = models?.Category || model('Category', CategorySchema);
