import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from "react-native";
import {Palette, X} from "lucide-react-native";
import HSLColorPicker from "../HSLColorPicker";
import { generatePalettes, hexToHsl } from "../../../../lib/outfits/colorPalettesGenerator";

export default function ColorPalettes({ paletteModalVisible, setPaletteModalVisible, colorPalettes, setColorPalettes, pickedHex }) {
  
  const [selectedPaletteIndex, setSelectedPaletteIndex] = useState(null);

  const [editingColorIndex, setEditingColorIndex] = useState(null);

  const [editingColor, setEditingColor] = useState(null);

  const [generateDisabled, setGenerateDisabled] = useState(true);
  const [generatedPaletteIndexes, setGeneratedPaletteIndexes] = useState([]);

  useEffect(() => {
    setGenerateDisabled(pickedHex == null);
    if (generatedPaletteIndexes.length === 0) return;

    setColorPalettes(prev => {
      return prev.filter((_, index) => !generatedPaletteIndexes.includes(index));
    });

    setGeneratedPaletteIndexes([]);
  }, [pickedHex]);

  const addNewPalette = () => {
    if(pickedHex)
    {
      setColorPalettes(prev => [...prev, [hexToHsl(pickedHex)]])
    }
    else
    {
      setColorPalettes(prev => [...prev, []]);
    }
  };

  const deletePalette = (index) => {
    setColorPalettes(prev => prev.filter((_, i) => i !== index));

    if(generatedPaletteIndexes.length > 0)
    {
      setGeneratedPaletteIndexes(prevIndexes => {
        const updated = prevIndexes.filter(i => i !== index).map(i =>
          i > index ? i - 1 : i
        );

        if (updated.length === 0) {
          setGenerateDisabled(false);
        }

        return updated;
      });
    }
  };


  const onClose = () => {
    setEditingColorIndex(null);
    setSelectedPaletteIndex(null);
    setEditingColor(null);
  }

  const saveColor = (color) => {
    if (selectedPaletteIndex === null) return;
    setColorPalettes(prev => {
      return prev.map((palette, index) => {
        if (index !== selectedPaletteIndex) return palette;

        if (editingColorIndex !== null) {
          const newPalette = [...palette];
          newPalette[editingColorIndex] = color;
          return newPalette;
        }
        return [...palette, color];
      });
    });
    setEditingColorIndex(null);
    setSelectedPaletteIndex(null);
    setEditingColor(null);
  };

  const generate = (hex) => {
    if (!hex) return;

    const newPalettes = generatePalettes(hex);

    setColorPalettes(prev => {
      const startIndex = prev.length;
      const endIndex = startIndex + newPalettes.length;

      const newIndexes = [];
      for (let i = startIndex; i < endIndex; i++) {
        newIndexes.push(i);
      }
      setGeneratedPaletteIndexes(newIndexes);

      return [...prev, ...newPalettes];
    });

    setGenerateDisabled(true);
  };


  const ColorCircle = ({ color, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: color ? `hsl(${color.h}, ${color.s}%, ${color.l}%)` : "#FFFFFFF",
        marginHorizontal: 4,
        borderWidth: color ? 0 : 2,
        borderColor: "#999",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!color && <Text style={{ fontSize: 22, color: "#555" }}>＋</Text>}
    </TouchableOpacity>
  );


  return (
    <Modal visible={paletteModalVisible} animationType="slide" presentationStyle="pageSheet">
      <View className="flex-1 bg-white">

        {/* Header */}
        <View className="flex-row justify-between p-4 border-b border-gray-200">
          <Palette size={28} color="#264653" />
          <Text className="font-bold text-lg">Palety kolorów</Text>

          <TouchableOpacity onPress={() => setPaletteModalVisible(false)}>
            <X size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <ScrollView className="p-4">

          {/* Lista palet */}
          {colorPalettes.map((palette, index) => (
            <View
              key={index}
              className="flex-row items-center justify-between border-b border-gray-100 py-3"
            >
              {/* Kółka kolorów */}
              <View className="flex-row items-center">
                {Array.from({ length: palette.length < 5 ? palette.length + 1 : palette.length })
                  .map((_, i) => (
                    <ColorCircle
                      key={i}
                      color={palette[i] ?? null}
                      onPress={() => {
                        setSelectedPaletteIndex(index);
                        setEditingColorIndex(i);
                        setEditingColor(palette[i]);
                      }}
                    />
                ))}
              </View>

              {/* Kosz */}
              <TouchableOpacity onPress={() => deletePalette(index)}>
                <X size={22} color="#dc2626" />
              </TouchableOpacity>
            </View>
          ))}

          {/* Dodaj paletę */}
          <TouchableOpacity
            className="bg-primary-100 p-3 rounded-lg mt-4"
            onPress={addNewPalette}
          >
            <Text className="text-white text-center font-pmedium">Dodaj paletę</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={
              `p-3 rounded-lg mt-4 ` +
              (generateDisabled
                ? "bg-gray-300"
                : "bg-primary-100")
            }
            disabled={generateDisabled}
            onPress={() =>generate(pickedHex)}>
            <Text className="text-white text-center font-pmedium">Generuj palety na podstawie wybranego ubrania</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <Modal visible={editingColorIndex !== null} animationType="slide" presentationStyle="pageSheet">
          <HSLColorPicker
            onSave={saveColor}
            onClose={onClose}
            color={editingColor}
          />
      </Modal>

    </Modal>
  );
}