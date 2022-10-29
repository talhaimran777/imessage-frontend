import type { NextPage } from "next";
import { getProviders, getSession, signIn } from "next-auth/react";

interface Provider {
  id: string;
  name: string;
}

interface SignInProps {
  providers: [Provider];
}

interface Context {}

const Signin: NextPage<SignInProps> = ({ providers }) => {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn("google")}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
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
