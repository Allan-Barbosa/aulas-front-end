import React from 'react'
import { Radio, Image, Center, Text, FormControl, Pressable, Icon, VStack, Heading, HStack, ScrollView, Box } from 'native-base'
import { useForm, Controller } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { Input } from '../components/input';
import { Button } from '../components/button';
import { useNavigation } from '@react-navigation/native';
import { Link } from '@react-navigation/native';
import fetch from 'node-fetch'
const Logo = require('../../assets/aulasLogo.png');

const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome').min(3, 'O nome deve ter mais de 2 caracteres'),
    email: yup.string().required('Informe o email').email('E-mail inválido'),
    password: yup.string().required('Informe a senha').min(8, 'A senha deve ter pelo menos 8 caracteres'),
    samePasswords: yup
        .string()
        .required('Informe a confirmação de senha')
        .oneOf([yup.ref('password'), null], "A confirmação de senha não é igual.")
        .min(8, 'A senha deve ter pelo menos 8 caracteres'),
    level: yup.string().required('Informe a função'),
});

export default function Cadastro() {
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema)
    });
    const [show, setShow] = React.useState(false);
    function handleSignUp(data) {
        enviarDados(data)
        async function enviarDados(dados) {
            try {
                const resposta = await fetch('https://api-aulas.onrender.com/api/users/create', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dados)
                })
                if (resposta.status === 200) {
                    alert('Verifique seu email e clique no link de confirmação, para concluir o cadastro!')
                    console.log(dados)
                    navigation.navigate('index')
                } else {
                    alert('Email já cadastrado!')
                    console.log('Erro ao realizar cadastro')
                }
            } catch (erro) {
                console.error(erro)
            }
        }
    }
    return (
        <ScrollView>
            <VStack flex={1} px={10} safeArea>
                <Center>
                <Center>
                    <Image size="130px" borderRadius={119} source={Logo} alt="Logo do aplicativo" />
                    <Heading bold fontSize="3xl" my={5}>CADASTRO</Heading>
                </Center>
                <FormControl>
                    <FormControl.Label>Nome</FormControl.Label>
                </FormControl>
                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange } }) => (
                        <Input
                            placeholder="Digite seu nome"
                            errorMessage={errors.name?.message}
                            onChangeText={onChange} />
                    )}
                />
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

                <FormControl>
                    <FormControl.Label>Função</FormControl.Label>
                </FormControl>
                <Box height={"65px"} width={'100%'}>
                    <FormControl _invalid={{
                        borderWidth: 2,
                        borderColor: "red.500",
                    }} isInvalid={'level' in errors}
                    >
                        <Controller
                            control={control}
                            name="level"
                            defaultValue=""
                            render={({ field: { onChange } }) => (
                                <Radio.Group
                                    name="FuncaoGrupo"
                                    onChange={(values) => {
                                        onChange(values);
                                    }}
                                    flexDirection={'row'}
                                    accessibilityLabel="Escolha se você será aluno ou professor.">
                                    <Radio value="Aluno">
                                        Aluno
                                    </Radio>
                                    <Radio ml={4} value="Professor">
                                        Professor
                                    </Radio>
                                </Radio.Group>
                            )}
                        />
                    </FormControl>
                    {errors.level && <Text lineHeight={18} mt="5px" style={{
                        color: "#DC2626",
                        fontStyle: 'normal',
                        fontSize: 12,
                        fontWeight: 400,
                    }}>{errors.level?.message}</Text>}
                </Box>
                <Center>
                    <Button title="CADASTRAR" onPress={handleSubmit(handleSignUp)}></Button>
                </Center>
                <HStack mt="20px" alignItems={'center'} justifyContent={'center'}>
                    <Text color={"#7E8390"} fontSize="13px">Já possuí uma conta?</Text>
                    <Link style={{color: "#0000EE", textDecorationLine: 'underline'}} to={{ screen: 'index'}} ml="5px">Login</Link>
                </HStack>
                </Center>
            </VStack>
        </ScrollView>
    );
}