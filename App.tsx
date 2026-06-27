import React, { useState } from "react";
import { StatusBar, ScrollView, Alert, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// 📦 গ্লোবাল রিসোর্স এবং কাস্টম কম্পোনেন্টসমূহ
import { globalStyles } from "./src/components/styles/globalStyles";
import LoginModal from "./src/components/LoginModal";
import AdminLoginModal from "./src/components/AdminLoginModal";
import HeaderSection from "./src/components/HeaderSection";
import SearchBarSection from "./src/components/SearchBarSection";
import GridOrListSection from "./src/components/GridOrListSection";
import SideDrawer from "./src/components/SideDrawer";
import { categories } from "./src/components/contactsData";

// 🖥️ স্ক্রিনসমূহ
import GuideScreen from "./src/screens/GuideScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import ComplaintScreen from "./src/screens/ComplaintScreen";
import LinksScreen from "./src/screens/LinksScreen";
import ProfileScreen from "./src/screens/ProfileScreen"; // 🟢 প্রোফাইল স্ক্রিন ইমপোর্ট

// 🪝 কাস্টম হুক
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
      {/* 🟢 Stack.Navigator এর ভেতরেই সব স্ক্রিন থাকতে হবে */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Complaint" component={ComplaintScreen} />
        <Stack.Screen name="Links" component={LinksScreen} />
        <Stack.Screen name="Guide" component={GuideScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// 🏠 মূল হোম স্ক্রিন
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

  const [showAdminModal, setShowAdminModal] = useState(false);

  const handleAdminSuccess = () => {
    setShowAdminModal(false);
    Alert.alert("অভিনন্দন", "অ্যাডমিন ভেরিফিকেশন সফল হয়েছে!");
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />

      <HeaderSection
        animatedValue={animatedValue}
        noticeText={noticeText}
        onMenuPress={() => setShowDrawer(true)}
        userName={userName}
        navigation={navigation}
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

      <SideDrawer
        show={showDrawer}
        onClose={() => setShowDrawer(false)}
        userName={userName}
        navigation={navigation}
        onAdminPress={() => {
          setShowDrawer(false);
          setShowAdminModal(true);
        }}
      />

      <LoginModal
        show={showLoginModal}
        name={userName}
        setName={setUserName}
        phone={userPhone}
        setPhone={setUserPhone}
        onLogin={handleModalLogin}
      />

      <AdminLoginModal
        show={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        onVerifySuccess={handleAdminSuccess}
      />
    </SafeAreaView>
  );
}
