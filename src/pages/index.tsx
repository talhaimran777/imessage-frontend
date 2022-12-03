import type { NextPage } from "next";
/* import Head from 'next/head' */
/* import Image from 'next/image' */
// import { useSubscription, gql } from "@apollo/client";
// import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import Chat from "../components/Chat";
import CreateUsername from "../components/CreateUsername";
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
//   name: string;
//   age: Number;
// }

interface Context { }

interface USER {
  id: string;
  name: string;
  username: string;
}

interface HomeProps {
  user?: USER
}

const Home: NextPage = (props: HomeProps) => {
  const { user } = props;
  console.log("YOYO", user);
  
  // const { data } = useSubscription(USER_ADDED);
  // const [users, setUsers] = useState<User[]>([]);

  // useEffect(() => {
  //   if(!data) return;
  //   const { userAdded } = data;
  //   setUsers([...users, userAdded]);
  // }, [data]);

  useEffect(() => {
    if (user) return localStorage.setItem('userId', user.id);
    localStorage.removeItem('userId');
  }, [user]);

  return (
    <>
      {user ? (
        user.username ? (
          <Chat />
        ) : (
          <CreateUsername userId={user.id} />
        )
      ) : null}
    </>
  );
};

export async function getServerSideProps(context: Context) {
  const user = await getSession(context);

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/signin",
      },
    };
  }

  return {
    props: {
      user
    },
  };
}

export default Home;
