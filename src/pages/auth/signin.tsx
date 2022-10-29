import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { getProviders, getSession, signIn } from "next-auth/react";
import type { NextPage } from "next";

interface Context {}

const Signin: NextPage = () => {
  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <Flex align="center" direction="column">
        <Image
          boxSize="100px"
          objectFit="cover"
          src="/images/imessage-logo.svg"
          alt="Imessage Logo"
        />
        <Text fontSize="2xl" mb="3" fontWeight="extrabold">
          Messenger QL
        </Text>
        <Text fontSize="sm" mb="5" align="center">
          Signin with google to send unlimited free messages to your friends
        </Text>
        <Button
          onClick={() => signIn("google")}
          backgroundColor="black.400"
          leftIcon={<FcGoogle />}
        >
          Continue with Google
        </Button>
      </Flex>
    </Flex>
  );
};

export default Signin;

export async function getServerSideProps(context: Context) {
  const providers = await getProviders();
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: { providers },
  };
}
