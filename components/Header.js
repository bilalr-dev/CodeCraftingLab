import Link from 'next/link';
import React from 'react';


const Header = () => {
  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              {/* Logo Start */}
              <Link href="/" className="logo">
                <h1>CodeCraftingLab</h1>
              </Link>
              {/* Logo End */}
              {/* Menu Start */}
              <ul className="nav">
                <li className="scroll-to-section"><Link href="/categories">Categories</Link></li>
                <li className="scroll-to-section"><Link href="/courses">Courses</Link></li>
                <li className="scroll-to-section"><Link href="/#ide">Online IDE</Link></li>
                <li className="scroll-to-section"><Link href="/#contact">Contact </Link></li>
              </ul>
              {/* Menu End */}
            </nav>

      </div>
          </div>
          
        </div>



      {/* Link Styles */}
      <link rel="stylesheet" href="/styles/bootstrap.min.css" />
      <link rel="stylesheet" href="/styles/fontawesome.css" />
      <link rel="stylesheet" href="/styles/templatemo-scholar.css" />
      <link rel="stylesheet" href="/styles/owl.css" />
      <link rel="stylesheet" href="/styles/animate.css" />
      <link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css" />
    </header>
  );
};

export default Header;
