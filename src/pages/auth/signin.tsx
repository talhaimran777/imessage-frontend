import type { NextPage } from "next";
import { getProviders, signIn } from "next-auth/react";

interface Provider {
  id: string;
  name: string;
}

interface SignInProps {
  providers: [Provider]
}

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

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
