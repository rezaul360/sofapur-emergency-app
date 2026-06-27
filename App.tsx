import React from "react";
import { StatusBar, ScrollView, Alert, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// 📦 কাস্টম কম্পোনেন্ট ও গ্লোবাল স্টাইলসমূহ
import { globalStyles } from "./src/components/styles/globalStyles";
import LoginModal from "./src/components/LoginModal";
import HeaderSection from "./src/components/HeaderSection";
import SearchBarSection from "./src/components/SearchBarSection";
import GridOrListSection from "./src/components/GridOrListSection";
import SideDrawer from "./src/components/SideDrawer";
import { categories } from "./src/components/contactsData";

// 🖥️ স্ক্রিনসমূহ ইমপোর্ট
import DetailsScreen from "./src/screens/DetailsScreen";
import ComplaintScreen from "./src/screens/ComplaintScreen";
import LinksScreen from "./src/screens/LinksScreen";
import GuideScreen from "./src/screens/GuideScreen";

// 🪝 কাস্টম হুক ইমপোর্ট
import useHomeScreen from "./src/hooks/useHomeScreen";

// 📞 সরাসরি কল করার গ্লোবাল ফাংশন
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

// 🏠 মূল হোম স্ক্রিন কম্পোনেন্ট
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

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />

      {/* হ্যামবার্গার মেনুসহ হেডার সেকশন */}
      <HeaderSection
        animatedValue={animatedValue}
        noticeText={noticeText}
        onMenuPress={() => setShowDrawer(true)}
        userName={userName}
      />

      <ScrollView style={globalStyles.scrollView} bounces={false}>
        {/* সার্চ বার */}
        <SearchBarSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* ক্যাটাগরি গ্রিড অথবা সার্চের ফলাফল তালিকা */}
        <GridOrListSection
          searchQuery={searchQuery}
          filteredContacts={filteredContacts}
          categories={categories}
          makeCall={makeCall}
          navigation={navigation}
        />
      </ScrollView>

      {/* সাইডবার ড্রয়ার মেনু */}
      <SideDrawer
        show={showDrawer}
        onClose={() => setShowDrawer(false)}
        userName={userName}
        navigation={navigation}
      />

      {/* লগইন মডাল */}
      <LoginModal
        show={showLoginModal}
        name={userName}
        setName={setUserName}
        phone={userPhone}
        setPhone={setUserPhone}
        onLogin={handleModalLogin}
      />
    </SafeAreaView>
  );
}
