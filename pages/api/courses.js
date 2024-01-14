import { Course } from "@/models/Course";
import { Category } from "@/models/Category"; // Import Category model
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Course.findOne({ _id: req.query.id }));
    } else {
      res.json(await Course.find());
    }
  }

  if (method === "POST") {
    const { title, description, youtubeUrl, images, category, bodyText } = req.body;

    // Find the category by its ID
    const categoryDoc = await Category.findOne({ _id: category });

    if (!categoryDoc) {
      return res.status(400).json("Invalid category ID.");
    }

    // Create a new course and add it to the category's courses list
    const courseDoc = await Course.create({
      title,
      description,
      youtubeUrl,
      images,
      category: categoryDoc._id,
      bodyText,
    });

    // Update the category's courses list
    categoryDoc.courses.push(courseDoc._id);
    await categoryDoc.save();

    res.json(courseDoc);
  }

  if (method === "PUT") {
    const { title, description, youtubeUrl, images, category, _id, bodyText } = req.body;
    await Course.updateOne(
      { _id },
      {
        $set: {
          title,
          description,
          youtubeUrl,
          images,
          category,
          bodyText,
        },
      }
    );
    res.json(true);
  }
  

  if (method === 'DELETE') {
    if (req.query?.id) {
      // Find the course by its ID
      const courseDoc = await Course.findOne({ _id: req.query.id });

      if (!courseDoc) {
        return res.status(400).json("Invalid course ID.");
      }

      // Remove the course ID from the corresponding category's courses list
      const categoryDoc = await Category.findOne({ _id: courseDoc.category });
      categoryDoc.courses = categoryDoc.courses.filter(courseId => courseId.toString() !== req.query.id);
      await categoryDoc.save();

      // Delete the course
      await Course.deleteOne({ _id: req.query.id });
      res.json(true);
    } else if (req.query?.all === 'true') {
      // Delete all courses
      await Course.deleteMany({});
      res.json(true);
    } else {
      res.status(400).json('Invalid request.');
    }
  }
}
