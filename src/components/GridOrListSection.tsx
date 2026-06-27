import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "./styles/globalStyles";

interface GridOrListProps {
  searchQuery: string;
  filteredContacts: { name: string; phone: string; sub?: string }[];
  categories: { id: string; title: string; icon: string; color: string }[];
  makeCall: (phone: string) => void;
  navigation: any;
}

export default function GridOrListSection({
  searchQuery,
  filteredContacts,
  categories,
  makeCall,
  navigation,
}: GridOrListProps) {
  return searchQuery.trim().length > 0 ? (
    // 🔍 অনুসন্ধানের ফলাফল তালিকা (List View)
    <View style={globalStyles.listSection}>
      <Text style={globalStyles.sectionTitle}>অনুসন্ধানের ফলাফল</Text>
      {filteredContacts.length === 0 ? (
        <Text style={globalStyles.emptyText}>
          কোনো নম্বর খুঁজে পাওয়া যায়নি!
        </Text>
      ) : (
        filteredContacts.map((contact, idx) => (
          <View key={idx} style={globalStyles.contactCard}>
            <View style={globalStyles.contactInfo}>
              <Text style={globalStyles.contactName}>{contact.name}</Text>
              <Text style={globalStyles.contactPhone}>
                <Ionicons name="call-outline" size={13} /> {contact.phone}
              </Text>
            </View>
            <TouchableOpacity
              style={globalStyles.callButton}
              onPress={() => makeCall(contact.phone)}
            >
              <Ionicons name="call" size={14} color="#fff" />
              <Text style={globalStyles.callButtonText}>কল</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </View>
  ) : (
    // 🎛️ মূল ক্যাটাগরি গ্রিড (Grid View)
    <View style={globalStyles.gridSection}>
      <Text style={globalStyles.sectionTitle}>জরুরী সেবাসমূহ</Text>
      <View style={globalStyles.gridContainer}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              globalStyles.gridCard,
              (item.id === "7" ||
                item.id === "8" ||
                item.id === "9" ||
                item.id === "10") && { width: "100%" },
            ]}
            activeOpacity={0.7}
            onPress={() => {
              if (item.id === "9") {
                navigation.navigate("Complaint");
              } else if (item.id === "10") {
                navigation.navigate("Links");
              } else {
                navigation.navigate("Details", {
                  categoryId: item.id,
                  categoryTitle: item.title,
                  color: item.color,
                });
              }
            }}
          >
            <View
              style={[
                globalStyles.iconContainer,
                { backgroundColor: item.color + "15" },
              ]}
            >
              <Ionicons name={item.icon as any} size={26} color={item.color} />
            </View>
            <Text style={globalStyles.cardTitle}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
