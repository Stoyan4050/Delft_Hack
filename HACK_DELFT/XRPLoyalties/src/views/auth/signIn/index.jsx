/* eslint-disable */
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
import { useState } from "react";
import React from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import XRPLBanner from "components/icons/XRPLoyalties - Banner-cut.png";
import { FcGoogle } from "react-icons/fc";
import GemWalletIcon from "components/icons/gem1.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { isConnected, getAddress, getNetwork, getPublicKey } from "@gemwallet/api";
import axios from 'axios';

function SignIn() {

  // Gem Wallet
  const [flag, setCount] = useState(0);


  const connect = async (fl) => {
    const hasWallet = await isConnected();
    if (hasWallet) {
      const responsePublicKey = await getPublicKey();
      if (responsePublicKey) {
        const { address, publicKey } = responsePublicKey;
        const backendUrl = 'http://127.0.0.1:8000/api/addressPK/'; // Replace with your Django backend URL and endpoint

        if (fl == 0){
          window.open("/rtl/rtl-default#/rtl/rtl-default", "_self");
        }else{
          window.open("/admin/default", "_self");
        }
        // console.log(address)
        // console.log(publicKey)

        axios.post(backendUrl, { address, publicKey })
        .then(response => {
          console.log('Data sent successfully:', response.data);
        })
        .catch(error => {
          console.error('Error sending data:', error);
        });
      }
    } else {
      alert(
        "User doesn't have GemWallet! Please install it: https://gemwallet.app"
      );
    }

  };

  const handleCountClick = () => {
    setCount(flag + 1);
    connect(flag)
  };


  // Chakra color mode
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
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%"}}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "70px", md: "100px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Sign In
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Sign In with just one click with GemWallet now!
          </Text>
        </Box>
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
            onClick={connect}>
            <img src={GemWalletIcon} style={{width: '10%', height: '190%', display: 'block', margin: '10px'}}/>
            {/* <Icon as={GemWalletIcon} w='40px' h='40px' me='20px' /> */}
            Sign In as an artist
          </Button>
          <Flex align='center' mb='25px'>
            <HSeparator />
            <Text color='gray.400' mx='14px'>
              or
            </Text>
            <HSeparator />
          </Flex>
          <Button
          
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              w='100%'
              h='50'
              mb='24px'
              onClick={handleCountClick}
              >
              <img src={GemWalletIcon} style={{width: '10%', height: '80%', display: 'block', margin: '10px'}}/>
              Sign In as a Royalty collector
            </Button>
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='start'
            maxW='100%'
            mt='0px'>
            <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
              Do not have a GemWallet?
              <a href="https://gemwallet.app/">
              {/* <Link to={{pathname:'https://gemwallet.app/'}} target="_blank"> */}
                <Text
                  color={textColorBrand}
                  as='span'
                  ms='5px'
                  fontWeight='500'>
                  Join GemWallet now!
                </Text>
                </a>
              {/* </Link> */}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
