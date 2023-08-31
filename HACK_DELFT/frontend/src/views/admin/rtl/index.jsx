/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _|
 | |_| | | | | |_) || |  / / | | |  \| | | | | || |
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|

=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import {
  Avatar,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import { HSeparator } from "components/separator/Separator";
import {isConnected, getAddress, getNetwork, getPublicKey, signMessage} from "@gemwallet/api";


import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
  MdPersonAdd
} from "react-icons/md";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

export default function UserReports() {
//   const connect = async () => {
//     const hasWallet = await isConnected();
//     if (hasWallet) {
//       const responsePublicKey = await getPublicKey();
//       if (responsePublicKey) {
//         setAddress();
//         const {address, publicKey} = responsePublicKey;
//         window.open("/admin/default", "_self");
//       }
//     } else {
//       alert(
//           "User doesn't have GemWallet! Please install it: https://gemwallet.app"
//       );
//     }
//   };


  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
      {bg: "gray.200"},
      {bg: "whiteAlpha.300"}
  );
  const googleActive = useColorModeValue(
      {bg: "secondaryGray.300"},
      {bg: "whiteAlpha.200"}
  );

  // const handleSubmit = async (event) => {
  //   console.log("Submitted values: ", amount, currency, song);
  //
  //   alert(`You submitted: ${amount} ${currency} to the song: ${song}`);
  // };

  // const [description, setDescription] = useState("");
  // const [shopAddress, setShopAddress] = useState("");
  // const [shopName, setShopName] = useState("");
  // const [beneficiaryAddress, setBeneficiaryAddress] = useState("");
  const [documents, setDocuments] = useState([""]); // Initial state with one empty document

  const addDocument = () => {
    setDocuments([...documents, ""]);
  };

