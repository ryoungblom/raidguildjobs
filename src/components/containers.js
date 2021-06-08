import React from "react";
import { Flex } from "@chakra-ui/react";

export const CardContainer = ({ children, ...props }) => (
  <Flex
    colorscheme="primary"
    variant="solid"
    direction="row"
    wrap="wrap"
    {...props}
  >
    {children}
  </Flex>
);
