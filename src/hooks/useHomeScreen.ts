import { useState, useEffect, useRef } from "react";
import { Animated, Dimensions, Alert } from "react-native";
import { contactsData } from "../components/contactsData";

const screenWidth = Dimensions.get("window").width;

export default function useHomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const noticeText =
    "📢 বিশেষ বিজ্ঞপ্তি: আগামী রবিবার সফাপুর ইউনিয়ন স্বাস্থ্য কেন্দ্রে বিনামূল্যে চক্ষু ক্যাম্প অনুষ্ঠিত হবে। জরুরী প্রয়োজনে সরাসরি কল করুন।";
  const animatedValue = useRef(new Animated.Value(screenWidth)).current;

  // নোটিশ অ্যানিমেশন লজিক
  useEffect(() => {
    const startAnimation = () => {
      animatedValue.setValue(screenWidth);
      Animated.timing(animatedValue, {
        toValue: -700,
        duration: 16000,
        useNativeDriver: true,
      }).start(() => startAnimation());
    };
    startAnimation();
  }, [animatedValue]);

  // লগইন হ্যান্ডলার
  const handleModalLogin = () => {
    if (!userName.trim()) {
      Alert.alert("ত্রুটি", "অনুগ্রহ করে আপনার নাম লিখুন।");
      return;
    }
    setShowLoginModal(false);
    Alert.alert(
      "স্বাগতম",
      `${userName}, সফাপুর ইউপি ইমার্জেন্সি সেবা অ্যাপে আপনাকে স্বাগতম!`,
    );
  };

  // সার্চ ফিল্টারিং লজিক
  const filteredContacts = (() => {
    if (!searchQuery.trim()) return [];
    let allContacts: { name: string; phone: string; sub?: string }[] = [];
    Object.values(contactsData).forEach((list) => {
      allContacts = [...allContacts, ...list];
    });
    return allContacts.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery),
    );
  })();
  // ১. আপনার হুকের ভেতর নতুন স্টেটটি যোগ করুন:
  const [showDrawer, setShowDrawer] = useState(false);

  // সবকিছু অবজেক্ট আকারে রিটার্ন করা হচ্ছে
  return {
    searchQuery,
    setSearchQuery,
    showLoginModal,
    userName,
    setUserName,
    userPhone,
    setUserPhone,
    noticeText,
    animatedValue,
    handleModalLogin,
    filteredContacts,
    showDrawer,
    setShowDrawer,
  };
}
