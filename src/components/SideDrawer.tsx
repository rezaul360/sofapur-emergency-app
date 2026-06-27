import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

interface SideDrawerProps {
  show: boolean;
  onClose: () => void;
  userName: string;
  navigation: any;
  onAdminPress: () => void;
}

export default function SideDrawer({
  show,
  onClose,
  userName,
  navigation,
  onAdminPress,
}: SideDrawerProps) {
  const slideAnim = useRef(new Animated.Value(-screenWidth)).current;

  useEffect(() => {
    if (show) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -screenWidth,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [show, slideAnim]);

  const firstLetter =
    userName && userName.trim().length > 0
      ? userName.trim()[0].toLowerCase()
      : "u";

  return (
    <Modal
      transparent
      visible={show}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />

        <Animated.View
          style={[
            styles.drawerContainer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          {/* হেডার পার্ট */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>সফাপুর সেবা</Text>
              <Text style={styles.headerSub}>ইউপি জরুরী সেবা ডিরেক্টরি</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* 🟢 আপডেট করা প্রোফাইল কার্ড - প্রোফাইল স্ক্রিনে নেভিগেট করবে */}
          <TouchableOpacity
            style={styles.profileCard}
            onPress={() => {
              onClose();
              navigation.navigate("Profile");
            }}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{firstLetter}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>
                {userName.trim() || "নাগরিক ইউজার"}
              </Text>
              <Text style={styles.profileRole}>নাগরিক ইউজার ➔</Text>
            </View>
          </TouchableOpacity>

          {/* মেনু আইটেমসমূহ */}
          <View style={styles.menuList}>
            <TouchableOpacity style={styles.menuItemActive} onPress={onClose}>
              <Ionicons name="home" size={20} color="#fff" />
              <Text style={styles.menuItemTextActive}>মূল পাতা</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                onClose();
                navigation.navigate("Guide");
              }}
            >
              <Ionicons name="book-outline" size={20} color="#94a3b8" />
              <Text style={styles.menuItemText}>অ্যাপ ব্যবহার নির্দেশিকা</Text>
            </TouchableOpacity>
          </View>

          {/* ফুটার - সুপার অ্যাডমিন লগইন */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.adminButton} onPress={onAdminPress}>
              <Ionicons
                name="key-outline"
                size={16}
                color="#fbbf24"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.adminButtonText}>সুপার অ্যাডমিন লগইন</Text>
            </TouchableOpacity>

            <View style={styles.creditContainer}>
              <Ionicons name="construct-outline" size={13} color="#64748b" />
              <Text style={styles.creditText}>ডেভেলপড বাই সফাপুর আইটি</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, flexDirection: "row" },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  drawerContainer: {
    width: screenWidth * 0.78,
    backgroundColor: "#0f172a",
    height: "100%",
    paddingTop: 50,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#10b981" },
  headerSub: { fontSize: 12, color: "#64748b", marginTop: 2 },
  closeButton: { backgroundColor: "#1e293b", padding: 6, borderRadius: 20 },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    margin: 20,
    padding: 15,
    borderRadius: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#10b981",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  profileInfo: { marginLeft: 12 },
  profileName: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  profileRole: { color: "#64748b", fontSize: 12, marginTop: 2 },
  menuList: { flex: 1, paddingHorizontal: 20 },
  menuItemActive: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10b981",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  menuItemTextActive: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  menuItemText: { color: "#94a3b8", fontSize: 15, marginLeft: 12 },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
    alignItems: "center",
  },
  adminButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 20,
    width: "100%",
    marginBottom: 12,
  },
  adminButtonText: { color: "#fff", fontSize: 14, fontWeight: "600" },
  creditContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  creditText: {
    color: "#64748b",
    fontSize: 12,
    marginLeft: 6,
    fontWeight: "500",
  },
});
