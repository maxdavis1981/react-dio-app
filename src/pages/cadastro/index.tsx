import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { useNavigate  } from "react-router-dom";

import { useForm } from "react-hook-form";
import { api } from '../../services/api';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IFormData } from './types';

import { Container, Title, Column, TitleLogin, SubtitleLogin, Row, Text, CriarText, Wrapper }
 from './styles';

const schema = yup.object({
    nome: yup.string().min(3,'O Nome deve ter no mínimo 3 caracteres').required('Campo obrigatório'),
    email: yup.string().email('email não é válido').required('Campo obrigatório'),
    senha: yup.string().min(3, 'A senha deve ter no mínimo 3 caracteres')
   // .matches(/[A-Z]/, 'Deve conter pelo menos uma letra maiúscula')
   // .matches(/[a-z]/, 'Deve conter pelo menos uma letra minúscula')
   // .matches(/[0-9]/, 'Deve conter pelo menos um número')
   // .matches(/[@$!%*?&]/, 'Deve conter pelo menos um caractere especial (@$!%*?&)')
    .required('Campo obrigatório'),
}).required();

const Cadastro = () => {
    const navigate = useNavigate();
    
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<IFormData>({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    console.log(isValid, errors);

    const onSubmit = async (formData:IFormData) => {
        try{
            const {data} = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);
            
            console.log(data);

            if(data.length && data[0].id){
                navigate('/feed') 
                return
            }

            alert('Usuário ou senha inválido')
        }catch(e){
            //TODO: HOUVE UM ERRO
            alert('Houve um erro, tente novamente.')
        }
    };

    const handleClickSignIn = () => {
        navigate('/login')
    }   

    return (<>
        <Header />
        <Container>
            <Column>
                <Title>A plataforma para você aprender com experts, dominar as principais tecnologias
                 e entrar mais rápido nas empresas mais desejadas.</Title>
            </Column>
            <Column>
            <Wrapper>
                <TitleLogin>Comece agora grátis</TitleLogin>
                <SubtitleLogin>Crie sua conta e make the change.</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>

                <Input placeholder="Nome completo" leftIcon={<MdPerson />}
                    errorMenssage={errors?.nome?.message}
                    name="nome"  control={control} />  

                <Input placeholder="E-mail" leftIcon={<MdEmail />}
                    errorMenssage={errors?.email?.message}
                    name="email"  control={control} />
                    
                <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  
                    errorMenssage={errors?.senha?.message}
                    name="senha" control={control} />
                    <Button title="Entrar" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <Text> Ao clicar em "criar minha conta grátis", 
                    declaro que aceito as Políticas de Privacidade e os
                     Termos de Uso da DIO.</Text>
              </Row>

                <Row>
                    <Text>Já tenho conta.
                    <CriarText  onClick={handleClickSignIn} role="button" tabIndex={0}>
                        Fazer login</CriarText></Text>
                </Row>
            </Wrapper>
            
            </Column>
            
        </Container>
    </>)
}

export { Cadastro }