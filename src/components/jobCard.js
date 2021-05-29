import React from "react";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  VStack,
  Divider,
  Tag,
  TagLabel,
  Spacer,
} from "@chakra-ui/react";
import { PrimaryButton } from "./buttons";

const jobCard = (job) => {
  const { owner, title, description, creationTimestamp, active } = job;
  const date = new Date(creationTimestamp * 1000).toDateString();
  console.log(job);
  const applyForJob = () => {
    console.log("Applying for job");
  };

  return (
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      borderColor="gray"
      padding="5"
      margin="5"
      overflow="hidden"
    >
      <HStack>
        <Avatar
          src="https://1.bp.blogspot.com/-X6Ytbn6nZgA/UYg7oU3DtqI/AAAAAAAAAm8/HyYSBBg4Z6Y/s1600/UMBRELLA+CORPORATION.png"
          size="md"
          name="Company Icon"
          mt={-10}
          ml={-2}
          mr={2}
          borderColor="transparent"
          bgColor="transparent"
        />
        <VStack spacing="5px" d="flex" alignItems="baseline">
          <Box
            color="primary.500"
            mt="1"
            fontWeight="semibold"
            fontSize="lg"
            lineHeight="tight"
            isTruncated
          >
            {title}
          </Box>
          <Box
            color="primary.500"
            // fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {owner}
          </Box>
          <Box mt="1" fontSize="lg" lineHeight="tight" isTruncated>
            {description}
          </Box>
        </VStack>
        <PrimaryButton
          size="md"
          onClick={applyForJob}
          textTransform="uppercase"
        >
          Join Raid
        </PrimaryButton>
      </HStack>

      <Divider />
      <Flex marginTop="5">
        <HStack spacing={2}>
          <Box>Raiders needed:</Box>
          <Tag
            size="md"
            key="first"
            variant="subtle"
            colorScheme="red"
            borderRadius="full"
          >
            <Avatar
              src="https://s1.piq.land/2014/02/28/9uxAn14xZA0NIK7WM463R1S7_400x400.png"
              size="xs"
              name="Archer"
              ml={-2}
              mr={2}
            />
            <TagLabel>Archer</TagLabel>
          </Tag>
          <Tag
            size="md"
            key="second"
            variant="subtle"
            colorScheme="teal"
            borderRadius="full"
          >
            <Avatar
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/269e1e13-532a-46e0-965d-b51e9df94451/d5qskry-9cdc8c2f-6f17-4f06-88b0-48e87a801191.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi8yNjllMWUxMy01MzJhLTQ2ZTAtOTY1ZC1iNTFlOWRmOTQ0NTEvZDVxc2tyeS05Y2RjOGMyZi02ZjE3LTRmMDYtODhiMC00OGU4N2E4MDExOTEucG5nIn1dXX0.Y8sq-TSmlw_AcC0XySU9nltM8Fgtv5BKeStQOrX9MIc"
              size="xs"
              name="Monk"
              ml={-2}
              mr={2}
            />
            <TagLabel>Monk</TagLabel>
          </Tag>
        </HStack>
        <Spacer />
        <Box color="primary.200" fontSize="sm" ml="2">
          {`Created ${date}`}
        </Box>
      </Flex>
    </Box>
  );
};

export default jobCard;
