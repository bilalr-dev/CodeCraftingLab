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
                <li className="scroll-to-section"><Link href="/quiz">Quizzes</Link></li>
                <li className="scroll-to-section"><Link href="/#contact">Contact</Link></li>
              </ul>
              {/* Menu End */}
              <a className='menu-trigger'>
                <span>Menu</span>
              </a>
            </nav>
            </div>
          </div>
        </div>
      {/* Link Styles */}

        </header>
  );
};
export default Header;