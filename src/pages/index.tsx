import type { NextPage } from "next";
/* import Head from 'next/head' */
/* import Image from 'next/image' */
import { useSubscription, gql } from "@apollo/client";
import { useEffect, useState } from "react";

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
  const { data } = useSubscription(USER_ADDED);
  const [users, setUsers] = useState<User[]>([]);
  console.log("YOYO", users);

  useEffect(() => {
    if(!data) return;
    const { userAdded } = data;
    setUsers([...users, userAdded]);
  }, [data]);

  return (
    <div>
      <h1>Showing you list of users</h1>
      {users.map((user: User) => <p>{user.name}</p>)}
    </div>
  );
};

export default Home;
