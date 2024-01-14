// lib/mongoose.js
import mongoose from 'mongoose';
import CategorySchema from '../models/Category';
import CourseSchema from '../models/Course';

// Register the Category and Course models
mongoose.model('Category', CategorySchema);
mongoose.model('Course', CourseSchema);

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    const uri = process.env.MONGODB_URI;
    return mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  }
}

export async function backupDatabase() {
  try {
    // Connect to MongoDB
    await mongooseConnect();

    // Fetch all documents from your collections
    const Category = mongoose.model('Category');
    const Course = mongoose.model('Course');

    const categories = await Category.find({});
    const courses = await Course.find({});

    // Combine data from different collections as needed
    const backupData = {
      categories,
      courses,
      // Add more collections as needed
    };

    return backupData;
  } catch (error) {
    console.error('Backup failed:', error);
    throw error;
  }
}

export async function restoreDatabase(data) {
  try {
    // Connect to MongoDB
    await mongooseConnect();

    // Delete existing data
    await mongoose.model('Category').deleteMany({});
    await mongoose.model('Course').deleteMany({});

    // Restore categories
    const restoredCategories = await mongoose.model('Category').create(data.categories);

    // Map restored category IDs to the original category IDs
    const categoryMap = new Map(data.categories.map((original, index) => [original._id, restoredCategories[index]._id]));

    // Modify courses to use the new category IDs
    const restoredCourses = data.courses.map(course => ({
      ...course,
      category: categoryMap.get(course.category),
    }));

    // Restore courses
    await mongoose.model('Course').create(restoredCourses);

    console.log('Database restore successful');
  } catch (error) {
    console.error('Database restore failed:', error);
    throw error;
  }
}