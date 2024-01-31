import LatestCourses from "@/components/LatestCourses";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Services from "@/components/Services";
import { mongooseConnect } from "@/lib/mongoose";
import { Course } from "@/models/Course";
import AboutUs from "@/components/AboutUs";
import ContactUs from "@/components/ContactUs";

import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";

export default function HomePage({ newCourses }) {
  return (
    <>
      <Header />
      <Banner />
      <Services />
      <AboutUs />
      <LatestCourses courses={newCourses} />
      <ContactUs />
      <FloatingButton />
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const newCourses = await Course.find({}, null)
    .populate('category') 
    .sort({ '_id': -1 })
    .limit(8);

  return {
    props: {
      newCourses: JSON.parse(JSON.stringify(newCourses)),
    },
  };
}
