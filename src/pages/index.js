import Head from "next/head";

import Jumbotron from "../components/Jumbotron/Jumbotron";
import SlickShowcase from "../components/SlickShowcase/SlickShowcase";
import Layout, { name } from "../components/Layout/Layout";
import CarsGrid from "../components/Cars/CarsGrid";

const Home = () => {
  return (
    <Layout>
      <Head>
        <title>{name}</title>
      </Head>
      <Jumbotron />
      <SlickShowcase />
      <CarsGrid />
    </Layout>
  );
};

export default Home;