const handleDocumentChange = (index, event) => {
    const newDocuments = [...documents];
    newDocuments[index] = event.target.files[0];  // Store the file object
    setDocuments(newDocuments);
};

  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [additional_description, setAdditionalDescription] = useState("");
  const [total_amount, setTotalAmount] = useState("");
  const [type_retailer, setRetailer] = useState("");
  const [retailer_address, setRetailerAddress] = useState("");
  const fieldNames = ["Location", "Description", "Category", "Total Amount", "Type of Retailer", "Retailer Address"];


  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    console.log("Text Fields: ", location, description, additional_description, total_amount, type_retailer, retailer_address);
    console.log("Documents: ", documents);

    const formData = new FormData();
    formData.append("location", location);
    formData.append("description", description);
    formData.append("additional_description", additional_description);
    formData.append("total_amount", total_amount);
    formData.append("type_retailer", type_retailer);
    formData.append("retailer_address", retailer_address);
    documents.forEach((doc, index) => {
        formData.append(`document_${index + 1}`, doc);
    });

    const handleConnect = () => {
        signMessage("NFT Mint. Add new charity!").then((response) => {
            console.log("Signed message: ", response.result?.signedMessage);
        });
    }
    // Send the POST request to Django
    try {
        const response = await fetch("http://127.0.0.1:8000/api/new_charity/", {
            method: "POST",
            body: formData
        });
        await handleConnect()
        if (response.ok) {
            // Update the values and refresh the page
            // For example, if you want to update the value for donators for projects by one:
            // setTotalProjects(prev => prev + 1);
            window.location.reload();
        } else {
            console.error("Failed to submit form");
        }
    } catch (error) {
        console.error("There was an error submitting the form:", error);
    }
};

  return (
      <Box pt={{base: "130px", md: "80px", xl: "80px"}}>
        <SimpleGrid
            columns={{base: 1, md: 2, lg: 3, "2xl": 6}}
            gap='20px'
            mb='20px'>
          {/*<MiniStatistics*/}
          {/*  startContent={*/}
          {/*    <IconBox*/}
          {/*      w='56px'*/}
          {/*      h='56px'*/}
          {/*      bg={boxBg}*/}
          {/*      icon={*/}
          {/*        <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />*/}
          {/*      }*/}
          {/*    />*/}
          {/*  }*/}
          {/*  name='Percentage of earnings/ royalties'*/}
          {/*  value='10%~'*/}
          {/*/>*/}
          <MiniStatistics
              startContent={
                <IconBox
                    w='56px'
                    h='56px'
                    bg={boxBg}
                    icon={
                      <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor}/>
                    }
                />
              }
              name='Total donations'
              value='$12,642.39'
              growth='increase 3%'
          />
          {/*<MiniStatistics growth='increase 3%' name='Total royalties collected' value='$120,642.39' />*/}
          {/*<MiniStatistics*/}
          {/*  endContent={*/}
          {/*    <Flex me='-16px' mt='10px'>*/}
          {/*      <FormLabel htmlFor='balance'>*/}
          {/*        <Avatar src={Usa} />*/}
          {/*      </FormLabel>*/}
          {/*      <Select*/}
          {/*        id='balance'*/}
          {/*        variant='transparent'*/}
          {/*        mt='5px'*/}
          {/*        me='0px'*/}
          {/*        >*/}
          {/*        <option value='usd'>USD</option>*/}
          {/*        <option value='eur'>EUR</option>*/}
          {/*        <option value='gbp'>GBP</option>*/}
          {/*        <option value='usd'>JPY</option>*/}
          {/*        <option value='eur'>AUD</option>*/}
          {/*        <option value='gba'>CAD</option>*/}
          {/*      </Select>*/}
          {/*    </Flex>*/}
          {/*  }*/}
          {/*  name='Royalties to distribute'*/}
          {/*  value='$18,653.45'*/}
          {/*/>*/}
          <MiniStatistics
              startContent={
                <IconBox
                    w='56px'
                    h='56px'
                    bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
                    icon={<Icon w='28px' h='28px' as={MdPersonAdd} color='white'/>}
                />
              }
              name='New Donators'
              value='120'
          />
          <MiniStatistics
              startContent={
                <IconBox
                    w='56px'
                    h='56px'
                    bg={boxBg}
                    icon={
                      <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor}/>
                    }
                />
              }
              name='Total Projects'
              value='22'
          />
          {/*<MiniCalendar h='90%' w='80%' minW='80%' selectRange={false} />*/}
        </SimpleGrid>


    {/* Flex container for calendar and form */}
    <Flex direction={{ base: "column", md: "row" }} align="start" justify="space-between">
      {/* Form on the right */}
      <Box flex="1" me={{ md: "20px" }} mb={{ base: "20px", md: "0" }} justify="center" align="center" flexDirection="column">
        <Heading color={textColor} fontSize='36px' mb='10px' align='center'>
          Add new charity
        </Heading>
        <form onSubmit={handleSubmit} >

        <Flex
          zIndex='2'
          direction='column'
          align='center'
          w="60%"
          maxW='auto'
          background='transparent'
          borderRadius='15px'>
              {[location, description, additional_description, total_amount, type_retailer, retailer_address].map((field, index) => (
                  <FormControl key={index}>
                    <FormLabel fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
                        {fieldNames[index]}<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Input
                        variant='auth'
                        fontSize='sm'
                        type='text'
                        mb='24px'
                        fontWeight='500'
                        size='lg'
                        value={field}
                        onChange={(e) => {
                          const setters = [setLocation, setDescription, setAdditionalDescription, setTotalAmount, setRetailer, setRetailerAddress];
                          setters[index](e.target.value);
                        }}
                    />
                  </FormControl>
              ))}

              {documents.map((doc, index) => (
                  <FormControl key={index}>
                    <FormLabel fontSize='sm' fontWeight='500' color={textColor} mb='8px'>
                      Document {index + 1}<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Input
                        variant='auth'
                        fontSize='sm'
                        type='file'
                        mb='24px'
                        fontWeight='500'
                        size='lg'
                        onChange={(e) => handleDocumentChange(index, e)}
                    />
                  </FormControl>))}
              {/*<Button*/}
              {/*  fontSize='sm'*/}
              {/*  me='0px'*/}
              {/*  mb='26px'*/}
              {/*  py='15px'*/}
              {/*  h='50px'*/}
              {/*  borderRadius='16px'*/}
              {/*  bg={googleBg}*/}
              {/*  color={googleText}*/}
              {/*  fontWeight='500'*/}
              {/*  _hover={googleHover}*/}
              {/*  _active={googleActive}*/}
              {/*  _focus={googleActive}*/}
              {/*  onClick={handleSubmit}>*/}
              {/*  Distribute funds now*/}
              {/*</Button>*/}
                  <Button onClick={addDocument} colorScheme="blue" size="sm" mt="2" w='70%'>
          Add another document
        </Button>
      <Button type='submit' colorScheme="blue" size="md" mt="2" w='60%'>
        Submit
      </Button>
        </Flex>
        </form>

      </Box>
    </Flex>
  </Box>
  );
}