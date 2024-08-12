import { StyleProp, TextInputProps, TextStyle, TouchableOpacityProps, ViewStyle } from "react-native";

export interface InputProps extends TextInputProps {
    placeHolder?: string;
    inputLabel: string;
    style?: StyleProp<ViewStyle>;
    errorMessage?: string | null;
    value?:string;
    type?:string;
};
export interface ButtonProps extends TouchableOpacityProps {
    title: string;
    style?: StyleProp<ViewStyle>;
    styleTitle?: StyleProp<TextStyle>;
    onPress: () => void;
};
export interface CheckboxCustomizadoProps {
    label: string;
    initialValue?: boolean;
    onValueChange?: (value: boolean) => void;
    accessibilityLabel: string;
    accessibilityHint?: string;
};

export interface LoginResponseData {
    id: string;
    token: string;
  }

export interface LoginResult {
    data: LoginResponseData | null;
    error: string | null;
  }

export interface CadastroResponse {
    data: any;
    error: string | null;
  }
export interface Skill {
    id: number;
    imgUrl: string;
    nome: string;
    descricao: string;
  }
export interface SkillUsuario {
    skillid: number;
    imgurl: string;
    skillnome: string;
    skilldescricao: string;
    usuarioskillid:number;
    usuarioskilllevel:string;
  }
export interface ModalSkillProps {
    data: Skill[];
    onPress:() => void;
  }
export interface InputPasswordProps extends TextInputProps {
  inputLabel?: string;
  placeHolder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: object;
}