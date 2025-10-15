import React, { use } from "react";
import { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList} from "react-native";
import { TokenContext } from "../../TokenContext";
import FormField from "../../../components/common/FormField";
import { loginUser } from "../../../lib/authorization/authorization";
import { getUserInfo } from "../../../lib/friends/friends";
import { changePassword } from "../../../lib/authorization/authorization";
import { router } from "expo-router";



const changePasswordPage = () => {

    
    const { token, setToken } = useContext(TokenContext);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getUserInfo(token);
                setEmail(response.email);
            } catch (error) {
                console.error("Błąd przy pobieraniu danych:", error);
            }
        };
        
        fetchData();
    }, [token]);

    const handleChangePassword = async () => {
        // Implementacja logiki zmiany hasła
        if (newPassword !== confirmPassword) {
            alert("Nowe hasła nie są takie same!");
            return;
        }
        // Tutaj dodaj logikę wysyłania żądania zmiany hasła do serwera
        const login = await loginUser(email, oldPassword);
        if(login.status === "error"){
            alert("Stare hasło jest niepoprawne!");
            return;
        }
        const response = await changePassword(token, newPassword);
        if(response.success === false){
            alert("Wystąpił błąd podczas zmiany hasła. Spróbuj ponownie.");
            return;
        }
        alert("Hasło zostało zmienione pomyślnie!");
        router.back();
    };

    return (
        <View className="p-4 space-y-4 mt-4">
            <Text className="text-xl font-bold mb-4 text-gray-900">Zmień hasło</Text>
            <View className="items-start justify-start mt-4">
                <FormField
                    title="Stare hasło"
                    placeholder="Wprowadź swoje hasło"
                    value={oldPassword}
                    handleChangeText={setOldPassword}
                />
                <FormField
                    value={newPassword}
                    handleChangeText={setNewPassword}
                    title="Hasło"
                    placeholder="Wprowadź swoje nowe hasło"
                    otherStyles={"mt-4"}
                />
                <FormField
                    value={confirmPassword}
                    handleChangeText={setConfirmPassword}
                    title="Powtórz hasło"
                    placeholder="Wprowadź swoje nowe hasło"
                    otherStyles={"mt-4"}
                />
            </View>
            <TouchableOpacity className="bg-primary-100 rounded-lg p-3 items-center active:scale-95"
                onPress={handleChangePassword}>
                <Text className="text-white font-semibold">Zmień hasło</Text>
            </TouchableOpacity>
        </View>
    );
}

export default changePasswordPage;

