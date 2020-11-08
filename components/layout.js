import Head from "next/head";
import Navigation from "../components/navigation";

export const name = "Presta";
export const slogan = "Renta Super Cars";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={`${name} - ${slogan}`} />
        {/* change this */}
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            slogan
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={`${slogan}`} />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Roboto+Mono&display=swap"
          rel="stylesheet"
        />

        {/* FontAwesome */}
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
          integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp"
          crossOrigin="anonymous"
        />

        <title>{name}</title>
      </Head>

      <Navigation />
      <main>{children}</main>
    </>
  );
}
