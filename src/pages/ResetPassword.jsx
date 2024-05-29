

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
	HStack,
	Box
  } from '@chakra-ui/react'
  
  import { useState } from "react";
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
  import { useSetRecoilState } from "recoil";
  import authScreenAtom from "../atoms/authAtom";
  import useShowToast from "../hooks/useShowToast";
  import userAtom from "../atoms/userAtom";
  import {useNavigate, useParams} from 'react-router-dom'
  
  
  
  
  export default function SignupCard() {
      const navigate= useNavigate();
	  
	  const setAuthScreen = useSetRecoilState(authScreenAtom);
    

  const {email}=useParams();
	  const [inputs, setInputs] = useState({
		
		  
		  email:email,
      otp:"",
		  password: "",
      cPassword:""
	  });
      
	  const showToast = useShowToast();
	  const setUser = useSetRecoilState(userAtom);
  
	  const handleResetPassword = async () => {
		  try {
			  const res = await fetch("/api/users/verifyForgot", {
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
        navigate('/');
			
		  } catch (error) {
			  showToast("Error", error, "error");
		  }
	  };
  
	return (
	  <Stack minH={'80vh'} direction={{ base: 'column', md: 'row' }}>
		<Flex p={8} flex={1} align={'center'} justify={'center'}>
		  <Stack spacing={4} w={'full'} maxW={'md'}>
			<Heading fontSize={'2xl'}>Reset Password</Heading>
			
							  
								  <FormControl isRequired>
									  <FormLabel>Enter your Otp</FormLabel>
									  <Input
										  type='text'
										  onChange={(e) => setInputs({ ...inputs, otp: e.target.value })}
										  value={inputs.otp}
									  />
								  </FormControl>
							  
								  <FormControl isRequired>
									  <FormLabel>Enter your new Password</FormLabel>
									  <Input
										  type='text'
										  onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
										  value={inputs.password}
									  />
								  </FormControl>
							  
						  
						  <FormControl isRequired>
							  <FormLabel>Confirm your new Password</FormLabel>
							  <Input
								  type='text'
								  onChange={(e) => setInputs({ ...inputs, cPassword: e.target.value })}
								  value={inputs.cPassword}
							  />
						  </FormControl>
						  
			<Stack spacing={6}>
			  
			<Button
								  loadingText='Submitting'
								  size='lg'
								  bg={useColorModeValue("gray.600", "gray.700")}
								  color={"white"}
								  _hover={{
									  bg: useColorModeValue("gray.700", "gray.800"),
								  }}
								  onClick={handleResetPassword}
							  >
								  Reset Password
							  </Button>
			</Stack>
			
		  </Stack>
		</Flex>
		
	  </Stack>
	)
  }