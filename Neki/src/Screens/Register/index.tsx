import React, { useState } from "react";
import { ImageBackground, Text, View } from "react-native";
import { styles } from "./intex";
import Input from "../../components/Input";
import InputPassword from "../../components/InputPassword";  
import Button from "../../components/ButtonEstilizado";
import { postCadastroUsuario } from "../../service/Requisicoes";
import { useNavigation } from "@react-navigation/native";

export const Register =()=>{
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [usuario, setUsuario] = useState('');

    const navigation= useNavigation();


    const handleCadastro = async ()=>{
        if(senha !== confirmaSenha){
            return alert("As Senhas devem ser iguais!")
        }
        const response = await postCadastroUsuario(usuario, senha)

        if(response == 200){
            alert("Cadastro realizado com sucesso!!")
            navigation.navigate('Login')
        }
    }

    return(
        <ImageBackground
            source={require('../../../assets/fundo.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.containerView}>
                <Text style={styles.tituloCadastro}>Cadastro</Text>
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
                <InputPassword
                    value={confirmaSenha}
                    style={styles.inputStyle}
                    inputLabel='Confirmar senha'
                    onChangeText={(event: string)=>{setConfirmaSenha(event)}}
                />
                <Button
                    title='Cadastrar-se'
                    onPress={handleCadastro}
                    style={styles.buttonCadastro}
                />
            </View>
        </ImageBackground>
    );
}