import React, { useRef, useState, useEffect } from 'react';

import { Container } from '@chakra-ui/react'
import Card from '../components/contacter-nous/Card'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import * as Chakra from "@chakra-ui/react";




export default function Index() {

    const [messageState, setMessageState] = useState({
        messages: [], history: [],
    });
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState(undefined);
    const scope = { React };


    const { messages, history } = messageState;

    useEffect(() => {
        function getImportedComponents(htmlContent) {
            const importRegex = /import\s+\{\s*([\w\s,]+)\s*\}\s+from\s+['"]@chakra-ui\/react['"]/;
            const match = htmlContent.match(importRegex);
            if (match) {
                const importedComponents = match[1].split(",").map((name) => name.trim());
                return importedComponents;
            }
            return [];
        }

        if (code) {
            const importedComponents = getImportedComponents(code);
            importedComponents.forEach((name) => {
                scope[name] = (Chakra)[name];
            });
        }
    }, [code])

    useEffect(() => {
        window.addEventListener("message", (e) => {
            console.log(e.data, "================================");
            setCode(`import { Box, Button, Input } from "@chakra-ui/react";
    
            function LoginForm() {
              return (
                <Box
                  bg='#f5f5f5'
                  h='100vh'
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                >
                  <Box
                    bg='#fff'
                    p='32px'
                    borderRadius='4px'
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                  >
                    <h1>
                      Login
                    </h1>
                    <Input
                      type='text'
                      placeholder='Username or email'
                      p='8px 16px'
                      border='1px solid #ddd'
                      borderRadius='4px'
                      marginBottom='16px'
                      width='100%'
                      boxSizing='border-box'
                      fontSize='16px'
                    />
                    <Input
                      type='password'
                      placeholder='Password'
                      p='8px 16px'
                      border='1px solid #ddd'
                      borderRadius='4px'
                      marginBottom='16px'
                      width='100%'
                      boxSizing='border-box'
                      fontSize='16px'
                    />
                    <Button
                      bg='#1976d2'
                      color='#fff'
                      p='8px 16px'
                      border='none'
                      borderRadius='4px'
                      cursor='pointer'
                      fontSize='16px'
                    >
                      Log In
                    </Button>
                    <a href='#' style={{ color: '#1976d2', marginTop: '16px', fontSize: '14px' }}>
                      Forgot password?
                    </a>
                  </Box>
                </Box>
              );
            }
            
              `)
        });
    }, []);



    return (
        <Container
            mt={16}
            maxW='1200px'
            justify='center'
            align='center'
        >
            <LiveProvider code={code?.replace(/^import.*$/gm, "")} scope={scope}>
                <div>
                    {
                        code ?
                            <>
                                <LivePreview />
                                <LiveError />
                            </> : ""
                    }
                </div>
            </LiveProvider>
        </Container>
    )
}
