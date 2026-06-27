import React from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HeaderSection({
  animatedValue,
  noticeText,
  onMenuPress,
  userName,
}: any) {
  return (
    <View style={styles.headerMainWrapper}>
      {/* নোটিশ বোর্ড সেকশন */}
      <View style={styles.noticeContainer}>
        <View style={styles.noticeBadge}>
          <Text style={styles.noticeBadgeText}>ঘোষণা</Text>
        </View>
        <Animated.Text
          style={[
            styles.noticeText,
            { transform: [{ translateX: animatedValue }] },
          ]}
        >
          {noticeText}
        </Animated.Text>
      </View>

      {/* 🟢 নতুন কাস্টম হেডার বার (Screenshot_1 অনুযায়ী) */}
      <View style={styles.topAppBar}>
        <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
          <Ionicons name="menu" size={28} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.appTitle}>সফাপুর ইউপি জরুরী সেবা</Text>
        <View style={styles.smallAvatar}>
          <Text style={styles.smallAvatarText}>
            {userName ? userName[0].toLowerCase() : "u"}
          </Text>
        </View>
      </View>

      {/* সাব হেডার ব্যানার */}
      <View style={styles.bannerSection}>
        <Text style={styles.bannerSub}>
          বিপদে আপদে তাৎক্ষণিক সহায়তার বিশ্বস্ত অফলাইন ডিরেক্টরি
        </Text>
        <Text style={styles.bannerMain}>জরুরি প্রয়োজনে সরাসরি কল করুন</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerMainWrapper: {
    backgroundColor: "#059669",
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  noticeContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 35,
    alignItems: "center",
    overflow: "hidden",
  },
  noticeBadge: {
    backgroundColor: "#dc2626",
    paddingHorizontal: 12,
    height: "100%",
    justifyContent: "center",
    zIndex: 2,
  },
  noticeBadgeText: { color: "#fff", fontWeight: "bold", fontSize: 13 },
  noticeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "500",
    position: "absolute",
    width: 800,
  },
  topAppBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 15,
  },
  iconButton: { padding: 4 },
  appTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  smallAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  smallAvatarText: { color: "#fff", fontSize: 15, fontWeight: "bold" },
  bannerSection: { alignItems: "center", marginTop: 25, paddingHorizontal: 20 },
  bannerSub: {
    color: "#a7f3d0",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 8,
  },
  bannerMain: {
    color: "#fef08a",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 34,
  },
});
