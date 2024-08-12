import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex:1 ,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 10
    },
    modalContainer: {
      // flex: 1,
      height:'100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: 300,
      padding: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalText: {
      fontSize: 16,
      marginBottom: 20,
    },
    closeButton: {
      backgroundColor: '#007BFF',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    closeButtonText: {
      color: 'white',
      fontSize: 16,
    },
    avatarModal: {
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        borderWidth: 2, 
        borderColor: '#ddd', 
      },
    skillsContainerModal:{
        backgroundColor:'white',
        borderRadius:20,
        alignItems: 'center',
        verticalAlign:'middle',
        padding: 10,
        height: 225,
        marginBottom: 15
    },
    flatListSkillModal:{
        width: "100%",
        height:'60%' ,
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
  });