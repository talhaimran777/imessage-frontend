import type { NextPage } from "next";
/* import Head from 'next/head' */
/* import Image from 'next/image' */
// import { useSubscription, gql } from "@apollo/client";
// import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import Chat from "../components/Chat";
// import { useRouter } from "next/router";

// const USER_ADDED = gql`
//   subscription OnUserAdded {
//     userAdded {
//       name
//     }
//   }
// `;
//
// interface User {
//   name: String;
//   age: Number;
// }

interface Context {}

const Home: NextPage = () => {
  // const { data } = useSubscription(USER_ADDED);
  // const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   if(!data) return;
  //   const { userAdded } = data;
  //   setUsers([...users, userAdded]);
  // }, [data]);

  return (
    <>
      <Chat />
    </>
  );
};

export async function getServerSideProps(context: Context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/signin",
      },
    };
  }

  return {
    props: {},
  };
}

export default Home;
