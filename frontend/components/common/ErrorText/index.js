import { View, Text } from "react-native";
import React from "react";

/**
 * ErrorText component displays an error message with an optional icon.
 *
 * @param {object} props - Component props
 * @param {React.ReactNode} props.icon - Icon element to display next to the error text.
 * @param {string} props.error - Error message to display.
 */


const ErrorText = ({ icon, error }) => {
  return (
    <View className="items-center gap-1 w-full mt-5 flex-row justify-center">
      {error && (
        <>
          {icon}
          <Text className="text-sm text-red-700 font-plight mr-2">
            {error}
          </Text>
        </>
      )}
    </View>
  );
};

export default ErrorText;
