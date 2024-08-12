import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { ButtonProps } from "../../types/types";

export default function ButtonEstilizado({ title, style, styleTitle, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.btn, style]}
            {...rest}
            accessible={true}
        >
            <Text style={[styleTitle, { color: "#FFF" }]}>{title}</Text>
        </TouchableOpacity>
    );
};