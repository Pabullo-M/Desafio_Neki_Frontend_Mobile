import React, { useState } from 'react';
import { Stack, TextInput } from '@react-native-material/core';
import { TextInputProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { InputPasswordProps } from '../../types/types';




export default function InputPassword({
  inputLabel,
  placeHolder,
  value,
  onChangeText,
  style,
  ...rest
}: InputPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(prev => !prev);

  return (
    <Stack spacing={2} style={{ margin: 16 }}>
      <TextInput
        style={style}
        label={inputLabel}
        placeholder={placeHolder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
        color='#007BFF'
        trailing={(props) => (
          <MaterialIcons
            name={showPassword ? 'visibility' : 'visibility-off'}
            onPress={toggleShowPassword}
            {...props}
          />
        )}
        {...rest}
      />
    </Stack>
  );
}
