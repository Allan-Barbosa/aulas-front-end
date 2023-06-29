import React from 'react';
import { Box, Pressable, Center, NativeBaseProvider, Text } from 'native-base';
import { Button } from './button';

const LinearGradient = require('expo-linear-gradient').LinearGradient;



const config = {
    dependencies: {
      'linear-gradient': LinearGradient
    }
  };

export function Turma({ title, date, description, color1, color2, id, token, substituteTeacherId, code, ...rest }) {
    let substituto = null
    if (substituteTeacherId){
        substituto = 'sim'
    }else{
        substituto = 'não'
    }
    async function substituirAula(token, id, code) {
        const dados = {
            "code": code,
            "date_id": id
        }
        try {
          const resposta = await fetch('https://api-aulas.onrender.com/api/classroom/replace_teacher', {
            method: 'PATCH',
            headers: {
              Accept: 'application/json',
              'Content-type': 'application/json',
              'authorization': token
            },
            body: JSON.stringify(dados)
          })
          if (resposta.status === 200) {
            alert('aula vaga substituída')
            Linking.reload();
          }
        } catch (error) {
          alert(error.message)
        }
      }
    const formattedDate = date.split("T")[0];
  return (
    <NativeBaseProvider  config={config}>
      <Center flex={1} px="3">
        <Pressable onPress={rest.onPress}>
          <Box
            bg={{
              linearGradient: {
                colors: [color1, color2],
                start: [0, 0],
                end: [1, 0]
              }
            }}
            rounded="xl"
            width={250}
            height={160}
            mt={2}
            justifyContent={'center'}
            alignItems={'center'}
            shadow="9"
            {...rest}
          >
            <Text fontSize="md" fontWeight="medium" color="warmGray.50" textAlign="center">
              {title}
            </Text>
            <Text fontSize="sm" color="warmGray.50" textAlign="center" mt={1}>
              {formattedDate}
            </Text>
            <Text fontSize="sm" color="warmGray.50" textAlign="center" mt={1}>
              {description}
            </Text>
            <Text fontSize="sm" color="warmGray.50" textAlign="center" mt={1}>
              substituto: {substituto}
            </Text>
          </Box>
        </Pressable>
      </Center>
    </NativeBaseProvider>
  );
}
