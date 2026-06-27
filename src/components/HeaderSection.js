import React from "react";
import { View, Text, Animated } from "react-native";
import { globalStyles } from "./styles/globalStyles";

export default function HeaderSection({ animatedValue, noticeText }) {
  return (
    <View>
      {/* নোটিশ বোর্ড */}
      <View style={globalStyles.noticeContainer}>
        <View style={globalStyles.noticeLabel}>
          <Text style={globalStyles.noticeLabelText}>ঘোষণা</Text>
        </View>
        <View style={globalStyles.noticeScrollArea}>
          <Animated.View style={{ transform: [{ translateX: animatedValue }] }}>
            <Text numberOfLines={1} style={globalStyles.noticeText}>
              {noticeText}
            </Text>
          </Animated.View>
        </View>
      </View>

      {/* হেডার পার্ট */}
      <View style={globalStyles.headerContainer}>
        <Text style={globalStyles.subTitle}>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</Text>
        <Text style={globalStyles.mainTitle}>
          সফাপুর ইউ পি ইমার্জেন্সি সেবা
        </Text>
        <View style={globalStyles.badge}>
          <Text style={globalStyles.badgeText}>জরুরী যোগাযোগ ডিরেক্টরি</Text>
        </View>
      </View>
    </View>
  );
}
