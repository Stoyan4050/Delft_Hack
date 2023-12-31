import React from "react";

// Chakra imports
import { Button, Flex, Link, Text } from "@chakra-ui/react";

// Assets
import banner from "assets/img/nfts/NftBanner1.jpg";

export default function Banner() {
  // Chakra Color Mode
  return (
    <Flex
      direction='column'
      bgImage={banner}
      bgSize='cover'
      py={{ base: "30px", md: "56px" }}
      px={{ base: "30px", md: "64px" }}
      borderRadius='30px'
        h="400px">
      <Text
        fontSize={{ base: "24px", md: "34px" }}
        color='white'
        mb='14px'
        maxW={{
          base: "100%",
          md: "74%",
          lg: "46%",
          xl: "80%",
          "2xl": "50%",
          "3xl": "42%",
        }}
        fontWeight='700'
        lineHeight={{ base: "32px", md: "42px" }}>
        Make the difference!
          Help now!
      </Text>
      <Text
        fontSize='md'
        color='#E3DAFF'
        maxW={{
          base: "100%",
          md: "44%",
          lg: "40%",
          xl: "56%",
          "2xl": "46%",
          "3xl": "34%",
        }}
        fontWeight='500'
        mb='40px'
        lineHeight='28px'

      >
      </Text>
      <Flex align='center'>
      <a href='https://open.spotify.com/'>
        {/*<Button*/}
        {/*  bg='white'*/}
        {/*  color='black'*/}
        {/*  _hover={{ bg: "whiteAlpha.900" }}*/}
        {/*  _active={{ bg: "white" }}*/}
        {/*  _focus={{ bg: "white" }}*/}
        {/*  fontWeight='500'*/}
        {/*  fontSize='14px'*/}
        {/*  py='20px'*/}
        {/*  px='27'*/}
        {/*  me='38px'>*/}
        {/*  */}
        {/*  <Text color='Black' fontSize='sm' fontWeight='500'>*/}
        {/*  Listen now!*/}
        {/*  </Text>*/}
        {/*</Button>*/}
        </a>
      </Flex>
    </Flex>
  );
}
