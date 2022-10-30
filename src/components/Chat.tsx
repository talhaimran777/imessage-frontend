import {
  Flex,
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import React from "react";
import Chats from "./Chats";
import ConversationsWrapper from "./ConversationsWrapper";
import { ChevronRightIcon, CloseIcon } from "@chakra-ui/icons";
import useWindowDimensions from "../hooks/useWindowDimension";

const Chat = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { width } = useWindowDimensions();
  const btnRef = React.useRef();

  return (
    <Flex height="100vh">
      {width < 850 ? (
        <Box>
          <ChevronRightIcon
            pos="absolute"
            top="5"
            left="5"
            onClick={onOpen}
            color="#84E611"
            fontSize="3xl"
            cursor="pointer"
          />

          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
            size="md"
          >
            <DrawerOverlay />
            <DrawerContent>
              <CloseIcon
                pos="absolute"
                top="5"
                right="5"
                onClick={onClose}
                color="#84E611"
                fontSize="lg"
                cursor="pointer"
              />
              <DrawerHeader>Your Conversations</DrawerHeader>

              <DrawerBody>
                <Text>Coversations List Here</Text>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>
      ) : (
        <Box bg="blackAlpha.300" width="380px">
          <Chats />
        </Box>
      )}

      <Box flex="1">
        <ConversationsWrapper />
      </Box>
    </Flex>
  );
};

export default Chat;
