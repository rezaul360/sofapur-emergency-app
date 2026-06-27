import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { globalStyles } from "./styles/globalStyles";

export default function LoginModal({
  show,
  name,
  setName,
  phone,
  setPhone,
  onLogin,
}) {
  if (!show) return null;

  return (
    <View style={globalStyles.modalOverlay}>
      <View style={globalStyles.modalCard}>
        {/* গোল লোগো */}
        <View style={globalStyles.logoContainer}>
          <Text style={globalStyles.logoText}>🌾</Text>
        </View>

        <Text style={globalStyles.modalTitle}>সফাপুর ইউপি জরুরী সেবা</Text>
        <Text style={globalStyles.modalSubtitle}>
          শুরু করতে দয়া করে আপনার নামটি লিখুন
        </Text>

        <View style={globalStyles.form}>
          <Text style={globalStyles.inputLabel}>আপনার নাম *</Text>
          <TextInput
            style={globalStyles.formInput}
            placeholder="যেমন: রহিম মিয়া"
            placeholderTextColor="#94a3b8"
            value={name}
            onChangeText={setName}
          />

          <Text style={globalStyles.inputLabel}>মোবাইল নম্বর (ঐচ্ছিক)</Text>
          <TextInput
            style={globalStyles.formInput}
            placeholder="যেমন: 017XXXXXXXX"
            placeholderTextColor="#94a3b8"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <TouchableOpacity style={globalStyles.submitButton} onPress={onLogin}>
            <Text style={globalStyles.submitButtonText}>
              অ্যাপে প্রবেশ করুন ➔
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
