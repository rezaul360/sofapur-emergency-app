import React, { useState } from "react";
import { StatusBar, ScrollView, View, Linking, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// ইমপোর্টসমূহ
import ProfileScreen from "./src/screens/ProfileScreen";
import HeaderSection from "./src/components/HeaderSection";
import SearchBarSection from "./src/components/SearchBarSection";
import GridOrListSection from "./src/components/GridOrListSection";
import SideDrawer from "./src/components/SideDrawer";
import LoginModal from "./src/components/LoginModal";
import AdminLoginModal from "./src/components/AdminLoginModal";
import GuideScreen from "./src/screens/GuideScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import ComplaintScreen from "./src/screens/ComplaintScreen";
import LinksScreen from "./src/screens/LinksScreen";
import { categories } from "./src/components/contactsData";
import { globalStyles } from "./src/components/styles/globalStyles";
import useHomeScreen from "./src/hooks/useHomeScreen";

const Stack = createNativeStackNavigator();

// কল করার ফাংশন
const makeCall = (phoneNumber: string) => {
  const url = `tel:${phoneNumber}`;
  Linking.canOpenURL(url).then((supported) => {
    if (!supported) {
      Alert.alert("দুঃখিত", "এই ডিভাইস থেকে কল করা সম্ভব নয়।");
    } else {
      Linking.openURL(url);
    }
  });
};

export default function App() {
  return (
    <NavigationContainer>
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

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />

      {/* ১. হেডার */}
      <HeaderSection
        animatedValue={animatedValue}
        noticeText={noticeText}
        onMenuPress={() => setShowDrawer(true)}
        userName={userName}
        navigation={navigation}
      />

      {/* ২. ফিক্সড সার্চ বার */}
      <View style={{ backgroundColor: "#fff", paddingVertical: 5 }}>
        <SearchBarSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </View>

      {/* ৩. স্ক্রলযোগ্য কনটেন্ট */}
      <ScrollView style={globalStyles.scrollView} bounces={false}>
        <GridOrListSection
          searchQuery={searchQuery}
          filteredContacts={filteredContacts}
          categories={categories}
          makeCall={makeCall}
          navigation={navigation}
        />
      </ScrollView>

      {/* ড্রয়ার ও মডাল */}
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
        onVerifySuccess={() => setShowAdminModal(false)}
      />
    </SafeAreaView>
  );
}
