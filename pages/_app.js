import Head from 'next/head';
import '../public/styles/bootstrap.min.css';
import '../public/styles/templatemo-scholar.css';
import '../public/styles/owl.css';
import '../public/styles/animate.css';

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />
      <link rel="stylesheet" href="/styles/owl.css" />
        {/* Include external scripts in the head */}
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js"></script>
        {/* ... other head elements */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
