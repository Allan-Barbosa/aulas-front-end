import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Image, Button, Box, Center, Text, FormControl, Pressable, Icon, VStack, Heading, HStack, ScrollView, AspectRatio, Stack, Divider, Actionsheet, useDisclose, Modal } from 'native-base'
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { Input } from '../components/input';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { Turma } from '../components/cardTurma';
const Logo = require('../../assets/aulasLogo.png');
import AsyncStorage from '@react-native-async-storage/async-storage';

const schema = yup.object().shape({
  dia: yup.in().required('Informe a data').email('E-mail inválido'),

});

export default function Turmas() {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [usersTurma, setUsersTurmas] = useState(null);
  const [administradores, setAdministradores] = useState(null);
  const [professores, setProfessores] = useState(null);
  const [participantes, setParticipantes] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [turmaCode, setCode] = useState(null);
  useEffect(() => {
    const getMyStringValue = async () => {
      try {
        let value = await AsyncStorage.getItem('token');
        if (value !== null) {
          setToken(value);
        }
        value = await AsyncStorage.getItem('turma-code');
        if (value !== null) {
          setCode(value);
        }
      } catch (error) {
        // Error reading data
      }
    };
    getMyStringValue();
  }, []);
  const navigation = useNavigation();
  async function buscarUsers() {
    try {
      const resposta = await fetch('https://api-aulas.onrender.com/api/classroom/get_members/' + turmaCode, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
          'authorization': token
        },
      }
      )
      if (resposta.status === 200) {
        const resp = await resposta.json();
        setUsersTurmas(resp)
        setAdministradores(resp.administrators)
        setProfessores(resp.teachers)
        setParticipantes(resp.participants)
        setIsLoading(false)

      }
    } catch (error) {
      alert(error.message)
    }
  }
  if (usersTurma == null) {
    buscarUsers()
  }
  const users = usersTurma
  if (isLoading) {
    // Renderizar indicador de carregamento ou null enquanto o valor está sendo buscado
    return null;
  }
  return (
    <VStack safeArea flex={1}>
      <Box borderBottomWidth={'1px'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'} h="89.8px" borderBottomColor='#D8D8D8'>
        <Feather
          onPress={() => {
            removeFew = async () => {
              const keys = ['turma-code', 'turma-id', 'turm-name']
              try {
                await AsyncStorage.multiRemove(keys)
              } catch (e) {
                // remove error
              }
            }
            removeFew()
            navigation.navigate('turmas1')
          }}
          name="arrow-left-circle" size={30} color="black" />
        <Box flexDirection={'row'} alignItems={'center'}>
          <Image size="59px" borderRadius={119} source={Logo} alt="Logo do aplicativo" />
          <Text ml='5px' fontSize='20px' fontWeight='normal' color='#1C1C1E' fontFamily='sans-serif-medium'>AULAS</Text>
        </Box>
        <Ionicons name="notifications-circle-outline" size={34} color="black" />
      </Box>
      <ScrollView>
        <Box alignItems={'center'}>
          <Text my={5} fontSize={20} color='gray.500' fontWeight="semibold">Código da turma: {turmaCode}</Text>
          <FormControl name="adUserEmail">
            <FormControl.Label>Adicionar usuário por email</FormControl.Label>
          </FormControl>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <Input
                placeholder="Digite o email do usuário"
                errorMessage={errors.email?.message}
                onChangeText={onChange} />
            )}
          />
        </Box>
       
  {/* listagem de administradores
  <View>
    <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>Administrators</Text>
    {administradores.map((user, index) => (
      <Text key={index.toString()}>{user}</Text>
    ))}
  </View>

  {/* listagem de professores */}
  {/* <View>
    <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>Teachers</Text>
    {professores.map((user, index) => (
      <Text key={index.toString()}>{user}</Text>
    ))}
  </View> */}

  {/* listagem de participantes */}
  {/* <View>
    <Text style={{ fontWeight: 'bold', marginBottom: 2 }}>Participants</Text>
    {participantes.map((user, index) => (
      <Text key={index.toString()}>{user}</Text>
    ))}
  </View> */} 

      </ScrollView>
    </VStack>
  );
}