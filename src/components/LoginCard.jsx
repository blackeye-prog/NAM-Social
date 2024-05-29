

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
  } from '@chakra-ui/react'
  import { Link as RouterLink } from "react-router-dom";
  
  import { useState } from "react";
  import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
  import { useSetRecoilState } from "recoil";
  import authScreenAtom from "../atoms/authAtom";
  import useShowToast from "../hooks/useShowToast";
  import userAtom from "../atoms/userAtom";
  
  
  
  export default function LoginCard() {
  
	  const [showPassword, setShowPassword] = useState(false);
	  const setAuthScreen = useSetRecoilState(authScreenAtom);
	  const setUser = useSetRecoilState(userAtom);
	  const [loading, setLoading] = useState(false);
  
	  const [inputs, setInputs] = useState({
		  username: "",
		  password: "",
	  });
	  const showToast = useShowToast();
	  const handleLogin = async () => {
		  setLoading(true);
		  try {
			  const res = await fetch("/api/users/login", {
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
		  } catch (error) {
			  showToast("Error", error, "error");
		  } finally {
			  setLoading(false);
		  }
	  };
	return (
	  <Stack minH={'80vh'} direction={{ base: 'column', md: 'row' }}>
		<Flex p={8} flex={1} align={'center'} justify={'center'}>
		  <Stack spacing={4} w={'full'} maxW={'md'}>
			<Heading fontSize={'2xl'}>Log  in to your account</Heading>
			<FormControl  isRequired>
							  <FormLabel>Username</FormLabel>
							  <Input
						  
								  type='text'
								  value={inputs.username}
								  
								  onChange={(e) => setInputs((inputs) => ({ ...inputs, username: e.target.value }))}
							  />
						  </FormControl>
						  <FormControl isRequired>
							  <FormLabel>Password</FormLabel>
							  <InputGroup>
								  <Input
									  type={showPassword ? "text" : "password"}
									  value={inputs.password}
									  
									  
									  onChange={(e) => setInputs((inputs) => ({ ...inputs, password: e.target.value }))}
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
								  loadingText='Logging in'
								  size='lg'
								  bg={useColorModeValue("gray.600", "gray.700")}
								  color={"white"}
								  _hover={{
									  bg: useColorModeValue("gray.700", "gray.800"),
								  }}
								  onClick={handleLogin}
								  isLoading={loading}
							  >
								  Login
							  </Button>
			</Stack>
			<Stack pt={6}>
							  <Text align={"center"}>
								  Don&apos;t have an account?{" "}
								  <Link color={"blue.400"} onClick={() => setAuthScreen("signup")}>
									  Sign up
								  </Link>
							  </Text>
						  </Stack>
						  <Stack pt={6}>
							  <Text align={"center"}>
								  
								  <Link color={"blue.400"} as={RouterLink} to={`/forgotPassword`} >
									 Forgot Password
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