import Head from "next/head";
import styles from "./Layout.module.css";
import NavBar from "../Navs/NavBar";

export const name = "Presta";
export const slogan = "Supercars for rent";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={`${name} - ${slogan}`} />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            slogan
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={`${slogan}`} />
        <meta name="twitter:card" content="summary_large_image" />

        {/* FontAwesome */}
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
          integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp"
          crossOrigin="anonymous"
        />

        {/* CSS Reset */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/modern-css-reset/dist/reset.min.css"
        />

        <title>{name}</title>
      </Head>

      <div className="wrapper">
        <header>
          <NavBar />
        </header>

        <main>{children}</main>
      </div>
      <footer className={styles.footer}>
        <p>
          &copy; <a href="https://ramidem.me/">Med Aduh</a> 2020. For
          Educational Purposes Only.
        </p>
      </footer>
    </>
  );
}
