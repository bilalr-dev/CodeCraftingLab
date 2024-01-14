import mongoose, { model, Schema, models } from "mongoose";

const CourseSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  bodyText: String, 
  youtubeUrl: { type: String, required: true },
  images: [{ type: String }],
  category: { type: mongoose.Types.ObjectId, ref: 'Category' },
}, {
  timestamps: true,
});


export const Course = models.Course || model('Course', CourseSchema);
