import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { X} from "lucide-react-native";

// Konwersja HSL → HEX
function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const col = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * col)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export default function HSLColorPicker({ onSave, onClose, color }) {
  const [h, setH] = useState(color ? color.h : 180);
  const [s, setS] = useState(color ? color.s : 50);
  const [l, setL] = useState(color ? color.l : 50);

  const hslString = `hsl(${h}, ${s}%, ${l}%)`;
  const hex = useMemo(() => hslToHex(h, s, l), [h, s, l]);

  return (
    <View className="p-4 gap-4">
        {/* Header */}
        <View className="flex-row justify-between p-4 border-b border-gray-200">
          <Text className="font-bold text-lg">Wybierz kolor</Text>

          <TouchableOpacity onPress={() => onClose()}>
            <X size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>
      <View
        className="w-28 h-28 rounded-full self-center border border-gray-300"
        style={{ backgroundColor: hslString }}
      />

      {/* Hue */}
      <Text className="">Hue: {h}</Text>
      <Slider
        minimumValue={0}
        maximumValue={360}
        value={h}
        onValueChange={(v) => setH(Math.round(v))}
        minimumTrackTintColor={'#000000'}
      />

      {/* Saturation */}
      <Text>Saturation: {s}%</Text>
      <Slider
        minimumValue={0}
        maximumValue={100}
        value={s}
        onValueChange={(v) => setS(Math.round(v))}
        minimumTrackTintColor={'#000000'}
      />

      <Text>Lightness: {l}%</Text>
      <Slider
        minimumValue={0}
        maximumValue={100}
        value={l}
        onValueChange={(v) => setL(Math.round(v))}
        minimumTrackTintColor={'#000000'}
      />
      
    <TouchableOpacity
        className="bg-primary-100 p-3 rounded-lg mt-4"
        onPress={() => onSave({ h, s, l })}
    >
        <Text className="text-white text-center font-pmedium">Zapisz kolor</Text>
    </TouchableOpacity>

    </View>
  );
}

