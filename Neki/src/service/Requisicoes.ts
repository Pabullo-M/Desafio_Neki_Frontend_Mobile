import { AxiosResponse } from "axios";
import { Api} from "./Api";
import { CadastroResponse, LoginResponseData, LoginResult, Skill, SkillUsuario } from "../types/types";
import { saveData } from "../util/AssyncStorage";
import { useNavigation } from "@react-navigation/native";


export const postLogin = async (usuario: string, senha: string): Promise<LoginResult> => {
    try {
      const response: AxiosResponse<LoginResponseData> = await Api.post('/usuario/login', { 
        usuario,
        senha
      });
  
      console.log(response.data.id);
      saveData('id', JSON.stringify(response.data.id));
      console.log(response.data.token);
      saveData('token', response.data.token);
      return { data: response.data, error: null };
    } catch (error: any) {
      let errorMessage = 'Erro desconhecido';
  
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = 'Usuário ou senha incorretos';
        } else {
          errorMessage = error.response.data.message || 'Erro desconhecido';
        }
      } else if (error.request) {
        errorMessage = 'Nenhuma resposta recebida do servidor';
      } else {
        errorMessage = error.message || 'Erro desconhecido';
      }
  
      alert(errorMessage);
  
      return { data: null, error: errorMessage };
    }
  };

  export const postCadastroUsuario = async (usuario: string, senha: string): Promise<Number> => {
    try {
      const response: AxiosResponse<LoginResponseData> = await Api.post('/usuario/cadastro', { 
        usuario,
        senha
      });
      
      return response.status;
    } catch (error: any) {
      let errorResponse: any = null;
  
      if (error.response) {
        if (error.response.status === 400) {
          errorResponse = error.response.data;
        } else {
          errorResponse = error.response.data;
        }
      } else if (error.request) {
        errorResponse = 'Nenhuma resposta recebida do servidor';
      } else {
        errorResponse = error.message || 'Erro desconhecido';
      }
      alert(errorResponse);
      return { data: null, error: errorResponse };
    }
  }
  export const postCadastroSkills = async (usuarioId: string | number, skillId: string | number, level: number, token: string): Promise<void> => {
    try {
        const response: AxiosResponse<any> = await Api.post('/usuarioSkill/add', {
            usuarioId,
            skillId,
            level
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Erro ao cadastrar habilidade:', error);
        throw error;
    }
};
  export const getAllSkills = async (token: string): Promise<Skill[]> => {
    try {
      const response: AxiosResponse<Skill[]> = await Api.get('/skills', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.error('Erro ao buscar habilidades:', error);
      throw error;
    }
  };

  export const getUsuarioSkills = async (usuarioId: string | number, token: string): Promise<SkillUsuario[]> => {
    try {
        const response: AxiosResponse<any> = await Api.get(`/usuarioSkill/${usuarioId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar habilidades:', error);
        throw error;
    }
};

export const putUsuarioSkills = async (id: string | number, levelAlterado: any, token: string): Promise<any> => {
  try {
      const response: AxiosResponse<any> = await Api.put(`/usuarioSkill/${id}`, levelAlterado, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      console.log(response.data);
      return response.data;
  } catch (error) {
      console.error('Erro ao atualizar habilidades:', error);
      throw error;
  }
};

export const deleteUsuarioSkill = async (skillId: string | number, token: string): Promise<void> => {
  try {
      const response: AxiosResponse<any> = await Api.delete(`/usuarioSkill/${skillId}`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      console.log(response.data);
  } catch (error) {
      console.error('Erro ao deletar habilidade:', error);
      throw error;
  }
};