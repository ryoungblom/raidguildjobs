import React from 'react';
import { Box, Flex, Heading, Image, Spacer } from '@chakra-ui/react';
import Navigation from './nav';
import AddJob from './addJob';
import logo from '../assets/raidguild_logo.png';

const Header = (props) => (
  <Flex padding="" align="center">
    <Box padding="10px">
      <Image fallbackSrc="https://via.placeholder.com/300x80" src={logo} maxHeight="60px" />
    </Box>
    <Box padding="10px 20px">
      <Heading size="lg">Job Board</Heading>
    </Box>

    <Spacer />

    <Box>
      <AddJob />
      <Navigation />
    </Box>
  </Flex>
);

export default Header;
