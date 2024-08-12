import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container:{
        // marginTop: ,
        paddingHorizontal: 20,
        width: "95%",
        height:"85%",
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
    avatar: {
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        borderWidth: 2, 
        borderColor: '#ddd', 
      },
    skillsContainer:{
        backgroundColor:'white',
        borderRadius:20,
        alignItems: 'center',
        verticalAlign:'middle',
        padding: 10,
        height: 235,
        marginBottom: 15
    },
    flatListSkill:{
        width: "100%",
        padding: "10%"
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
      },
    input:{
    borderColor:"gray"
    },
    viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    },
    exitButton:{
        position: 'absolute',
        right: 12,
        top : 12
    },
    closeButton:{
        position: 'absolute',
        right: 5,
        top: 5
    }
});