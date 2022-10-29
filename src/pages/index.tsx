import type { NextPage } from "next";
/* import Head from 'next/head' */
/* import Image from 'next/image' */
import { useSubscription, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

const USER_ADDED = gql`
  subscription OnUserAdded {
    userAdded {
      name
    }
  }
`;

interface User {
  name: String;
  age: Number;
}

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data } = useSubscription(USER_ADDED);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if(!data) return;
    const { userAdded } = data;
    setUsers([...users, userAdded]);
  }, [data]);

  if (session) {
    return (
      <>
        Signed in as {session.user?.email} <br />

        <div>
          <h1>Showing you list of users</h1>
          {users.map((user: User) => <p>{user.name}</p>)}
        </div>

        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return (
    <>
      Not signed in <br />
      <Link passHref href="/auth/signin">
        <a>
          <h2>NextAuth.js Signin</h2>
          <p>Visit custom sign-in page</p>
        </a>
      </Link>
    </>
  )
};

export default Home;
