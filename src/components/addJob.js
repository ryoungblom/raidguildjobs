import React, { Fragment, useEffect, useState } from "react";
import {
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { PrimaryButton, CancelButton } from "./buttons";

import { useRaidJobs } from "../contexts/raidJobsContext";
import { useInjectedProvider } from "../contexts/injectedProviderContext";

const AddJob = () => {
  const { jobs } = useRaidJobs();
  const { address } = useInjectedProvider();
  const [account, setAccount] = useState()
  
  useEffect(() => {
    
    console.log("Address: ", address)

    if(address !== null) {

      setAccount(address)

    }
  }, [address ])

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const update = (set) => (event) => {
    set(event.target.value);
  };

  const onSubmit = (event) => {
    jobs.methods.addJob(title, description).send({ from: account });
    onClose();
  };

  return (
    <Fragment>
      <PrimaryButton onClick={onOpen}>Add Job</PrimaryButton>

      <Modal
        borderWidth="1px"
        borderColor="primary.500"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent layerStyles="rg">
          <ModalHeader>Add job</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              variant="rg"
              onChange={update(setTitle)}
              type="text"
              placeholder="Title"
              required
            />
            <Textarea
              variant="rg"
              onChange={update(setDescription)}
              placeholder="Description"
              required
            />
          </ModalBody>
          <ModalFooter>
            <CancelButton onClick={onClose}>Cancel</CancelButton>
            <PrimaryButton onClick={onSubmit}>Add</PrimaryButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default AddJob;
