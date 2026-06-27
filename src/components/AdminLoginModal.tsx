import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AdminModalProps {
  show: boolean;
  onClose: () => void;
  onVerifySuccess: () => void;
}

export default function AdminLoginModal({
  show,
  onClose,
  onVerifySuccess,
}: AdminModalProps) {
  const [pin, setPin] = useState("");

  const handleVerify = () => {
    if (pin === "1234" || pin === "7890") {
      setPin("");
      onVerifySuccess(); // সফল হলে এই ফাংশনটি রান করবে
    } else {
      Alert.alert("ভুল পিন", "আপনার দেওয়া ৪ সংখ্যার অ্যাডমিন পিনটি সঠিক নয়।");
    }
  };

  return (
    <Modal
      transparent
      visible={show}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* 🔑 চাবি আইকন */}
          <View style={styles.iconContainer}>
            <Ionicons name="key" size={40} color="#eab308" />
          </View>

          <Text style={styles.title}>অ্যাডমিন যাচাইকরণ</Text>
          <Text style={styles.subtitle}>
            গোপন ৪ সংখ্যার অ্যাডমিন পিনটি লিখুন
          </Text>

          {/* 🔢 পিন ইনপুট বক্স */}
          <TextInput
            style={styles.pinInput}
            placeholder="• • • •"
            placeholderTextColor="#94a3b8"
            keyboardType="number-pad"
            maxLength={4}
            secureTextEntry={true}
            value={pin}
            onChangeText={setPin}
          />

          {/* 🔘 অ্যাকশন বাটনসমূহ */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>বন্ধ করুন</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleVerify}
            >
              <Text style={styles.submitButtonText}>প্রবেশ করুন</Text>
            </TouchableOpacity>
          </View>

          {/* 🔒 ডেমো পিন নোটিশ */}
          <View style={styles.demoNotice}>
            <Ionicons
              name="lock-closed"
              size={14}
              color="#64748b"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.demoText}>ডেমো পিন: 1234 অথবা 7890</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalCard: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 24,
    alignItems: "center",
    elevation: 5,
  },
  iconContainer: { transform: [{ rotate: "135deg" }], marginBottom: 10 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 6,
  },
  subtitle: { fontSize: 13, color: "#64748b", marginBottom: 20 },
  pinInput: {
    width: "100%",
    height: 54,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    textAlign: "center",
    fontSize: 24,
    letterSpacing: 10,
    color: "#0f172a",
    backgroundColor: "#f8fafc",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  closeButton: {
    flex: 1,
    height: 48,
    backgroundColor: "#f1f5f9",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  closeButtonText: { color: "#334155", fontSize: 15, fontWeight: "600" },
  submitButton: {
    flex: 1,
    height: 48,
    backgroundColor: "#059669",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: { color: "#ffffff", fontSize: 15, fontWeight: "600" },
  demoNotice: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  demoText: { color: "#64748b", fontSize: 12 },
});
