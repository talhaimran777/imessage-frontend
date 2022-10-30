import { Button, Box, Text } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

const Chats = () => {
  return (
    <Box>
      <Text fontSize="md" mb="3">
        List of chats here!
      </Text>
      <Button size="sm" bg="#84E611" color="black" onClick={() => signOut()}>
        Sign out
      </Button>
    </Box>
  );
};

export default Chats;
