import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerView:{
        width: 300,
        height:400,
        borderRadius:20,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        alignItems:"center",
        justifyContent:"space-around",
    },

    background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center', 
    },
    inputStyle:{
        width: 200,
        height: 50
    },
    tituloCadastro:{
        fontWeight:'600',
        fontSize:40
    }, 
    buttonCadastro:{
        marginBottom:20
    }
});