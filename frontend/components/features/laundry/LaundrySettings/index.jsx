import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Settings, Info, X } from "lucide-react-native";
import { wichStrictnessIsActive } from "../../../../lib/laundry/utils";

export default function LaundrySettings({
  options,
  onOptionsChange,
  visible,
  onClose,
}) {
  const [localOptions, setLocalOptions] = useState({
    ...options,
  });

  useEffect(() => {
    setLocalOptions({ ...options });
  }, [options]);

  const handleSave = () => {
    onOptionsChange(localOptions);
    onClose();
  };

  const updateOption = (key, value) => {
    setLocalOptions((prev) => ({ ...prev, [key]: value }));
  };

  const setSetting = (level) => {
    if (level === "custom") return;
    console.log(`Setting strictness level to: ${level}`);
    setLocalOptions((prev) => {
      let newOptions;
      if (level === "loose") {
        newOptions = {
          ...prev,
          useTemperatureMatching: false,
          useRestrictionMatching: false,
          treatEmptyAsCompatible: true,
          allowHandWashWithMachine: true,
          allowDelicateWithNormal: true,
        };
      } else if (level === "medium") {
        newOptions = {
          ...prev,
          useTemperatureMatching: true,
          useRestrictionMatching: true,
          temperatureTolerance: 20,
          treatEmptyAsCompatible: true,
          allowHandWashWithMachine: false,
          allowDelicateWithNormal: true,
        };
      } else if (level === "strict") {
        newOptions = {
          ...prev,
          useTemperatureMatching: true,
          useRestrictionMatching: true,
          temperatureTolerance: 10,
          treatEmptyAsCompatible: false,
          allowHandWashWithMachine: false,
          allowDelicateWithNormal: false,
        };
      }
      console.log(`New options after setting ${level}:`, newOptions);
      return newOptions;
    });
  };

  const StrictnessButton = ({ level, title, description }) => {
    const choosenLevel = wichStrictnessIsActive(localOptions);
    if (choosenLevel == level) {
      console.log("Selected level:", level);
    }

    return (
      <TouchableOpacity
        className={`p-3 rounded-lg border-2 mb-2 ${
          choosenLevel === level
            ? "border-primary-100 bg-primary-50"
            : "border-gray-200 bg-white"
        }`}
        onPress={() => setSetting(level)}
      >
        <Text
          className={`font-pmedium ${
            choosenLevel === level ? "text-primary-100" : "text-gray-800"
          }`}
        >
          {title}
        </Text>
        <Text className="text-sm text-gray-600 mt-1">{description}</Text>
      </TouchableOpacity>
    );
  };

  const SettingRow = ({
    title,
    description,
    value, // Będzie booleanem (true/false) dla stanu zaznaczenia
    onValueChange,
    type = "toggle", // Zmiana domyślnego typu na "toggle" dla lepszej nazwy
  }) => {

    // Funkcja obsługująca zmianę wartości
    const handleToggle = () => {
      const newValue = !value;
      onValueChange(newValue);
    };

    /**
     * Własny komponent przełącznika (Toggle Switch)
     * Używa warunkowych klas Native Wind do stylizacji "szyny" i przesunięcia "gałki".
     */
    const ToggleSwitch = () => (
      // Zewnętrzny TouchableOpacity pełni rolę interaktywnej "szyny" przełącznika
      <TouchableOpacity
        onPress={handleToggle}
        activeOpacity={0.8}
        // 'value' na true -> tło primary-100 (np. niebieskie/zielone), 'value' na false -> tło neutral-400 (szare)
        className={`w-12 h-8 rounded-full p-0.5 ${
          value ? "bg-primary-100" : "bg-neutral-400"
        } transition duration-300 ease-in-out`}
      >
        {/* Wewnętrzny View to "gałka" przełącznika */}
        <View
          // 'value' na true -> klasa 'translate-x-6' (przesunięcie o 24px, bo szyna ma w-12/48px), 'value' na false -> brak przesunięcia
          className={`w-7 h-7 bg-white rounded-full shadow-md ${
            value ? "translate-x-4" : "translate-x-0"
          } transition duration-300 ease-in-out`}
        />
      </TouchableOpacity>
    );

    return (
      <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
        <View className="flex-1 mr-4">
          <Text className="font-pmedium text-gray-800">{title}</Text>
          {description && (
            <Text className="text-sm text-gray-600 mt-1">{description}</Text>
          )}
        </View>
        {/* Warunkowe renderowanie: domyślnie używamy naszego Custom Switcha */}
        {type === "toggle" && <ToggleSwitch />}

        {/* Opcjonalnie, jeśli chcesz zachować stary, prosty "checkbox" z tekstem: */}
        {type === "checkbox" && (
          <TouchableOpacity onPress={handleToggle} activeOpacity={0.8}>
            <Text
              className={`text-2xl ${
                value ? "text-primary-100" : "text-gray-300"
              }`}
            >
              {/* Wróciłem do kropki dla 'on', bo kwadrat z pytania był tylko wizualizacją */}
              {value ? "✅" : "⬜"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const NumberInput = ({
    title,
    value,
    onValueChange,
    min = 1,
    max = 20,
    unit = "",
  }) => (
    <View className="flex-row items-center justify-between py-3 border-b border-gray-100">
      <View className="flex-1 mr-4">
        <Text className="font-pmedium text-gray-800">{title}</Text>
      </View>
      <View className="flex-row items-center">
        <TouchableOpacity
          className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
          onPress={() => onValueChange(Math.max(min, value - 1))}
        >
          <Text className="font-bold text-gray-600">-</Text>
        </TouchableOpacity>
        <Text className="mx-3 font-pmedium text-gray-800 min-w-[40px] text-center">
          {value}
          {unit}
        </Text>
        <TouchableOpacity
          className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
          onPress={() => onValueChange(Math.min(max, value + 1))}
        >
          <Text className="font-bold text-gray-600">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 border-b border-gray-200">
          <View className="flex-row items-center">
            <Settings size={24} color="#264653" />
            <Text className="font-bold text-xl ml-2 text-gray-800">
              Ustawienia Prania
            </Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <X size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4">
          {/* Podstawowe ustawienia */}
          <View className="mb-6">
            <Text className="font-bold text-lg text-gray-800 mb-3">
              Podstawowe ustawienia
            </Text>

            <NumberInput
              title="Maksymalna liczba ubrań na ładunek"
              value={localOptions.maxItemsPerLoad}
              onValueChange={(value) => updateOption("maxItemsPerLoad", value)}
              min={3}
              max={15}
            />

            <NumberInput
              title="Minimalna liczba ubrań na ładunek"
              value={localOptions.minItemsPerLoad}
              onValueChange={(value) => updateOption("minItemsPerLoad", value)}
              min={1}
              max={10}
            />
          </View>

          {/* Poziom restrykcyjności */}
          <View className="mb-6">
            <Text className="font-bold text-lg text-gray-800 mb-3">
              Poziom restrykcyjności
            </Text>

            <StrictnessButton
              level="loose"
              title="Swobodny 🟢"
              description="Grupowanie głównie według kolorów, metki mało istotne"
            />

            <StrictnessButton
              level="medium"
              title="Zrównoważony 🟡"
              description="Uwzględnia temperaturę i podstawowe wymagania"
            />

            <StrictnessButton
              level="strict"
              title="Restrykcyjny 🔴"
              description="Ścisłe przestrzeganie wszystkich symboli prania"
            />

            <StrictnessButton
              level="custom"
              title="Niestandardowy ⚙️"
              description="Dostosuj ustawienia ręcznie"
            />
          </View>

          {/* Szczegółowe ustawienia metek */}
          <View className="mb-6">
            <View className="flex-row items-center mb-3">
              <Text className="font-bold text-lg text-gray-800">
                Ustawienia niestandardowe
              </Text>
              <Info size={16} color="#6b7280" className="ml-2" />
            </View>
            <SettingRow
              title="Ubrania bez metek jako kompatybilne"
              description="Ubrania bez metek mogą być prane z dowolnymi innymi"
              value={localOptions.treatEmptyAsCompatible}
              onValueChange={(value) =>
                updateOption("treatEmptyAsCompatible", value)
              }
            />

            <SettingRow
              title="Dopasowanie temperatury"
              description="Grupuj według temperatury prania"
              value={localOptions.useTemperatureMatching}
              onValueChange={(value) =>
                updateOption("useTemperatureMatching", value)
              }
            />

            {localOptions.useTemperatureMatching && (
              <NumberInput
                title="Tolerancja temperatury"
                value={localOptions.temperatureTolerance}
                onValueChange={(value) =>
                  updateOption("temperatureTolerance", value)
                }
                min={0}
                max={30}
                unit="°C"
              />
            )}

            <SettingRow
              title="Łącz pranie ręczne z maszynowym"
              description="Pozwól na pranie ubrań z metką 'ręczne' razem z maszynowymi"
              value={localOptions.allowHandWashWithMachine}
              onValueChange={(value) =>
                updateOption("allowHandWashWithMachine", value)
              }
            />

            <SettingRow
              title="Łącz delikatne z normalnym"
              description="Pozwól na pranie ubrań delikatnych razem z normalnym praniem"
              value={localOptions.allowDelicateWithNormal}
              onValueChange={(value) =>
                updateOption("allowDelicateWithNormal", value)
              }
            />

            <SettingRow
              title="Uwzględniaj zakazy"
              description="Wykluczaj ubrania z zakazami (DN_wash, itp.)"
              value={localOptions.useRestrictionMatching}
              onValueChange={(value) =>
                updateOption("useRestrictionMatching", value)
              }
            />
          </View>

          {/* Info box */}
          {/* <View className="bg-blue-50 p-4 rounded-lg mb-6">
            <View className="flex-row items-start">
              <Info size={16} color="#2563eb" className="mt-0.5 mr-2" />
              <View className="flex-1">
                <Text className="text-sm text-blue-800 font-pmedium mb-1">
                  Jak to działa?
                </Text>
                <Text className="text-xs text-blue-700">
                  • <Text className="font-pmedium">Swobodny:</Text> Głównie
                  kolory, metki ignorowane{"\n"}•{" "}
                  <Text className="font-pmedium">Zrównoważony:</Text>{" "}
                  Temperatura + podstawowe wymagania{"\n"}•{" "}
                  <Text className="font-pmedium">Restrykcyjny:</Text> Wszystkie
                  symbole muszą pasować
                </Text>
              </View>
            </View>
          </View> */}
        </ScrollView>

        {/* Footer */}
        <View className="p-4 border-t border-gray-200">
          <View className="flex-row space-x-3">
            <TouchableOpacity
              className="flex-1 bg-gray-200 p-3 rounded-lg"
              onPress={() => {
                setLocalOptions(options);
                onClose();
              }}
            >
              <Text className="text-center font-pmedium text-gray-700">
                Anuluj
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-primary-100 p-3 rounded-lg"
              onPress={handleSave}
            >
              <Text className="text-center font-pmedium text-white">
                Zapisz ustawienia
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
