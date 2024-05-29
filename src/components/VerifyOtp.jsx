import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Link,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";

import { useState } from "react";
import { useSetRecoilState } from "recoil";
import authScreenAtom from "../atoms/authAtom";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";
import {useParams} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

export default function VerifyOtp() {
  const setUser = useSetRecoilState(userAtom);
	  const [loading, setLoading] = useState(false);
    const navigate= useNavigate();

  const {email}=useParams();

  const [inputs, setInputs] = useState({
    email: email,
    otp: "",
  });

  const showToast = useShowToast();
  const handleVerify = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      localStorage.setItem("user-threads", JSON.stringify(data));
      setUser(data);
      navigate('/');
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };
    
     
  return (
    <Stack minH={"80vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Verify your OTP</Heading>
          <FormControl isRequired>
            <FormLabel>Enter your otp</FormLabel>
            <Input type="text"
              value={inputs.otp}
								  
              onChange={(e) => setInputs((inputs) => ({ ...inputs, otp: e.target.value }))}/>
          </FormControl>

          <Stack spacing={6}>
            <Button
              loadingText="Logging in"
              size="lg"
              bg={useColorModeValue("gray.600", "gray.700")}
              color={"white"}
              _hover={{
                bg: useColorModeValue("gray.700", "gray.800"),
              }}
              onClick={handleVerify}
								  isLoading={loading}
            >
              SignUp
            </Button>
          </Stack>
        </Stack>
        </Flex>
    </Stack>
  );
}
