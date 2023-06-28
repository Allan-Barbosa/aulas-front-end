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
import AsyncStorage from '@react-native-async-storage/async-storage';
const Logo = require('../../assets/aulasLogo.png');

const signInSchema = yup.object({
    email: yup.string().required('Informe o email').email('E-mail inválido'),
    password: yup.string().required('Informe a senha').min(8, 'A senha deve ter pelo menos 8 caracteres'),
});

export default function Login() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signInSchema)
    });
    const navigation = useNavigation();
    const [show, setShow] = React.useState(false);
    function handleSignIn(data) {
        const _storeData = async (respData) => {
            try {
                await AsyncStorage.setItem(
                    'token',
                    respData.token,
                );
                await AsyncStorage.setItem(
                    'level',
                    respData.level,
                );
                await AsyncStorage.setItem(
                    'acesso',
                    'true',
                );
                await AsyncStorage.setItem(
                    'name',
                    respData.name,
                );
                await AsyncStorage.setItem(
                    'id',
                    respData.id,
                );
                await AsyncStorage.setItem(
                    'email',
                    respData.email,
                );
            } catch (error) {
                console.log(error)
                // Error saving data
            }
        }
        const _retrieveData = async () => {
            try {
                let value = await AsyncStorage.getItem('token');
                if (value !== null) {
                    // We have data!!
                    console.log(value);
                }
                value = await AsyncStorage.getItem('level');
                if (value !== null) {
                    // We have data!!
                    console.log(value);
                }
                value = await AsyncStorage.getItem('acesso');
                if (value !== null) {
                    // We have data!!
                    console.log(value);
                }
                value = await AsyncStorage.getItem('name');
                if (value !== null) {
                    // We have data!!
                    console.log(value);
                }
                value = await AsyncStorage.getItem('id');
                if (value !== null) {
                    // We have data!!
                    console.log(value);
                }
                value = await AsyncStorage.getItem('email');
                if (value !== null) {
                    // We have data!!
                    console.log(value);
                }
            } catch (error) {
                console.log(error)
                // Error retrieving data
            }
        };
        enviarDados(data)
        async function enviarDados(dados) {
            try {
                const resposta = await fetch('https://api-aulas.onrender.com/api/user/session', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(dados)
                }
                )
                if (resposta.status === 200) {
                    const resp = await resposta.json();
                    _storeData(resp)
                    _retrieveData()
                    alert("Login realizado com sucesso!")
                    setTimeout(function() {
                        console.log('3 segundos');
                      }, 3000)
                      navigation.navigate('turmas1')
                } else {
                    alert("Dados incorretos!")
                }
            } catch (error) {
                alert(error.message)
            }
        }
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
                name="password"
                render={({ field: { onChange } }) => (
                    <Input
                        onChangeText={onChange}
                        errorMessage={errors.password?.message}
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
                <Link style={{ color: "#0000EE", textDecorationLine: 'underline' }} to={{ screen: 'cadastro' }} ml="5px">cadastro</Link>
            </HStack>
            <HStack mt="8px" alignItems={'center'} justifyContent={'center'}>
                <Text color={"#7E8390"} fontSize="13px">Esqueceu sua senha?</Text>
                <Link style={{ color: "#0000EE", textDecorationLine: 'underline' }} to={{ screen: 'alterarSenha' }} ml="5px">alterar senha</Link>
            </HStack>
        </VStack>
    );
}