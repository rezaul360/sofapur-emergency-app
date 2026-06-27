import React, { useState } from "react";
import { StatusBar, ScrollView, Alert, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// 📦 গ্লোবাল রিসোর্স এবং কাস্টম কম্পোনেন্টসমূহ
import { globalStyles } from "./src/components/styles/globalStyles";
import LoginModal from "./src/components/LoginModal";
import AdminLoginModal from "./src/components/AdminLoginModal"; // 🟢 নতুন অ্যাডমিন মডাল ইমপোর্ট
import HeaderSection from "./src/components/HeaderSection";
import SearchBarSection from "./src/components/SearchBarSection";
import GridOrListSection from "./src/components/GridOrListSection";
import SideDrawer from "./src/components/SideDrawer";
import { categories } from "./src/components/contactsData";
import GuideScreen from "./src/screens/GuideScreen";

// 🖥️ স্ক্রিনসমূহ ইমপোর্ট করুন
import DetailsScreen from "./src/screens/DetailsScreen";
import ComplaintScreen from "./src/screens/ComplaintScreen";
import LinksScreen from "./src/screens/LinksScreen";

// 🪝 কাস্টম হুক ইমপোর্ট করুন
import useHomeScreen from "./src/hooks/useHomeScreen";

const makeCall = (phoneNumber: string) => {
  const url = `tel:${phoneNumber}`;
  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        Alert.alert("দুঃখিত", "এই ডিভাইস থেকে কল করা সম্ভব নয়।");
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error("Call Error:", err));
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Complaint" component={ComplaintScreen} />
        <Stack.Screen name="Links" component={LinksScreen} />
        <Stack.Screen name="Guide" component={GuideScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// 🏠 মূল হোম স্ক্রিন পার্ট
function HomeScreen({ navigation }: any) {
  const {
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
  } = useHomeScreen();

  // 🟢 অ্যাডমিন লগইন মডাল দেখানোর জন্য স্টেট
  const [showAdminModal, setShowAdminModal] = useState(false);

  const handleAdminSuccess = () => {
    setShowAdminModal(false);
    Alert.alert("অভিনন্দন", "অ্যাডমিন ভেরিফিকেশন সফল হয়েছে!");
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />

      {/* হ্যামবার্গার মেনুসহ হেডার */}
      <HeaderSection
        animatedValue={animatedValue}
        noticeText={noticeText}
        onMenuPress={() => setShowDrawer(true)}
        userName={userName}
      />

      <ScrollView style={globalStyles.scrollView} bounces={false}>
        <SearchBarSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <GridOrListSection
          searchQuery={searchQuery}
          filteredContacts={filteredContacts}
          categories={categories}
          makeCall={makeCall}
          navigation={navigation}
        />
      </ScrollView>

      {/* 🎛️ সাইডবার ড্রয়ার মেনু */}
      <SideDrawer
        show={showDrawer}
        onClose={() => setShowDrawer(false)}
        userName={userName}
        navigation={navigation}
        onAdminPress={() => {
          setShowDrawer(false); // প্রথমে সাইডবার ড্রয়ারটি বন্ধ হবে
          setShowAdminModal(true); // তারপর অ্যাডমিন পিন মডালটি ওপেন হবে
        }}
      />

      {/* 🔐 স্বাগতম লগইন মডাল */}
      <LoginModal
        show={showLoginModal}
        name={userName}
        setName={setUserName}
        phone={userPhone}
        setPhone={setUserPhone}
        onLogin={handleModalLogin}
      />

      {/* 🔑 অ্যাডমিন যাচাইকরণ পিন মডাল */}
      <AdminLoginModal
        show={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onVerifySuccess={handleAdminSuccess}
      />
    </SafeAreaView>
  );
}
