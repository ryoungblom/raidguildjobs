import React from 'react'
import {
  Drawer,
  DrawerOverlay,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  HamburgerIcon,
  Link,
  Stack,
  useDisclosure
} from '@chakra-ui/react'
import { Link as LinkDom } from 'react-router-dom'
import { SecondaryButton } from './buttons'

const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <SecondaryButton onClick={onOpen}>Menu</SecondaryButton>

      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody>
            <Stack>
              <Link as={LinkDom} to="/">Home</Link>
              <Link as={LinkDom} to="/companies">Companies</Link>
              <Link as={LinkDom} to="/">Jobs</Link>
              <Link as={LinkDom} to="/help">Help</Link>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Navigation
