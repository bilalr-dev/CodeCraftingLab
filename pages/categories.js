import Header from "@/components/Header";
import Banner from "@/components/Banner";
import CategoriesCatalog from "@/components/CategoriesCatalog";

import Footer from "@/components/Footer";
import FloatingButton from "@/components/FloatingButton";

export default function Categories(){
    return(
        <div>
        <Header />
        <Banner />

        <CategoriesCatalog />
        <FloatingButton />
        <Footer /> 
      </div>

    );
}