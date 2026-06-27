import React from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function GuideScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      {/* 🔙 ব্যাক বাটন বা মূল পাতায় ফিরে যান */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={18} color="#475569" />
        <Text style={styles.backButtonText}>মূল পাতায় ফিরে যান</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 📘 নির্দেশিকা কার্ড */}
        <View style={styles.guideCard}>
          <View style={styles.cardHeader}>
            <Ionicons
              name="book-outline"
              size={24}
              color="#0f172a"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.cardTitle}>অ্যাপটি কীভাবে ব্যবহার করবেন?</Text>
          </View>

          {/* পয়েন্ট ১ */}
          <View style={styles.pointRow}>
            <Text style={styles.pointText}>
              ১. <Text style={styles.boldText}>সহজ সন্ধান:</Text> আপনার
              প্রয়োজনীয় বিভাগের আইকনে (যেমন: অ্যাম্বুলেন্স, বিদ্যুৎ) ক্লিক করলেই
              ফিল্টার হয়ে শুধু ওই নম্বরগুলো সামনে আসবে।
            </Text>
          </View>

          {/* পয়েন্ট ২ */}
          <View style={styles.pointRow}>
            <Text style={styles.pointText}>
              ২. <Text style={styles.boldText}>অফলাইন ব্যবহার:</Text> অ্যাপটি
              একবার ইনস্টল করে ওপেন করলে এরপর নেট ছাড়াই যেকোনো তথ্য দেখতে পাবেন।
            </Text>
          </View>

          {/* পয়েন্ট ৩ */}
          <View style={styles.pointRow}>
            <Text style={styles.pointText}>
              ৩. <Text style={styles.boldText}>সরাসরি কল:</Text> "কল দিন" বাটনে
              ক্লিক করলে আপনার ফোনের ডায়াল প্যাডে চলে যাবে এবং সরাসরি কথা বলতে
              পারবেন।
            </Text>
          </View>

          {/* পয়েন্ট ৪ */}
          <View style={styles.pointRow}>
            <Text style={styles.pointText}>
              ４. <Text style={styles.boldText}>শেয়ারিং:</Text> লিঙ্ক আইকনটিতে
              চাপ দিয়ে পরিবারের সদস্য ও বন্ধুদের সাথে নম্বরগুলো শেয়ার করতে
              পারেন।
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  backButtonText: {
    color: "#475569",
    fontSize: 15,
    marginLeft: 6,
    fontWeight: "500",
  },
  scrollContent: { padding: 20, alignItems: "center" },
  guideCard: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    paddingBottom: 12,
  },
  cardTitle: { fontSize: 20, fontWeight: "bold", color: "#0f172a" },
  pointRow: { marginBottom: 20 },
  pointText: { fontSize: 15, color: "#334155", lineHeight: 26 },
  boldText: { fontWeight: "bold", color: "#0f172a" },
});
