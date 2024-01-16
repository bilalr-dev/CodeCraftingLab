import CategoriesCatalog from "@/components/CategoriesCatalog";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";

import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default function Categories({ allCategories }) {    return(
        <>
        <Header />
        <Banner />
        <CategoriesCatalog categories={allCategories} />
        <FloatingButton />
        <Footer /> 
      </>

    );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const allCategories = await Category.find({});

  return {
    props: {
      allCategories: JSON.parse(JSON.stringify(allCategories)),
    },
  };
}