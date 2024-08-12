import { useEffect, useState } from "react";
import { ModalSkillProps } from "../../types/types";
import { styles } from "./index2";
import { Button, FlatList, Image, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import ButtonEstilizado from "../ButtonEstilizado";
import { postCadastroSkills } from "../../service/Requisicoes";
import { getData } from "../../util/AssyncStorage";
import { useNavigation } from "@react-navigation/native";


const ModalSkill: React.FC<ModalSkillProps> = ({ data, onPress }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [editItemId, setEditItemId] = useState<number>();
  const [levels, setLevels] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

  const navigation = useNavigation();

  const handleEditClick = (id: number) => {
    setEditItemId(id);
  };

  const handleAddLevel = async (id: number) => {
    setLoading(prev => ({ ...prev, [id]: true }));
    const token = await getData('token');
    const usuarioId = await getData('id');
    if (token != null && token != undefined) {
      if (usuarioId != null && usuarioId != undefined) {
        await postCadastroSkills(usuarioId, id, levels[id], token);
        navigation.canGoBack('Skills');
      }

    }


    setLoading(prev => ({ ...prev, [id]: false }));
    setEditItemId(null);
  };

  const handleChange = (id: number, value: string) => {
    setLevels(prev => ({ ...prev, [id]: value }));
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <Button title="Adicionar Skill" onPress={toggleModal} />

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.titulo}>Skills</Text>
            <FlatList
              style={styles.flatListSkillModal}
              data={data}
              renderItem={({ item }) => (
                <View style={styles.skillsContainerModal}>
                  <Image
                    source={{ uri: item.imgUrl }}
                    style={styles.avatarModal}
                  />
                  <Text>{item.nome}</Text>
                  <Text>{item.descricao}</Text>

                  {editItemId === item.id ? (
                    <>
                      <TextInput
                        style={styles.input}
                        placeholder="Incluir Level"
                        onChangeText={(value: string) => handleChange(item.id, value)}
                        value={levels[item.id] || ''}
                        keyboardType="number-pad"
                      />
                      <View style={styles.viewButton}>
                        <Button
                          title={loading[item.id] ? "Adicionando..." : "Adicionar"}
                          onPress={() => handleAddLevel(item.id)}
                          disabled={loading[item.id]}
                        />
                        <Button
                        title="Cancelar"
                        onPress={()=>{setEditItemId(null)}} 
                        />
                      </View>
                    </>
                  ) : (
                    <Button
                      title="Editar Nível"
                      onPress={() => handleEditClick(item.id)}
                    />
                  )}
                </View>
              )}
              keyExtractor={item => item.id}
            />

            <TouchableOpacity onPress={()=>{
              toggleModal()
              onPress()
            }} 
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};



export default ModalSkill;