import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { MdEmail, MdLock } from 'react-icons/md';
import { useNavigate  } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Container, Title, Column, TitleLogin, SubtitleLogin, EsqueciText, Row, Wrapper } from './styles';
import { IFormData } from './types';
import { useAuth } from '../../hooks/useAuth';

const schema = yup.object({
    email: yup.string().email('email não é válido').required('Campo obrigatório'),
    senha: yup.string().min(3, 'A senha deve ter no mínimo 3 caracteres')
   // .matches(/[A-Z]/, 'Deve conter pelo menos uma letra maiúscula')
   // .matches(/[a-z]/, 'Deve conter pelo menos uma letra minúscula')
   // .matches(/[0-9]/, 'Deve conter pelo menos um número')
   // .matches(/[@$!%*?&]/, 'Deve conter pelo menos um caractere especial (@$!%*?&)')
    .required('Campo obrigatório'),
}).required();

const Login = () => {
    const navigate = useNavigate();
    const {handleLogin} = useAuth(); //TODO usando um hook customizado
    
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<IFormData>({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });

    console.log(isValid, errors);

    const onSubmit = async (formData:IFormData) => {
        handleLogin(formData);
    };

    const handleClickSignIn = () => {
        navigate('/cadastro')
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
                <TitleLogin>Faça seu cadastro</TitleLogin>
                <SubtitleLogin>Faça seu login e make the change.</SubtitleLogin>
                <form onSubmit={handleSubmit(onSubmit)}>

                <Input placeholder="E-mail" leftIcon={<MdEmail />}
                    errorMenssage={errors?.email?.message}
                    name="email"  control={control} />
                    
                <Input type="password" placeholder="Senha" leftIcon={<MdLock />}  
                    errorMenssage={errors?.senha?.message}
                    name="senha" control={control} />
                    <Button title="Entrar" variant="secondary" type="submit"/>
                </form>
                <Row>
                    <EsqueciText>Esqueci minha senha</EsqueciText>
                    <EsqueciText onClick={handleClickSignIn} role="button" tabIndex={0}>Criar Conta</EsqueciText>
                </Row>
            </Wrapper>
            
            </Column>
            
        </Container>
    </>)
}

export { Login }