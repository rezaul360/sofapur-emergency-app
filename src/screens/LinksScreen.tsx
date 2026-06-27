import React from "react";
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
import { importantLinks } from "../components/contactsData";

const openWebsite = (url: string) => {
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        Alert.alert("ত্রুটি", "লিঙ্কটি ওপেন করা সম্ভব হচ্ছে না।");
      }
    })
    .catch((err) => console.error("URL Error:", err));
};

export default function LinksScreen({ navigation }: any) {
  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d9488" />
      <View
        style={[globalStyles.detailsHeader, { backgroundColor: "#0d9488" }]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={globalStyles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={globalStyles.detailsHeaderTitle}>
          গুরুত্বপূর্ণ লিঙ্কসমূহ
        </Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView
        style={globalStyles.scrollView}
        contentContainerStyle={{ padding: 20 }}
      >
        {importantLinks.map((link, index) => (
          <View key={index} style={globalStyles.contactCard}>
            <View style={globalStyles.contactInfo}>
              <Text style={globalStyles.contactName}>{link.title}</Text>
              <Text style={globalStyles.contactSub}>{link.sub}</Text>
            </View>
            <TouchableOpacity
              style={[globalStyles.callButton, { backgroundColor: "#0d9488" }]}
              onPress={() => openWebsite(link.url)}
            >
              <Ionicons name="globe-outline" size={14} color="#ffffff" />
              <Text style={globalStyles.callButtonText}>ওপেন</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
