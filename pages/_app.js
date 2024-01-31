import Head from 'next/head';
import '../public/styles/bootstrap.min.css';
import '../public/styles/templatemo-scholar.css';
import '../public/styles/owl.css';
import '../public/styles/animate.css';
function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Include external stylesheets in the head */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />

        {/* Include external scripts in the head with 'async' attribute */}
        <script src="https://code.jquery.com/jquery-3.6.0.min.js" async></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/owl.carousel.min.js" async></script>     
       </Head>
      <Component {...pageProps} />
    </>
  );
}
export default App;
