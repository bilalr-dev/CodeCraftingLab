import React from 'react';


const Header = () => {
  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              {/* Logo Start */}
              <a href="/" className="logo">
                <h1>CodeCraftingLab</h1>
              </a>
              {/* Logo End */}
              {/* Search Start */}
              <div className="search-input">
                <form id="search" action="#">
                  <input type="text" placeholder="Type Something" id="searchText" name="searchKeyword" />
                  <i className="fa fa-search"></i>
                </form>
              </div>
              {/* Search End */}
              {/* Menu Start */}
              <ul className="nav">
                <li className="scroll-to-section"><a href="categories">Categories</a></li>
                <li className="scroll-to-section"><a href="#courses">Courses</a></li>
                <li className="scroll-to-section"><a href="#team">Online IDE</a></li>
                <li className="scroll-to-section"><a href="#contact">Contact </a></li>
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
