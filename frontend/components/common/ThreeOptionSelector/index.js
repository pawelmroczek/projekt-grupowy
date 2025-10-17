import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ThreeOptionSelector = ({
  options,
  setSelectedOption,
  selectedOption,
}) => {
  const renderOption = (value, index) => {
    const isSelected = selectedOption === index;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => setSelectedOption(index)}
        className={`flex-1 items-center justify-center py-3 ${
          isSelected ? " border-secondary-300" : "bg-gray-200 border-gray-200 "
        }`}
      >
        <Text className="text-base text-black font-plight">{value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-row rounded-xl overflow-hidden border border-gray-300 mb-4">
      {options.map((opt, index) => renderOption(opt, index))}
    </View>
  );
};

export default ThreeOptionSelector;
