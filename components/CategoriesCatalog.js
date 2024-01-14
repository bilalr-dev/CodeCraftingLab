import { Category } from '../models/Category'; // Adjust the path accordingly
import Image from 'next/image';

export async function getStaticProps() {
  try {
    // Fetch all categories from the database
    const categories = await Category.find().exec();

    // Pass categories as a prop to the component
    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories)),
      },
    };
  } catch (error) {
    console.error('Error fetching categories:', error.message);
    return {
      props: {
        categories: [],
      },
    };
  }
}

export default function AllCategories({ categories }) {
  return (
    <div>
      <h2>All Categories</h2>
      <div className="row">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <div key={category._id} className="col-lg-4 col-md-6 mb-30">
              <div className="card">
                <div className="card-body">
                  <div className="thumb">
                    <Image src={category.categoryImage[0]} alt="" width={300} height={180} layout="responsive" />
                  </div>
                  <div className="down-content">
                    <h4>{category.name}</h4>
                    {/* You can display additional information about the category here */}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No categories found.</p>
        )}
      </div>
    </div>
  );
}
