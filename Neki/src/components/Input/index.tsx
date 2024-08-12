
import React from "react";
import { styles } from "./styles";
import { InputProps } from "../../types/types";
import { Icon, Stack, TextInput } from "@react-native-material/core";

export default function Input({ inputLabel, placeHolder, style, onChangeText, value, ...rest }: InputProps) {
    return (
        <Stack spacing={2} style={{ margin: 16 }}>
            <TextInput
            value={value}
            style={style}  
            label={inputLabel}
            onChangeText={onChangeText}
            color='#007BFF'
            />
        </Stack>
    );
};