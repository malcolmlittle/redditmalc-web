import React from 'react'
import { Formik } from "formik";
import { Box, Button, FormControl, /*FormErrorMessage,*/ FormLabel, Input } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from "../components/inputField";
import { useMutation } from 'urql';

interface registerProps {

}

const REGISTER_MUT = `mutation Register($username: String!, $password: String!) {
    register(options: {username: $username, password: $password}) {
      errors {
        field
        message
      }
      user {
        id
        username
      }
    }
  }
  `

const Register: React.FC<registerProps> = ({}) => {
    const [{}, register] = useMutation(REGISTER_MUT)
    return (
        <Wrapper variant='small'>
            <Formik
                initialValues={{username: "", password: ""}}
                onSubmit={(values) => {
                    register(values);
                }}
            >
                {({ isSubmitting }) => (
                    <form>
                        <InputField
                            name='username' 
                            placeholder='username' 
                            label='Username'
                        />
                        <Box mt={4}>
                            <InputField 
                                name='password' 
                                placeholder='password' 
                                label='Password' 
                                type='password' 
                            />
                        </Box>
                        <Button 
                            mt={4}
                            type='submit'
                            isLoading={isSubmitting}
                            color='teal'
                        >
                            register
                        </Button>
                    </form>
                )}
            </Formik>
        </Wrapper>
    );
}

export default Register