import React, { useEffect, useState } from 'react';
import { Pressable, Text } from 'react-native';
import Checkbox from 'expo-checkbox';
import { styles } from './styles';
import { CheckboxCustomizadoProps } from '../../types/types';
import { getData } from '../../util/AssyncStorage';

const CheckboxCustomizado: React.FC<CheckboxCustomizadoProps> = ({ label, initialValue = false, onValueChange }) => {
    const [isChecked, setChecked] = useState(initialValue);

    const handleChange = (newValue: boolean) => {
        setChecked(newValue);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    const handlePress = () => {
        const newValue = !isChecked;
        handleChange(newValue);
    };

    return (
        <Pressable
            onPress={handlePress}
            style={styles.section}
            accessibilityRole="checkbox"
            accessibilityLabel={label}
            accessibilityState={{ checked: isChecked }}
            accessible={true}
        >
            <Checkbox
                color='#007BFF'
                nativeID='checkbox'
                accessibilityRole="checkbox"
                style={styles.checkbox}
                value={isChecked}
                onValueChange={handleChange}
            />
            <Text
                style={styles.label}
            >
                {label}
            </Text>
        </Pressable>
    );
};

export default CheckboxCustomizado;
