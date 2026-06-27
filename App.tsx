import React, { useState } from "react";
import { StatusBar, ScrollView, View, Alert, Linking } from "react-native";
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

const makeCall = (phoneNumber: string) => {
  const url = `tel:${phoneNumber}`;
  Linking.canOpenURL(url).then((supported) => {
    if (supported) {
      Linking.openURL(url);
    } else {
      Alert.alert("দুঃখিত", "এই ডিভাইস থেকে কল করা সম্ভব নয়।");
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

  // শুধুমাত্র জরুরি সেবার আইডিগুলো (১ থেকে ৬) ফিল্টার করা হচ্ছে
  const emergencyIds = ["1", "2", "3", "4", "5", "6"];
  const emergencyCategories = categories.filter((cat) =>
    emergencyIds.includes(cat.id),
  );

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />

      {/* হেডার */}
      <HeaderSection
        animatedValue={animatedValue}
        noticeText={noticeText}
        onMenuPress={() => setShowDrawer(true)}
        userName={userName}
        navigation={navigation}
      />

      {/* ফিক্সড সার্চ বার */}
      <View style={{ backgroundColor: "#fff", paddingVertical: 5 }}>
        <SearchBarSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </View>

      {/* শুধুমাত্র জরুরি সেবার আইকনগুলো দেখানো হচ্ছে */}
      <ScrollView style={globalStyles.scrollView} bounces={false}>
        <GridOrListSection
          searchQuery={searchQuery}
          filteredContacts={filteredContacts}
          categories={emergencyCategories}
          makeCall={makeCall}
          navigation={navigation}
        />
      </ScrollView>

      {/* ড্রয়ার ও মডালসমূহ */}
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
