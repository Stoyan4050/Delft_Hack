// Chakra imports
import { Avatar, Box, Flex, Text, useColorModeValue, Button} from "@chakra-ui/react";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Card from "components/card/Card.js";
import React from "react";

export default function Banner(props) {
  const { banner, avatar, name, job, posts, followers, following } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const borderColor = useColorModeValue(
    "white !important",
    "#111C44 !important"
  );
  
  const handleSubmit = async (event) => {
    alert(
      "The royalties have been sent to your wallet!"
    );
  };

  return (
    <Card mb={{base: "0px", lg: "20px" }} align='center' w='100%'>
      <Box
        bg={`url(${banner})`}
        bgSize='cover'
        borderRadius='16px'
        h='131px'
        w='100%'
      />
      <Avatar
        mx='auto'
        src={Avatar1}
        h='87px'
        w='87px'
        mt='-43px'
        border='4px solid'
        borderColor={borderColor}
      />
      <Text color={textColorPrimary} fontWeight='bold' fontSize='xl' mt='10px'>
        {name}
      </Text>
      <Text color={textColorSecondary} fontSize='sm'>
        {job}
      </Text>
      <Flex w='max-content' mx='auto' mt='26px'>
        <Flex mx='auto' me='60px' align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {posts}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Songs
          </Text>
        </Flex>
        <Flex mx='auto' me='60px' align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {followers}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Followers
          </Text>
        </Flex>
        <Flex mx='auto' align='center' direction='column'>
          <Text color={textColorPrimary} fontSize='2xl' fontWeight='700'>
            {following}
          </Text>
          <Text color={textColorSecondary} fontSize='sm' fontWeight='400'>
            Following
          </Text>
        </Flex>
      </Flex>

      <Flex mx='auto' me='35px' align='center' direction='column'>
      <Button
          me='100%'
          mb='10px'
          w='140px'
          minW='300px'
          mt={{ base: "100px", "2xl": "auto" }}
          variant='brand'
          fontWeight='500'
          fontSize="2xl"
          onClick={handleSubmit}>
            Collect Royalties
        </Button>
        </Flex>
    </Card>
  );
}
