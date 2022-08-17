import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

type Character = {
  name: string,
  thumbnail: {
    path: string,
    extension: string
  }
}

export interface IProps {
  marvelData: Character[]
}

const Home: NextPage<IProps> = ({ marvelData }) => {
  const renderResults = () =>
    marvelData.map(
      ({
        name,
        thumbnail: {
          extension,
          path
        }
      }) =>{
      return (
        <div className={styles.card} key={name}>
          <picture className={styles.avatar}>
            <Image
              src={`${path}/portrait_small.${extension}`}
              alt={name}
              layout="fixed"
              width={100}
              height={100}
            />
          </picture>
          <h2>{name}</h2>
        </div>
      )}
    );
    

  return (
    <div className={styles.container}>
      <Head>
        <title>RandomIn</title>
        <meta
          name="description"
          content="Una web en donde podrás conectar con otras personas de forma rápida y sencilla"
        />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Random<span className={styles.highlight}>In</span>
        </h1>

        <p className={styles.description}>
          Aqui podrás encontrar los últimos usuarios que se han unido a la red
        </p>

        <div className={styles.grid}>{renderResults()}</div>
      </main>
      <footer className={styles.footer}>
        <b>
          Hecho con
          <span className={styles.logo}>
            <Image src="/heart.png" alt="Vercel Logo" width={20} height={20} />
          </span>
          por 
        </b>
      </footer>
    </div>
  );
};

export async function getServerSideProps() {
  const marvelRes = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=${process.env.API_KEY}&hash=${process.env.HASH}`)
  const marvelData: Character[] = (await marvelRes.json()).data.results

  return { props: { marvelData } };
}

export default Home;
