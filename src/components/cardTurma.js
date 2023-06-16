import React from 'react';
import { Box, Center, NativeBaseProvider, Text } from 'native-base';

const LinearGradient = require('expo-linear-gradient').LinearGradient;

export function Turma({ title, color1, color2, ...rest }) {
  return (
    <NativeBaseProvider config={config}>
       <Center flex={1} px="3">
  <Box bg={{
    linearGradient: {
      colors: [color1, color2],
      start: [0, 0],
      end: [1, 0]
    }
  }} p="12" rounded="xl"
  width={375}
  height={160}
  mt={2}>
    <Text
      fontSize={'md'}
      fontWeight={'medium'}
      color={'warmGray.50'}
      textAlign={'center'}>
      {title}
    </Text>
    
  </Box>
  </Center>
  </NativeBaseProvider>)
};

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};
