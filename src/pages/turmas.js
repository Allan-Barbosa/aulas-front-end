import React, { useEffect, useState } from 'react';
import { Image, Button, Box, Center, Text, FormControl, Pressable, Icon, VStack, Heading, HStack, ScrollView, AspectRatio, Stack, Divider, Actionsheet, useDisclose, Modal } from 'native-base'
import { useForm, Controller } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { Input } from '../components/input';
import { useNavigation } from '@react-navigation/native';
import { Link } from '@react-navigation/native';
import { SimpleLineIcons, Ionicons, AntDesign } from '@expo/vector-icons';
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
  name: yup.string().required('Nome da turma é obrigatório').min(4, 'Nome da turma deve ter pelo menos 4 caracteres'),
});

const schemaCode = yup.object().shape({
  codigoTurma: yup.string().required('Código da turma é obrigatório'),
});

export default function Turmas() {
  const [userTurmas, setTurmas] = useState(null);
  const [token, setToken] = useState(null);
  const [hasLoadedTurmas, setHasLoadedTurmas] = useState(false);

  useEffect(() => {
    if (!hasLoadedTurmas) {
      buscarTurma();
      setHasLoadedTurmas(true);
    }
  }, [hasLoadedTurmas]);

  useEffect(() => {
    const getMyStringValue = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          setToken(value);
        }
      } catch (error) {
        // Error reading data
      }
    };
    getMyStringValue();
  }, []);

  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  const [showModalCriar, setShowModalCriar] = useState(false);
  const [showModalEntrar, setShowModalEntrar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const {
    control: controlCode,
    handleSubmit: handleSubmitCode,
    formState: { errors: errorsCode },
  } = useForm({
    resolver: yupResolver(schemaCode),
  });

  const handleCloseModalCriar = () => {
    setShowModalCriar(false);
    onClose(); // Fechar o Actionsheet (menu)
  };

  const handleCloseModalEntrar = () => {
    setShowModalEntrar(false);
    onClose(); // Fechar o Actionsheet (menu)
  };

  function criarTurma(data) {
    enviarDados(data)
    async function enviarDados(dados) {
      dados["token"] = token;
      try {
        const resposta = await fetch('https://api-aulas.onrender.com/api/classroom/create', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authorization': token
          },
          body: JSON.stringify(dados)
        })
        if (resposta.status === 200) {
          alert('Turma criada!')
          buscarTurma()
          handleCloseModalCriar()
        } else {
          alert('Nome já existe!')
          console.log('Erro ao criar turma')
        }
      } catch (erro) {
        console.log(erro)
      }
    }
  }
  function entrarTurma(data) {
    enviarDados(data)
    async function enviarDados(dados) {
      try {
        const resposta = await fetch('https://api-aulas.onrender.com/api/classroom/join/' + dados.codigoTurma, {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'authorization': token
          },
        })
        if (resposta.status === 200) {
          alert('Participando da turma!')
          buscarTurma()
          handleCloseModalEntrar()
        } else {
          alert('código inválido!')
          console.log('Erro ao entrar na turma')
        }
      } catch (erro) {
        console.log(erro)
      }
    }
  }
  async function buscarTurma() {
    try {
      const resposta = await fetch('https://api-aulas.onrender.com/api/classroom/show_user_classrooms', {
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
        setTurmas(resp)
        setIsLoading(false)
      }
    } catch (error) {
      alert(error.message)
    }
  }
  if (userTurmas == null) {
    buscarTurma()
  }
  if (isLoading) {
    // Renderizar indicador de carregamento ou null enquanto o valor está sendo buscado
    return null;
  }
 
  const turmas = userTurmas

  const colors = [
    "red.400",
    "blue.400",
    "green.400",
    "yellow.400",
    "violet.400",
    "orange.400",
    "teal.400",
  ];

  const colors2 = [
    "red.700",
    "blue.700",
    "green.700",
    "yellow.700",
    "violet.700",
    "orange.700",
    "teal.700",
  ];
  return (
    <VStack config={config} safeArea flex={1}>
      <Box borderBottomWidth={'1px'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'} h="89.8px" borderBottomColor='#D8D8D8'>
        <SimpleLineIcons
          onPress={() => {
            removeFew = async () => {
              const keys = ['token', 'level', 'acesso', 'name', 'id', 'email']
              try {
                await AsyncStorage.multiRemove(keys)
              } catch (e) {
                // remove error
              }

              console.log('Done')
            }
            removeFew()
            navigation.navigate('index')
          }}
          name="logout" size={30} color="black" />
        <Box flexDirection={'row'} alignItems={'center'}>
          <Image size="59px" borderRadius={119} source={Logo} alt="Logo do aplicativo" />
          <Text ml='5px' fontSize='20px' fontWeight='normal' color='#1C1C1E' fontFamily='sans-serif-medium'>AULAS</Text>
        </Box>
        <Ionicons name="notifications-circle-outline" size={34} color="black" />
      </Box>
      <ScrollView>
        {turmas.length === 0 ? (
          <Center><Text mt={200} fontSize={30} color={'gray.400'}>Não há turmas carregadas.</Text></Center>
        ) : (
          turmas.map((turma, index) => (
            <Turma
              key={index}
              color1={colors[index % colors.length]}
              color2={colors2[(index) % colors.length]}
              title={turma.name}
              onPress={() => {
                const _storeData = async (turma) => {
                  try {
                    await AsyncStorage.setItem(
                      'turma-code',
                      turma.code,
                    );
                    await AsyncStorage.setItem(
                      'turma-id',
                      turma.id,
                    );
                    await AsyncStorage.setItem(
                      'turma-name',
                      turma.name,
                    );
                  } catch (error) {
                    console.log(error)
                    // Error saving data
                  }
                }
                // const _retrieveData = async () => {
                //   try {
                //     let value = await AsyncStorage.getItem('turma-id');
                //     if (value !== null) {
                //       // We have data!!
                //       console.log(value);
                //     }
                //     value = await AsyncStorage.getItem('turma-code');
                //     if (value !== null) {
                //       // We have data!!
                //       console.log(value);
                //     }
                //     value = await AsyncStorage.getItem('turma-name');
                //     if (value !== null) {
                //       // We have data!!
                //       console.log(value);
                //     }
                //   } catch (error) {
                //     console.log(error)
                //     // Error retrieving data
                //   }
                // }
                _storeData(turma)
                // _retrieveData()
                navigation.navigate('turmas2')
              }}
            />
          ))
        )}
      </ScrollView>
      <AntDesign onPress={onOpen} right={20} bottom={20} position={'absolute'} name="pluscircle" size={60} color="#0891b2" />
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Divider borderColor="gray.300" />
          <Actionsheet.Item onPress={() => setShowModalCriar(true)} _text={{
            color: "blue.500"
          }}>
            Criar turma
          </Actionsheet.Item>
          <Divider borderColor="gray.300" />
          <Actionsheet.Item onPress={() => setShowModalEntrar(true)} _text={{
            color: "blue.500"
          }}>
            Entrar na turma
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <Modal isOpen={showModalCriar} onClose={() => handleCloseModalCriar()}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Criar turma</Modal.Header>
          <Modal.Body>
            Digite o nome da turma que será criada.
            <FormControl name="nomeTurma">
              <FormControl.Label>Nome da turma</FormControl.Label>
            </FormControl>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Digite o nome da turma"
                  errorMessage={errors.name?.message}
                  onChangeText={onChange} />
              )}
            />
            {/* <FormControl mt="3">
              <FormControl.Label>Disciplina lecionada na turma</FormControl.Label>
              <Input />
            </FormControl> */}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={handleCloseModalCriar}>
                Cancel
              </Button>
              <Button onPress={handleSubmit(criarTurma)}>
                Criar
              </Button>

            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal isOpen={showModalEntrar} onClose={() => handleCloseModalEntrar()}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Entrar em turma</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Código da turma</FormControl.Label>
            </FormControl>
            <Controller
              control={controlCode}
              name="codigoTurma"
              render={({ field: { onChange } }) => (
                <Input
                  placeholder="Digite o código da turma"
                  errorMessage={errorsCode.codigoTurma?.message}
                  onChangeText={onChange} />
              )}
            />
            {/* <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl> */}
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={handleCloseModalEntrar}>
                Cancel
              </Button>
              <Button onPress={handleSubmitCode(entrarTurma)}>
                Entrar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </VStack>
  );
}