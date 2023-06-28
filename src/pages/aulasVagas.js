import React, { useEffect, useState } from 'react';
import { Image, Button, Box, Center, Text, FormControl, Pressable, Icon, VStack, Heading, HStack, ScrollView, AspectRatio, Stack, Divider, Actionsheet, useDisclose, Modal } from 'native-base'
import { useForm, Controller } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { Input } from '../components/input';
import { useNavigation } from '@react-navigation/native';
import { Link } from '@react-navigation/native';
import { SimpleLineIcons, Ionicons, AntDesign, FontAwesome5, Feather } from '@expo/vector-icons';
import { Turma } from '../components/cardTurma';
const Logo = require('../../assets/aulasLogo.png');
import AsyncStorage from '@react-native-async-storage/async-storage';

const LinearGradient = require('expo-linear-gradient').LinearGradient;

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

const schema = yup.object().shape({
  date: yup.string().required('a data da aula é obrigatória'),
  description: yup.string().required('a aula é obrigatória'),
});

export default function Turmas() {
  const [token, setToken] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [turmaCode, setCode] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [aulasvagas, setAulasVagas] = useState(null);
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
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  async function buscarAulasVagas() {
    try {
      const resposta = await fetch('https://api-aulas.onrender.com/api/classroom/get_dates/YP5EF6PUOI' + turmaCode, {
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
        setAulasVagas(resp)
        setIsLoading(false)

      }
    } catch (error) {
      alert(error.message)
    }
  }
  function cadastrarAulaVaga(data) {
    enviarDados(data)
    async function enviarDados(dados) {
      console.log(token)
      dados["code"] = turmaCode;
      console.log(dados)
      try {
        const resposta = await fetch('https://api-aulas.onrender.com/api/classroom/create_date', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authorization': token
          },
          body: JSON.stringify(dados)
        })
        console.log(resposta)
        if (resposta.status === 200) {
          alert('Aula vaga cadastrada!')
          console.log(dados)
          buscarAulasVagas()
          setShowModal(false)
        } else {
          alert('erro ao cadastar aula vaga!')
          console.log('Erro ao cadastrar aula vaga')
        }
      } catch (erro) {
        console.log(erro)
      }
    }
  }
  if (aulasvagas == null) {
    buscarAulasVagas()
  }
//   if (isLoading) {
//     // Renderizar indicador de carregamento ou null enquanto o valor está sendo buscado
//     return null;
// }
  return (
    <VStack config={config} safeArea flex={1}>
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

              console.log('Done')
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
      {/* {turmas.map((turma, index) => (
          <Turma key={index} color1={turma.color1} color2={turma.color2} title={turma.title} />
        ))} */}
      </ScrollView>
      <AntDesign onPress={() => setShowModal(true)} right={20} bottom={20} position={'absolute'} name="pluscircle" size={60} color="#0891b2" />
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Cadastrar aula vaga</Modal.Header>
          <Modal.Body>
            Preencha os dados da aula vaga.
             <FormControl name="dia">
              <FormControl.Label>dia</FormControl.Label>
            </FormControl>
            <Controller
              control={control}
              name="date"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Digite o dia da aula vaga"
                  errorMessage={errors.date?.message}
                  onChangeText={onChange} />
              )}
            />
            <Controller
              control={control}
              name="description"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Digite o horário da aula vaga"
                  errorMessage={errors.description?.message}
                  onChangeText={onChange} />
              )}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
                setShowModalCriar(false);
              }}>
                Cancel
              </Button>
              <Button onPress={handleSubmit(cadastrarAulaVaga)}>
                Criar
              </Button>

            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </VStack>
  );
}