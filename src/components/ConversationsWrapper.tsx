import { Flex, Text, Button } from "@chakra-ui/react";

const ConversationsWrapper = () => {
  return (
    <Flex
      height="full"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text fontSize="4xl" fontWeight="extrabold" mb="5">
        Let's get started :)
      </Text>
      <Button backgroundColor="#84E611" color="black">
        Create Conversation
      </Button>
    </Flex>
  );
};

export default ConversationsWrapper;
