import React, { useEffect, useState } from "react";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

interface CreateUsernameProps {
  userId: String;
}

const CREATE_USERNAME = gql`
  mutation Mutation($username: String) {
    createUsername(username: $username) {
      username
    }
  }
`;

const CreateUsername: React.FC<CreateUsernameProps> = ({ userId }) => {
  const [username, setUsername] = useState("");
  const [createUsernameFunction, { data, loading, error }] = useMutation(CREATE_USERNAME);

  const router = useRouter();

  const createUsername = () => {
    if (!username) return;
    createUsernameFunction({ variables: { username } });
  };

  useEffect(() => {
    if(!data && !data?.createUsername?.username) return;
    router.push("/");
  }, [data])

  return (
    <Flex height="100vh" alignItems={"center"} justifyContent={"center"}>
      <Flex direction={"column"}>
        <Text mb="3" fontSize="3xl" align={"center"}>
          Create Username
        </Text>
        <Input
          mb="6"
          name="username"
          placeholder="Enter username here"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button onClick={createUsername}>Save</Button>
      </Flex>
    </Flex>
  );
};

export default CreateUsername;
