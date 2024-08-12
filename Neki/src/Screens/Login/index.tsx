import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './intex';
import Button from '../../components/ButtonEstilizado';
import CheckboxCustomizado from '../../components/Checkbox';
import InputPassword from '../../components/InputPassword'; 
import Input from '../../components/Input';
import { postLogin } from '../../service/Requisicoes';
import { getData, removeData, saveData } from '../../util/AssyncStorage';
import { useNavigation } from '@react-navigation/native';


export const Login = () =>{
    const [senha, setSenha] = useState('');
    const [usuario, setUsuario] = useState('');
    const [senhaSalva, setSenhaSalva] = useState(false);
    const [atualizaTela, setAtualizaTela]= useState(Boolean)

    const navigation = useNavigation()

    useEffect(() => {

        const fetchData = async () => {
            const user = await getData('user');
            const password = await getData('password');
            const checked = await getData('checked');
            const token = await getData('token');
        
                if (token !== null && token !== undefined) {
                    navigation.navigate('Skills');
                }
                if (user !== null && user !== undefined) {
                    setUsuario(user);
                }

                if (password !== null && password !== undefined) {
                    setSenha(password);
                }
                if (checked !== null && checked !== undefined) {
                    setSenhaSalva(JSON.parse(checked));
                }
           
        };

        fetchData();
    }, [atualizaTela, ]);
 
    const handleSalvaLogin = ()=>{
        console.log(senhaSalva);
        setSenhaSalva(!senhaSalva);
        
        
        if(senhaSalva){
            saveData('user', usuario);
            saveData('password', senha);
            saveData('checked', JSON.stringify(senhaSalva));
        }else{
            removeData('user');
            removeData('password');
            removeData('checked');
        }
    }

    const handleLogin = async () =>{
        await postLogin(usuario, senha)
        setAtualizaTela(!atualizaTela)
    }
    return(
        <ImageBackground
            source={require('../../../assets/fundo.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.containerView}>
                <Text style={styles.tituloLogin}>Login</Text>
                <Input 
                    value={usuario}
                    inputLabel='Usuario'
                    style={styles.inputStyle}
                    onChangeText={(event: string)=>{setUsuario(event)}}
                />
                <InputPassword
                    value={senha}
                    style={styles.inputStyle}
                    inputLabel='Senha'
                    onChangeText={(event: string)=>{setSenha(event)}}
                />
                <Button
                    title='Login'
                    onPress={handleLogin}
                />
                <CheckboxCustomizado
                    initialValue={senhaSalva}
                    label='Salvar usuário e senha?'
                    onValueChange={handleSalvaLogin}
                />
                <Text style={styles.text}>
                        Não tem uma conta? 
                        <TouchableOpacity onPress={()=>{navigation.navigate('Register')}}>
                        <Text style={styles.link}>Registre-se</Text>
                    </TouchableOpacity>
                </Text>

            </View>
        </ImageBackground>
    );
}
export default Login