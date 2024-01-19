import CoursesCatalog from "@/components/CoursesCatalog";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";

import { mongooseConnect } from "@/lib/mongoose";
import { Course } from "@/models/Course";

export default function Courses({ allCourses }) {
  return (
    <>
      <Header />
      <Banner />
      <CoursesCatalog courses={allCourses} />
      <FloatingButton />
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const allCourses = await Course.find({});

  return {
    props: {
      allCourses: JSON.parse(JSON.stringify(allCourses)),
    },
  };
}
