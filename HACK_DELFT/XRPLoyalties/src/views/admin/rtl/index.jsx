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
import { isConnected, getAddress, getNetwork, getPublicKey } from "@gemwallet/api";


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
  const connect = async () => {
    const hasWallet = await isConnected();
    if (hasWallet) {
      const responsePublicKey = await getPublicKey();
      if (responsePublicKey) {
        setAddress();
        const { address, publicKey } = responsePublicKey;
        window.open("/admin/default", "_self");
      }
    } else {
      alert(
        "User doesn't have GemWallet! Please install it: https://gemwallet.app"
      );
    }
  };


  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "GBP", name: "British Pound" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "AUD", name: "Australian Dollar" },
  ];

  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [song, setSong] = useState("");
  const [address, setAddress] = useState("");

  const handleDropdownChangeSong = (event) => {
    setSong(event.target.value);
  };

  const handleDropdownChangeCurrency = (event) => {
    setCurrency(event.target.value);
  };

  const handleAmountInput = (event) => {
    setAmount(event.target.value);
  };

  const handleDistributeFunds = (event) => {
    setAddress(event.target.value);
  }

  const handleSubmit = async (event) => {
    console.log("Submitted values: ", amount, currency, song);

    alert(`You submitted: ${amount} ${currency} to the song: ${song}`);
  };

  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap='20px'
        mb='20px'>
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdBarChart} color={brandColor} />
              }
            />
          }
          name='Percentage of earnings/ royalties'
          value='10%~'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name='Total earnings'
          value='$12,642.39'
        />
        <MiniStatistics growth='increase 3%' name='Total royalties collected' value='$120,642.39' />
        <MiniStatistics
          endContent={
            <Flex me='-16px' mt='10px'>
              <FormLabel htmlFor='balance'>
                <Avatar src={Usa} />
              </FormLabel>
              <Select
                id='balance'
                variant='transparent'
                mt='5px'
                me='0px'
                >
                <option value='usd'>USD</option>
                <option value='eur'>EUR</option>
                <option value='gbp'>GBP</option>
                <option value='usd'>JPY</option>
                <option value='eur'>AUD</option>
                <option value='gba'>CAD</option>
              </Select>
            </Flex>
          }
          name='Royalties to distribute'
          value='$18,653.45'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
              icon={<Icon w='28px' h='28px' as={MdPersonAdd} color='white' />}
            />
          }
          name='New Artists'
          value='5'
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name='Total Projects'
          value='10935'
        />
        <MiniCalendar h='90%' w='80%' minW='80%' selectRange={false} />


      <Box  align='center'  mb='10px'>
        
      <Heading color={textColor} fontSize='36px' mb='10px' align='center'>
            Distribute funds
        </Heading>
      <Flex
        zIndex='2'
        direction='column'
        w={{ base: "100%", md: "420px" }}
        maxW='100%'
        background='transparent'
        borderRadius='15px'
        mx={{ base: "auto", lg: "unset" }}
        me='auto'
        mb={{ base: "20px", md: "auto" }}>

          <FormControl>
            <FormLabel
              noValidate
              isRequired={true}
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'
              >
              Amount<Text color={brandStars}>*</Text>

            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='number'
              placeholder='min:100'
              mb='24px'
              fontWeight='500'
              size='lg'
              value={amount}
              onChange={handleAmountInput}
            />
              <Select
              isRequired={true}
              variant="subtle"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              placeholder="Select a currency"
              mb="24px"
              fontWeight="500"
              size="lg"
              value={currency}
              onChange={handleDropdownChangeCurrency}
            >
              {currencies.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.name} ({currency.code})
                </option>
              ))}
            </Select>

            <Select
              isRequired={true}
              variant="transparent"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              placeholder="Select a song"
              mb="24px"
              fontWeight="500"
              size="lg"
              value={song}
              onChange={handleDropdownChangeSong}
              required='true'
            >
              <option value="I love London">I love London</option>
              <option value="I love Paris">I love Paris</option>
              <option value="Never gonna give you up">Never gonna give you up</option>
            </Select>
                
          </FormControl> 

          <Button
            fontSize='sm'
            me='0px'
            mb='26px'
            py='15px'
            h='50px'
            borderRadius='16px'
            bg={googleBg}
            color={googleText}
            fontWeight='500'
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}
            onClick={handleSubmit}>
            Distribute funds now
          </Button>
        </Flex>
        </Box>
        <Tasks w='80%' h='90%' style={{pisition: 'relative', left: '-20%'}}/>
        </SimpleGrid>

      </Box>
  );
}
