import React from 'react'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import Header from '../components/Header'
//import Head from 'next/head';
import Link from 'next/link';
//import Layout from '../components/layout';
import { getSortedList } from '../lib/data';

export async function getStaticProps() {
  const allData = await getSortedList();
  const getProps = withAuthUserTokenSSR()();
  return {
    props: {
      allData,
      getProps
    }
  }
}

const Home = ({ allData }) => {
  return (
      <Layout home>
        <h1>List of Post Names</h1>
        <div className="list-group">
          {allData.map(({ id, name }) => (
            <Link key={id} href={`/${id}`}>
              <a className="list-group-item list-group-item-action">{name}</a>
            </Link>
          ))}
        </div>
        <div>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>
          <a href="/todo" style={{ fontSize: "40px", textDecoration: 'underline' }}>Add a todo!</a>
        </div>
         <h1>List of Post Names</h1>
        <div className="list-group">
          {allData.map(({ id, name }) => (
            <Link key={id} href={`/${id}`}>
              <a className="list-group-item list-group-item-action">{name}</a>
            </Link>
          ))}
        </div>
      </div>
    </div>
      </Layout>
  );
}

//export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser()(Home)
