import Head from "next/head";

import Jumbotron from "../components/Jumbotron/Jumbotron";
import SlickShowcase from "../components/SlickShowcase/SlickShowcase";
import Layout, { name } from "../components/Layout/Layout";
import CarsGrid from "../components/Cars/CarsGrid";

const Home = ({ cars }) => {
  console.log(cars);
  return (
    <Layout>
      <Head>
        <title>{name}</title>
      </Head>
      <Jumbotron />
      <SlickShowcase />
      <CarsGrid cars={cars} />
    </Layout>
  );
};

export default Home;

export async function getStaticProps() {
  const res = await fetch("https://api-presta-app.herokuapp.com/cars");
  const cars = await res.json();

  return {
    props: {
      cars,
    },
  };
}
