import React from 'react'
import { Image, Center, Text, FormControl, Pressable, Icon, VStack, Heading, HStack, ScrollView } from 'native-base'
import { useForm, Controller } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { Input } from '../components/input';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components/button';
import { Link } from '@react-navigation/native';
import fetch from 'node-fetch'
const Logo = require('../../assets/aulasLogo.png');

const alterarSenhaEsquema = yup.object({
    email: yup.string().required('Informe o email').email('E-mail inválido'),
    password: yup.string().required('Informe a senha').min(8, 'A senha deve ter pelo menos 8 caracteres'),
    samePasswords: yup
    .string()
    .required('Informe a confirmação de senha')
    .oneOf([yup.ref('senha'), null], "A confirmação de senha não é igual.")
    .min(8, 'A senha deve ter pelo menos 8 caracteres'),
});

export default function AlterarSenha() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(alterarSenhaEsquema)
    });
    const navigation = useNavigation();
    const [show, setShow] = React.useState(false);
    function alterarSenha(data) {
        enviarDados(data)
        async function enviarDados(dados) {
            try {
                const resposta = await fetch('', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dados)
                })
                if (resposta.status === 200) {
                    alert('Verifique seu email e clique no link de confirmação, para alterar sua senha!')
                    console.log(dados)
                    navigation.navigate('index')
                } else {
                    alert('Email inválido!')
                    console.log('Erro ao modificar a senha')
                }
            } catch (erro) {
                console.error(erro)
            }
        }
    }
    return (
            <VStack justifyContent={"center"} flex={1} px={10} safeArea>
                <Center>
                    <Image size="130px" borderRadius={119} source={Logo} alt="Logo do aplicativo" />
                    <Heading bold fontSize="3xl" mt={5}>ALTERAR</Heading>
                    <Heading bold fontSize="3xl" mb={5}>SENHA</Heading>
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
                    <FormControl.Label>Nova senha</FormControl.Label>
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
                <FormControl>
                    <FormControl.Label>Confirmar senha</FormControl.Label>
                </FormControl>
                <Controller
                    control={control}
                    name="samePasswords"
                    render={({ field: { onChange } }) => (
                        <Input
                            onChangeText={onChange}
                            errorMessage={errors.samePasswords?.message}
                            type={show ? "text" : "password"} InputRightElement={<Pressable onPress={() => setShow(!show)}>
                                <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                            </Pressable>} placeholder="Digite sua senha" />
                    )}
                />
                <Center>
                    <Button mt="12px" title="ALTERAR SENHA" onPress={handleSubmit(alterarSenha)}></Button>
                </Center>
                <HStack mt="20px" alignItems={'center'} justifyContent={'center'}>
                    <Text color={"#7E8390"} fontSize="13px">Retornar ao login?</Text>
                    <Link style={{color: "#0000EE", textDecorationLine: 'underline'}} to={{ screen: 'index'}} ml="5px">login</Link>
                </HStack>
            </VStack>
    );
}