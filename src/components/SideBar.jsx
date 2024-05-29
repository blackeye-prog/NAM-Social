import React from "react";
import { Box, Flex, Image, Text, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const SideBar = () => {
  return (
    <>
      <Text mb={4} fontWeight={"bold"}>
        Sponserd Adds
      </Text>
      <Flex gap={2} mb={3} p={2} direction={"column"} alignItems={"center"}>
        {/* left side */}
        <Image src="/goel.jpeg" borderRadius={"xl"} alt="goel" />
        {/* right side */}
        <Text fontSize={"md"} fontWeight={"semibold"}>
          Get admission in best Institute{" "}
          <Link
            color={"blue.400"}
            target="blank"
            as={RouterLink}
            to="https://goel.edu.in/"
          >
            click here
          </Link>
        </Text>
      </Flex>
      <Flex gap={2} mb={3} p={2} direction={"column"} alignItems={"center"}>
        {/* left side */}
        <Image src="/flipkart.avif" borderRadius={"xl"} alt="goel" />
        {/* right side */}
        <Text fontSize={"md"} fontWeight={"semibold"}>
          Get amazing offer on big billion days{" "}
          <Link
            color={"blue.400"}
            target="blank"
            as={RouterLink}
            to="https://www.flipkart.com/"
          >
            click here
          </Link>
        </Text>
      </Flex>
    </>
  );
};

export default SideBar;
