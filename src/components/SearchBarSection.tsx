import React from "react";
import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "./styles/globalStyles";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (text: string) => void;
}

export default function SearchBarSection({
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  return (
    <View style={globalStyles.searchSection}>
      <View style={globalStyles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#64748b"
          style={globalStyles.searchIcon}
        />
        <TextInput
          style={globalStyles.input}
          placeholder="নাম বা মোবাইল নম্বর লিখে খুঁজুন..."
          placeholderTextColor="#94a3b8"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        {searchQuery.length > 0 && (
          <Ionicons
            name="close-circle"
            size={18}
            color="#94a3b8"
            onPress={() => setSearchQuery("")}
          />
        )}
      </View>
    </View>
  );
}
