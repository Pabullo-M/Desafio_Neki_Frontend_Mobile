import { useEffect, useState } from "react";
import { Skill, SkillUsuario } from "../../types/types";
import { getData, removeData } from "../../util/AssyncStorage";
import { deleteUsuarioSkill, getAllSkills, getUsuarioSkills, putUsuarioSkills } from "../../service/Requisicoes";
import { Button, FlatList, Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./intex";
import ModalSkill from "../../components/Modal";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


export const Skills = () => {
    const [data, setData] = useState<Skill[]>();
    const [dataUsuarioSkill, setDataUsuarioSkill] = useState<SkillUsuario[]>()
    const [editItemId, setEditItemId] = useState<number>(null);
    const [levels, setLevels] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
    const [atualizaTela, setAtualizaTela]= useState(Boolean)

    const navigation = useNavigation();
  
    

    useEffect(() => {
        const fetchData = async () => {
            const token = await getData('token')
            const idUsuario = await getData('id')

            if (token !== null && token !== undefined) {
                const dataSkills = await getAllSkills(token);
                if (dataSkills !== null && dataSkills !== undefined) {
                    setData(dataSkills);
                }
                if (idUsuario !== null && idUsuario !== undefined) {
                    const usuarioSkill = await getUsuarioSkills(idUsuario, token);
                    if (usuarioSkill !== null && usuarioSkill !== undefined) {
                        setDataUsuarioSkill(usuarioSkill);
                    }
                }
            }else{
                navigation.navigate('Login')
            }

        }
        fetchData();
    }, [atualizaTela, ModalSkill, ])

    const handleEditClick = (id: number) => {
        setEditItemId(id);
      };
    
      const handleAddLevel = async (id: number) => {
        setLoading(prev => ({ ...prev, [id]: true }));
        const token = await getData('token');
        if (token != null && token != undefined) {
            if(levels[id]==null){
                alert('Nivel deve ser preenchido!!')
                setLoading(prev => ({ ...prev, [id]: false }));
                return setEditItemId(null);
            }
            await putUsuarioSkills(id, levels[id], token);
            setAtualizaTela(!atualizaTela)
            console.log(atualizaTela);
            
            
        }
    
        setLevels(prev => ({...prev,[id]: '', }));
        setLoading(prev => ({ ...prev, [id]: false }));
        setEditItemId(null);
      };
    
      const handleChange = (id: number, value: string) => {
        setLevels(prev => ({ ...prev, [id]: value }));
      };

      const handleRemoveData = async ()=>{
        removeData('token');
        removeData('id');
        setAtualizaTela(!atualizaTela)
      }
      const handleRemoveSkill = async(id: number)=>{
        const token = await getData('token');
        if (token != null && token != undefined) {
            deleteUsuarioSkill(id, token)
            alert('Skill deletada com sucesso')
            setAtualizaTela(!atualizaTela);
        }

      }

    return (
        <ImageBackground
            source={require('../../../assets/fundo.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <TouchableOpacity 
                    style={styles.exitButton}
                    onPress={handleRemoveData}
                >
                    <MaterialIcons name="exit-to-app" size={45}/>
                </TouchableOpacity>

                <Text style={styles.titulo}>Minhas Skills</Text>
                {dataUsuarioSkill ?
                    <FlatList
                        style={styles.flatListSkill}
                        data={dataUsuarioSkill}
                        renderItem={({ item }) => (
                            <View style={styles.skillsContainer}>
                                <TouchableOpacity 
                                    style={styles.closeButton}
                                    onPress={()=>{handleRemoveSkill(item.usuarioskillid)}}
                                >
                                    <MaterialIcons name="close" size={45}/>
                                </TouchableOpacity>
                                <Image
                                    source={{ uri: item.imgurl }}
                                    style={styles.avatar}
                                />
                                <Text>{item.skillnome}</Text>
                                <Text>{item.skilldescricao}</Text>
                                <Text>Nivel: {item.usuarioskilllevel}</Text>
                                {editItemId === item.usuarioskillid ? (
                                    <>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Incluir Level"
                                            onChangeText={(value: string) => handleChange(item.usuarioskillid, value)}
                                            value={levels[item.usuarioskillid] || ''}
                                            keyboardType="number-pad"
                                        />
                                        <View style={styles.viewButton}>
                                            <Button
                                                title={loading[item.usuarioskillid] ? "Confirmando..." : "Confirmar"}
                                                onPress={() => handleAddLevel(item.usuarioskillid)}
                                                disabled={loading[item.usuarioskillid]}
                                            />
                                            <Button
                                                title="Cancelar"
                                                onPress={() => { setEditItemId(null) }}
                                            />
                                        </View>
                                    </>
                                ) : (
                                    <Button
                                        title="Editar Nível"
                                        onPress={() => handleEditClick(item.usuarioskillid)}
                                    />
                                )}
                            </View>
                        )}
                        keyExtractor={item => item.usuarioskillid}
                    />
                    : <Text>Lista Vazia</Text>}
            </View>
            <ModalSkill
                data={data!}
                onPress={()=>{setAtualizaTela(!atualizaTela)}}

            />
        </ImageBackground>
    );
}