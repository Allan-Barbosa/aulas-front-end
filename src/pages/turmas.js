import React from 'react'
import { useState } from "react";
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


const LinearGradient = require('expo-linear-gradient').LinearGradient;

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

export default function Turmas() {
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  const [showModalCriar, setShowModalCriar] = useState(false);
  const [showModalEntrar, setShowModalEntrar] = useState(false);
  return (
      <VStack config={config} safeArea flex={1}>
        <Box borderBottomWidth={'1px'} flexDirection={'row'} justifyContent={'space-around'} alignItems={'center'} h="89.8px" borderBottomColor='#D8D8D8'>
          <SimpleLineIcons name="logout" size={30} color="black" />
          <Box flexDirection={'row'} alignItems={'center'}>
            <Image size="59px" borderRadius={119} source={Logo} alt="Logo do aplicativo" />
            <Text ml='5px' fontSize='20px' fontWeight='normal' color='#1C1C1E' fontFamily='sans-serif-medium'>AULAS</Text>
          </Box>
          <Ionicons name="notifications-circle-outline" size={34} color="black" />
        </Box>
        <ScrollView>
          <Turma color1="red.400" color2="red.700" title="Análise e desenvolvimento de sistemas - módulo 1"></Turma>
          <Turma color1="blue.400" color2="lightBlue.700" title="Análise e desenvolvimento de sistemas - módulo 2"></Turma>
          <Turma color1="green.400" color2="green.700" title="Análise e desenvolvimento de sistemas - módulo 4"></Turma>
          <Turma color1="yellow.400" color2="yellow.700" title="Análise e desenvolvimento de sistemas - módulo 5"></Turma>
          <Turma color1="violet.400" color2="violet.700" title="Física - módulo 2"></Turma>
          <Turma color1="orange.400" color2="orange.700" title="Física - módulo 3"></Turma>
          <Turma color1="teal.400" color2="teal.700" title="Física - módulo 4"></Turma>
        </ScrollView>
        <AntDesign onPress={onOpen} right={20} bottom={20} position={'absolute'}  name="pluscircle" size={60} color="#0891b2" />
        <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Divider borderColor="gray.300" />
          <Actionsheet.Item onPress={() => setShowModalCriar(true)} _text={{
          color: "blue.500"
        }}>
            Criar turma
          </Actionsheet.Item>
          <Divider borderColor="gray.300" />
          <Actionsheet.Item  onPress={() => setShowModalEntrar(true)} _text={{
          color: "blue.500"
        }}>
            Entrar na turma
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
      <Modal isOpen={showModalCriar} onClose={() => setShowModalCriar(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Criar turma</Modal.Header>
          <Modal.Body>
          Digite o nome da turma que será criada.
            <FormControl name="nomeTurma">
              <FormControl.Label isRequired>Nome da turma</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Disciplina lecionada na turma</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModalCriar(false);
            }}>
                Cancel
              </Button>
              <Button onPress={() => {
              const usuario = {
                email: "emailCadastro.value",
                senha: "senha1Cadastro.value"
            }
            console.log(usuario)
            }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Modal isOpen={showModalEntrar} onClose={() => setShowModalEntrar(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Entrar em turma</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              setShowModalEntrar(false);
            }}>
                Cancel
              </Button>
              <Button onPress={() => {
              setShowModalEntrar(false);
            }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      </VStack>
      );
}