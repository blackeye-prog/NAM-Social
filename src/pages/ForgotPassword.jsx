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

  import authScreenAtom from "../atoms/authAtom";
  import useShowToast from "../hooks/useShowToast";
  import userAtom from "../atoms/userAtom";
  import {useParams} from 'react-router-dom'
  import {useNavigate} from 'react-router-dom'
  
  export default function ForgotPassword() {
   
        const [loading, setLoading] = useState(false);
      const navigate= useNavigate();
  
    
  
      const [inputs, setInputs] = useState({
        email:""
        
      })
  
    const showToast = useShowToast();
    const handleOtp = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users/forgotOtp", {
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
       
        showToast("Success", data, "success");
        navigate(`/resetPassword/${inputs?.email}`);
       
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
            <Heading fontSize={"2xl"}>Forgot Password</Heading>
            <FormControl isRequired>
              <FormLabel>Enter your email</FormLabel>
              <Input type="text"
                value={inputs.email}
                                    
                onChange={(e) => setInputs({email:e.target.value})}/>
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
                onClick={handleOtp}
                                    isLoading={loading}
              >
                Send Otp
              </Button>
            </Stack>
          </Stack>
          </Flex>
      </Stack>
    );
  }
  