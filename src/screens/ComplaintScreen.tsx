import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../components/styles/globalStyles";

export default function ComplaintScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const sendComplaint = () => {
    if (!name.trim() || !phone.trim() || !message.trim()) {
      Alert.alert("ত্রুটি", "অনুগ্রহ করে সবগুলো তথ্য পূরণ করুন।");
      return;
    }
    const adminWhatsAppNumber = "8801711111111";
    const formattedText = `📝 *নতুন অভিযোগ/মতামত*\n\n👤 *নাম:* ${name}\n📞 *মোবাইল:* ${phone}\n💬 *বার্তা:* ${message}`;
    const url = `whatsapp://send?phone=${adminWhatsAppNumber}&text=${encodeURIComponent(formattedText)}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) return Linking.openURL(url);
        Alert.alert("দুঃখিত", "আপনার ফোনে হোয়াটসঅ্যাপ ইনস্টল করা নেই।");
      })
      .catch((err) => console.error(err));
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#a855f7" />
      <View
        style={[globalStyles.detailsHeader, { backgroundColor: "#a855f7" }]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={globalStyles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={globalStyles.detailsHeaderTitle}>অভিযোগ ও মতামত বক্স</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView
        style={globalStyles.scrollView}
        contentContainerStyle={{ padding: 20 }}
      >
        <View style={globalStyles.formCard}>
          <Text style={globalStyles.formInstruction}>
            সফাপুর ইউনিয়নের সার্বিক উন্নয়নে আপনার যেকোনো অভিযোগ সরাসরি আমাদের
            জানান।
          </Text>
          <Text style={globalStyles.complaintInputLabel}>আপনার নাম</Text>
          <TextInput
            style={globalStyles.complaintFormInput}
            placeholder="এখানে আপনার নাম লিখুন"
            value={name}
            onChangeText={setName}
          />
          <Text style={globalStyles.complaintInputLabel}>মোবাইল নম্বর</Text>
          <TextInput
            style={globalStyles.complaintFormInput}
            placeholder="এখানে আপনার মোবাইল নম্বর লিখুন"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <Text style={globalStyles.complaintInputLabel}>অভিযোগ বা বিবরণ</Text>
          <TextInput
            style={[
              globalStyles.complaintFormInput,
              { height: 120, textAlignVertical: "top" },
            ]}
            placeholder="আপনার সমস্যাটি বিস্তারিত লিখুন..."
            multiline={true}
            numberOfLines={5}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity
            style={globalStyles.complaintSubmitButton}
            onPress={sendComplaint}
          >
            <Ionicons name="paper-plane" size={18} color="#fff" />
            <Text style={globalStyles.complaintSubmitButtonText}>
              হোয়াটসঅ্যাপে জমা দিন
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
