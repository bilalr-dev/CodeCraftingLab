import { Category } from "@/models/Category";
import { Course } from "@/models/Course";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "@/pages/api/auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === 'GET') {
    res.json(await Category.find().populate('parent').populate('courses'));
  }

  if (method === 'POST') {
    const { name, parentCategory, courses,categoryImage } = req.body;
    const categoryDoc = await Category.create({
      name,
      parent: parentCategory || undefined,
      courses: courses || [],
      categoryImage: categoryImage || [],
    });
    res.json(categoryDoc);
  }

  if (method === 'PUT') {
    const { _id, name, parentCategory, courses,categoryImage  } = req.body;
    const categoryDoc = await Category.findByIdAndUpdate(
      _id,
      {
        name,
        parent: parentCategory || undefined,
        courses: courses || [],
        categoryImage: categoryImage || [],
      },
      { new: true }
    ).populate('parent').populate('courses');
    res.json(categoryDoc);
  }

  if (method === 'DELETE') {
    const { _id, all } = req.query;

    if (all === 'true') {
      // Delete associated courses for all categories
      const categoriesToDelete = await Category.find({});
      for (const categoryToDelete of categoriesToDelete) {
        const coursesToDelete = categoryToDelete.courses || [];
        await Course.deleteMany({ _id: { $in: coursesToDelete } });
      }

      await Category.deleteMany({});
      res.json('All categories deleted.');
    } else if (_id) {
      // Delete associated courses for the specific category
      const categoryToDelete = await Category.findOne({ _id });
      const coursesToDelete = categoryToDelete.courses || [];
      await Course.deleteMany({ _id: { $in: coursesToDelete } });

      await Category.deleteOne({ _id });
      res.json('Category deleted.');
    } else {
      res.status(400).json('Invalid request.');
    }
  }
}
