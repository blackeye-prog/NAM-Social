

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
  import {useNavigate} from 'react-router-dom'
  
  
  
  
  export default function SignupCard() {
      const navigate= useNavigate();
	  const [showPassword, setShowPassword] = useState(false);
	  const setAuthScreen = useSetRecoilState(authScreenAtom);
	  const [inputs, setInputs] = useState({
		  name: "",
		  username: "",
		  email: "",
		  password: "",
	  });
      
	  const showToast = useShowToast();
	  const setUser = useSetRecoilState(userAtom);
  
	  const handleSignup = async () => {
		  try {
			  const res = await fetch("/api/users/signup", {
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
  
			 
			 
			 navigate(`/verify/${data?.email}`);
		  } catch (error) {
			  showToast("Error", error, "error");
		  }
	  };
  
	return (
	  <Stack minH={'80vh'} direction={{ base: 'column', md: 'row' }}>
		<Flex p={8} flex={1} align={'center'} justify={'center'}>
		  <Stack spacing={4} w={'full'} maxW={'md'}>
			<Heading fontSize={'2xl'}>Log  in to your account</Heading>
			<HStack>
							  <Box>
								  <FormControl isRequired>
									  <FormLabel>Full name</FormLabel>
									  <Input
										  type='text'
										  onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
										  value={inputs.name}
									  />
								  </FormControl>
							  </Box>
							  <Box>
								  <FormControl isRequired>
									  <FormLabel>Username</FormLabel>
									  <Input
										  type='text'
										  onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
										  value={inputs.username}
									  />
								  </FormControl>
							  </Box>
						  </HStack>
						  <FormControl isRequired>
							  <FormLabel>Email address</FormLabel>
							  <Input
								  type='email'
								  onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
								  value={inputs.email}
							  />
						  </FormControl>
						  <FormControl isRequired>
							  <FormLabel>Password</FormLabel>
							  <InputGroup>
								  <Input
									  type={showPassword ? "text" : "password"}
									  onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
									  value={inputs.password}
								  />
								  <InputRightElement h={"full"}>
									  <Button
										  variant={"ghost"}
										  onClick={() => setShowPassword((showPassword) => !showPassword)}
									  >
										  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
									  </Button>
								  </InputRightElement>
							  </InputGroup>
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
								  onClick={handleSignup}
							  >
								  Send OTP
							  </Button>
			</Stack>
			<Stack pt={6}>
			<Text align={"center"}>
								  Already a user?{" "}
								  <Link color={"blue.400"} onClick={() => setAuthScreen("login")}>
									  Login
								  </Link>
							  </Text>
						  </Stack>
		  </Stack>
		</Flex>
		<Flex flex={1}>
		  <Image
			alt={'Login Image'}
			objectFit={'cover'}
			borderRadius={"sm"}
			src={
			  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
			}
		  />
		</Flex>
	  </Stack>
	)
  }