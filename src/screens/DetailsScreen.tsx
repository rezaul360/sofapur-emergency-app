import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../components/styles/globalStyles";
import { contactsData, bloodGroups } from "../components/contactsData";

const makeCall = (phoneNumber: string) => {
  const url = `tel:${phoneNumber}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        Alert.alert("দুঃখিত", "এই ডিভাইস থেকে কল করা সম্ভব নয়।");
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error("Call Error:", err));
};

export default function DetailsScreen({ route, navigation }: any) {
  const { categoryId, categoryTitle, color } = route.params;
  const contacts = contactsData[categoryId] || [];
  const [selectedGroup, setSelectedGroup] = useState("সব");
  const filteredContacts =
    categoryId === "7" && selectedGroup !== "সব"
      ? contacts.filter((c) => c.group === selectedGroup)
      : contacts;

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={color} />
      <View style={[globalStyles.detailsHeader, { backgroundColor: color }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={globalStyles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={globalStyles.detailsHeaderTitle}>
          {categoryTitle} ডিরেক্টরি
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {categoryId === "7" && (
        <View style={globalStyles.filterWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={globalStyles.filterScroll}
          >
            {bloodGroups.map((group) => (
              <TouchableOpacity
                key={group}
                style={[
                  globalStyles.filterChip,
                  selectedGroup === group
                    ? { backgroundColor: color }
                    : { backgroundColor: "#f1f5f9" },
                ]}
                onPress={() => setSelectedGroup(group)}
              >
                <Text
                  style={[
                    globalStyles.filterChipText,
                    selectedGroup === group
                      ? { color: "#fff" }
                      : { color: "#475569" },
                  ]}
                >
                  {group}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <ScrollView
        style={globalStyles.scrollView}
        contentContainerStyle={{ padding: 20 }}
      >
        {filteredContacts.length === 0 ? (
          <Text style={globalStyles.emptyText}>
            কোনো নম্বর খুঁজে পাওয়া যায়নি।
          </Text>
        ) : (
          filteredContacts.map((contact, index) => (
            <View key={index} style={globalStyles.contactCard}>
              <View style={globalStyles.contactInfo}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Text style={globalStyles.contactName}>{contact.name}</Text>
                  {contact.group && (
                    <View
                      style={[
                        globalStyles.badgeContainer,
                        { backgroundColor: color + "15" },
                      ]}
                    >
                      <Text
                        style={[globalStyles.badgeTextStyled, { color: color }]}
                      >
                        {contact.group}
                      </Text>
                    </View>
                  )}
                  {contact.designation && (
                    <View
                      style={[
                        globalStyles.badgeContainer,
                        { backgroundColor: color + "15" },
                      ]}
                    >
                      <Text
                        style={[globalStyles.badgeTextStyled, { color: color }]}
                      >
                        {contact.designation}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={[globalStyles.contactPhone, { color: color }]}>
                  <Ionicons name="call-outline" size={13} /> {contact.phone}
                </Text>
                {contact.sub && (
                  <Text style={globalStyles.contactSub}>{contact.sub}</Text>
                )}
              </View>
              <TouchableOpacity
                style={[globalStyles.callButton, { backgroundColor: color }]}
                onPress={() => makeCall(contact.phone)}
              >
                <Ionicons name="call" size={14} color="#ffffff" />
                <Text style={globalStyles.callButtonText}>কল করুন</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
