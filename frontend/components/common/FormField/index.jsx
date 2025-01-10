import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react-native";

/**
 * FormField component displays a form field.
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.title - Title of the form field.
 * @param {React.ReactNode} props.value - Value of the form field.
 * @param {React.ReactNode} props.placeholder - Placeholder of the form field.
 * @param {React.ReactNode} props.handleChangeText - Function to handle text change.
 * @param {React.ReactNode} props.otherStyles - Additional styles for the form field.
 * 
 */


const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);


  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-text-primary font-pmedium">{title}:</Text>
      <View className="w-full rounded-2xl border-2 border-primary-100 focus:border-secondary-200 flex flex-row items-center px-4">
        <TextInput
          className={`flex-1 h-16 text-text-secondary font-psemibold text-base `}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={
            (title === "Hasło" || title === "Powtórz hasło") && !showPassword
          }
          autoCapitalize={"none"}
          {...props}
        />
        {(title === "Hasło" || title === "Powtórz hasło") && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {!showPassword ? (
              <Eye className="text-primary-200" />
            ) : (
              <EyeClosed className="text-primary-200" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
