import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

interface ProfileScreenProps {
  navigation: any;
  route?: any;
  userName?: string;
  userPhone?: string;
  onLogout?: () => void;
}

export default function ProfileScreen({
  navigation,
  route,
  userName = "hjffff",
  userPhone = "",
  onLogout,
}: ProfileScreenProps) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ব্যাক বাটন */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={18} color="#475569" />
        <Text style={styles.backText}>মূল পাতায় ফিরে যান</Text>
      </TouchableOpacity>

      {/* প্রোফাইল কার্ড */}
      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={80} color="#059669" />
        </View>

        <Text style={styles.nameText}>{userName}</Text>
        <Text style={styles.phoneText}>
          মোবাইল: {userPhone.trim() ? userPhone : "প্রদান করা হয়নি"}
        </Text>

        {/* ভূমিকা নোটিশ বক্স */}
        <View style={styles.infoBox}>
          <View style={styles.infoTitleRow}>
            <Ionicons
              name="information-circle"
              size={18}
              color="#0284c7"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.infoTitle}>ব্যবহারকারীর ভূমিকা:</Text>
          </View>
          <Text style={styles.infoDescription}>
            আপনি একজন সাধারণ নাগরিক হিসেবে অ্যাপটিতে যুক্ত আছেন। যেকোনো প্রয়োজনে
            সরাসরি সেবা প্রদানকারীদের নম্বরে ফ্রি কল করতে পারবেন।
          </Text>
        </View>

        {/* লগআউট বাটন */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={18}
            color="#ffffff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.logoutButtonText}>
            অ্যাকাউন্ট পরিবর্তন করুন / লগআউট
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 20,
  },
  backText: {
    fontSize: 15,
    color: "#475569",
    marginLeft: 6,
    fontWeight: "500",
  },
  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 3,
    width: "100%",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e2f0ec",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
    textAlign: "center",
  },
  phoneText: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 20,
    textAlign: "center",
  },
  infoBox: {
    backgroundColor: "#f0fdf4",
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: "#dcfce7",
    width: "100%",
    marginBottom: 20,
  },
  infoTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#166534",
    flexShrink: 1,
  },
  infoDescription: {
    fontSize: 13,
    color: "#15803d",
    lineHeight: 18,
    textAlign: "justify",
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#ef4444",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    flexShrink: 1,
  },
});
