import React from 'react'
import { Image, Center, Text, FormControl, Pressable, Icon, VStack, Heading, HStack, ScrollView } from 'native-base'
import { useForm, Controller } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { Input } from '../components/input';
import { Button } from '../components/button';
import { useNavigation } from '@react-navigation/native';
import { Link } from '@react-navigation/native';
import fetch from 'node-fetch';
import {AsyncStorage} from 'react-native';
const Logo = require('../../assets/aulasLogo.png');

const signInSchema = yup.object({
    email: yup.string().required('Informe o email').email('E-mail inválido'),
    senha: yup.string().required('Informe a senha').min(8, 'A senha deve ter pelo menos 8 caracteres'),
});

export default function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signInSchema)
    });
    const navigation = useNavigation();
    const [show, setShow] = React.useState(false);
    function handleSignIn(data) {
        console.log(data)
        // enviarDados(data)
        //   async function enviarDados(dados) {
        //     try {
        //         const resposta = await fetch('', {
        //             method: 'POST',
        //             headers: {
        //               Accept: 'application/json',
        //               'Content-type': 'application/json'
        //             },
        //             body: JSON.stringify(dados)
        //           }
        //         )
        //         if (resposta.status === 200) {
        //           if (resposta.aluno != -1) {
        //             const resposta = await resp.json();
        //             const token = await JSON.parse(atob(resposta.token.split('.')[1]));
        //             localStorage.setItem("token", JSON.stringify(token))
        //             localStorage.setItem("acesso", "true")
        //             navigation.navigate('turmas')
        //           } else if (resposta.professor != -1) {
        //             const resposta = await resposta.json();
        //             AsyncStorage.clear()
        //             const token = await JSON.parse(atob(resposta.token.split('.')[1]));
        //             _storeData = async () => {
        //                 try {
        //                   await AsyncStorage.setItem(
        //                     'token',
        //                     JSON.stringify(token),
        //                   );
        //                   await AsyncStorage.setItem(
        //                     'level',
        //                     resposta.level,
        //                   );
        //                   await AsyncStorage.setItem(
        //                     'acesso',
        //                     'true',
        //                   );
        //                 } catch (error) {
        //                     console.log(error)
        //                   // Error saving data
        //                 }
        //               };
        //             navigation.navigate('turmas')
        //           }
        //         } else {
        //           alert("Dados incorretos!")
        //         }
        //       } catch (error) {
        //         alert(error.message)
        //       }
        // }
    }
    return (
            <VStack justifyContent={"center"} flex={1} px={10} safeArea>
                <Center>
                    <Image size="130px" borderRadius={119} source={Logo} alt="Logo do aplicativo" />
                    <Heading bold fontSize="3xl" my={5}>LOGIN</Heading>
                </Center>
                <FormControl>
                    <FormControl.Label>Email</FormControl.Label>
                </FormControl>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange } }) => (
                        <Input
                            placeholder="Digite seu email"
                            errorMessage={errors.email?.message}
                            onChangeText={onChange} />
                    )}
                />
                <FormControl>
                    <FormControl.Label>Senha</FormControl.Label>
                </FormControl>
                <Controller
                    control={control}
                    name="senha"
                    render={({ field: { onChange } }) => (
                        <Input
                            onChangeText={onChange}
                            errorMessage={errors.senha?.message}
                            type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
                                <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                            </Pressable>} placeholder="Digite sua senha" />
                    )}
                />
                <Center>
                    <Button mt="12px" title="LOGIN" onPress={handleSubmit(handleSignIn)}></Button>
                </Center>
                <HStack mt="20px" alignItems={'center'} justifyContent={'center'}>
                    <Text color={"#7E8390"} fontSize="13px">Não possuí uma conta?</Text>
                    <Link style={{color: "#0000EE", textDecorationLine: 'underline'}} to={{ screen: 'cadastro' }} ml="5px">cadastro</Link>
                </HStack>
                <HStack mt="8px" alignItems={'center'} justifyContent={'center'}>
                    <Text color={"#7E8390"} fontSize="13px">Esqueceu sua senha?</Text>
                    <Link style={{color: "#0000EE", textDecorationLine: 'underline'}} to={{ screen: 'alterarSenha'}} ml="5px">alterar senha</Link>
                </HStack>
            </VStack>
    );
}