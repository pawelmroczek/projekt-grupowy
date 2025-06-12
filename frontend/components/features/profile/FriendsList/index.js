import { View, Text } from 'react-native'
import React from 'react'
import VerticalList from './VertitalList'

export default function FriendsList() {
  return (
    <View className="w-full bg-white rounded-xl mt-4">
      <Text className="text-xl font-bold p-2">Znajomi:</Text>
      <VerticalList />
    </View>
  )
}