import React from 'react';
import { Button } from '@chakra-ui/react';

export const PrimaryButton = ({ children, ...props }) => (
  <Button colorScheme="primary" variant="solid" {...props}>
    {children}
  </Button>
);

export const SecondaryButton = ({ children, ...props }) => (
  <Button colorScheme="primary" variant="outline" {...props}>
    {children}
  </Button>
);

export const CancelButton = ({ children, ...props }) => (
  <Button colorScheme="primary" variant="ghost" {...props}>
    {children}
  </Button>
);
