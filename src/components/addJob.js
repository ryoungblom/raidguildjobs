import React, { Fragment, useEffect, useState } from 'react';
import Web3 from 'web3';
import {
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@chakra-ui/react';

import { JOB_ABI, JOB_ADDRESS } from '../config.js';

const runWeb3 = async () => {
	if (window.ethereum) {
		window.web3 = new Web3(window.ethereum);
		await window.ethereum.enable();
	} else if (window.web3) {
		window.web3 = new Web3(window.web3.currentProvider);
	} else {
		window.alert('Non-Ethereum browser detected. Please install MetaMask or similar!');
	}
};

const AddJob = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [jobData, setJobData] = useState({});
	const [account, setAccount] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const blockchain = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")

    setJobData(new web3.eth.Contract(JOB_ABI, JOB_ADDRESS))

    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
  }

  useEffect(() => {
    (async function setup () {
      await runWeb3();
      await blockchain();
    })()
  }, [])

  const update = (set) => (event) => {
    set(event.target.value)
  };

  const onSubmit = (event) => {
    onClose();
		jobData.methods.addJob(title, description).send({ from: account })
  };

  return (
    <Fragment>

      <Button colorScheme="primary" variant="outline" onClick={onOpen}>Add Job</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add job</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input onChange={update(setTitle)} type="text" placeholder="Title" required />
            <Input onChange={update(setDescription)} type="text" placeholder="Description" required />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="primary" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button colorScheme="primary" variant="solid" onClick={onSubmit}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Fragment>
  );
};

export default AddJob;
