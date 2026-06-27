import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// 📦 আমাদের গ্লোবাল স্টাইল এবং আলাদা করা কাস্টম কম্পোনেন্টসমূহ
import { globalStyles } from "./src/components/styles/globalStyles";
import LoginModal from "./src/components/LoginModal";
import HeaderSection from "./src/components/HeaderSection";

const screenWidth = Dimensions.get("window").width;

// কন্টাক্ট ডেটাবেজ
const contactsData: {
  [key: string]: {
    name: string;
    phone: string;
    sub?: string;
    group?: string;
    designation?: string;
  }[];
} = {
  "1": [
    {
      name: "সফাপুর ইউনিয়ন স্বাস্থ্য কেন্দ্র",
      phone: "01711111111",
      sub: "২৪ ঘণ্টা জরুরী বিভাগ",
    },
    {
      name: "উপজেলা স্বাস্থ্য কমপ্লেক্স",
      phone: "01722222222",
      sub: "অ্যাম্বুলেন্স ও ইমার্জেন্সি",
    },
    {
      name: "ডাঃ মোঃ ফাহিম (মেডিসিন)",
      phone: "01733333333",
      sub: "ভিজিট: বিকেল ৪টা - রাত ৮টা",
    },
  ],
  "2": [
    {
      name: "সফাপুর পুলিশ ফাঁড়ি (ওসি)",
      phone: "01811111111",
      sub: "যেকোনো আইনি সহায়তা",
    },
    {
      name: "নিকটস্থ মডেল থানা ডিউটি অফিসার",
      phone: "01822222222",
      sub: "জিডি ও অভিযোগ কেন্দ্র",
    },
  ],
  "3": [
    {
      name: "ফায়ার সার্ভিস স্টেশন (কন্ট্রোল রুম)",
      phone: "01911111111",
      sub: "অগ্নিদ্বারা বা দুর্ঘটনা জনিত সেবা",
    },
    {
      name: "স্টেশন অফিসার (ব্যক্তিগত নম্বর)",
      phone: "01922222222",
      sub: "জরুরী প্রয়োজনে",
    },
  ],
  "4": [
    {
      name: "সরকারি ইমার্জেন্সি অ্যাম্বুলেন্স",
      phone: "01311111111",
      sub: "ফ্রি ও পেইড সার্ভিস",
    },
    {
      name: "সফাপুর সেবা অ্যাম্বুলেন্স সোসাইটি",
      phone: "01322222222",
      sub: "২৪ ঘণ্টা রেডি",
    },
  ],
  "5": [
    {
      name: "পল্লী বিদ্যুৎ অভিযোগ কেন্দ্র",
      phone: "01511111111",
      sub: "বিদ্যুৎ বিভ্রাট ও অভিযোগ",
    },
    {
      name: "লাইনম্যান ইমার্জেন্সি ডিউটি",
      phone: "01522222222",
      sub: "সফাপুর এলাকা",
    },
  ],
  "6": [
    {
      name: "জাতীয় জরুরী সেবা (999)",
      phone: "999",
      sub: "পুলিশ, ফায়ার সার্ভিস ও অ্যাম্বুলেন্স",
    },
    {
      name: "सरकारी তথ্য ও সেবা (333)",
      phone: "333",
      sub: "যেকোনো সামাজিক তথ্য",
    },
    {
      name: "নারী ও শিশু নির্যাতন প্রতিরোধ (109)",
      phone: "109",
      sub: "হেল্পলাইন",
    },
  ],
  "7": [
    {
      name: "মোঃ রাকিব হাসান",
      phone: "01700000001",
      sub: "শেষ রক্তদান: ২ মাস আগে",
      group: "A+",
    },
    {
      name: "আরিফ আহমেদ",
      phone: "01700000002",
      sub: "রক্তদানে সর্বদা প্রস্তুত",
      group: "O+",
    },
  ],
  "8": [
    {
      name: "আলহাজ্ব মো: আবদুর রহমান",
      phone: "01711223344",
      sub: "সফাপুর ইউনিয়ন পরিষদ",
      designation: "ইউপি চেয়ারম্যান",
    },
    {
      name: "মো: শফিকুল ইসলাম",
      phone: "01711556677",
      sub: "১ নং ওয়ানড (সফাপুর গ্রাম)",
      designation: "ইউপি মেম্বার",
    },
  ],
};

const importantLinks = [
  {
    title: "অনлайн জন্ম-মৃত্যু নিবন্ধন",
    sub: "জন্ম নিবন্ধন আবেদন ও যাচাই পোর্টাল",
    url: "https://bdris.gov.bd/",
  },
  {
    title: "জাতীয় পরিচয়পত্র (NID) সেবা",
    sub: "এনআইডি কার্ড ডাউনলোড ও সংশোধন",
    url: "https://services.nidw.gov.bd/",
  },
  {
    title: "অনлайн ই-পাসপোর্ট আবেদন",
    sub: "পাসপোর্ট স্ট্যাটাস ও নতুন আবেদন",
    url: "https://www.epassport.gov.bd/",
  },
  {
    title: "ইউনিয়ন পরিষদ ট্যাক্স পোর্টাল",
    sub: "ইউপি হোল্ডিং ট্যাক্স অনলাইন পেমেন্ট",
    url: "https://upax.gov.bd/",
  },
  {
    title: "জাতীয় তথ্য বাতায়ন",
    sub: "বাংলাদেশ সরকারের কেন্দ্রীয় তথ্য পোর্টাল",
    url: "https://bangladesh.gov.bd/",
  },
];

const categories = [
  { id: "1", title: "হাসপাতাল ও ডাক্তার", icon: "medical", color: "#ef4444" },
  { id: "2", title: "থানা ও police", icon: "shield-half", color: "#3b82f6" },
  { id: "3", title: "ফায়ার সার্ভিস", icon: "flame", color: "#f97316" },
  { id: "4", title: "অ্যাম্বুলেন্স", icon: "bus", color: "#10b981" },
  { id: "5", title: "পল্লী বিদ্যুৎ", icon: "flash", color: "#eab308" },
  { id: "6", title: "জরুরী হেল্পলাইন", icon: "call", color: "#6366f1" },
  { id: "7", title: "রক্তের গ্রুপ ও ডোনার", icon: "water", color: "#dc2626" },
  {
    id: "8",
    title: "জনপ্রতিনিধি ও ইউপি মেম্বার",
    icon: "people",
    color: "#1d4ed8",
  },
  {
    id: "9",
    title: "অভিযোগ ও মতামত বক্স",
    icon: "mail-open",
    color: "#a855f7",
  },
  {
    id: "10",
    title: "গুরুত্বপূর্ণ লিঙ্কসমূহ",
    icon: "globe",
    color: "#0d9488",
  },
];

const bloodGroups = ["সব", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

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

const openWebsite = (url: string) => {
  Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        Alert.alert("ত্রুটি", "লিঙ্কটি ওপেন করা সম্ভব হচ্ছে না।");
      }
    })
    .catch((err) => console.error("URL Error:", err));
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// 🏠 ১. হোম স্ক্রিন কম্পোনেন্ট
function HomeScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const noticeText =
    "📢 বিশেষ বিজ্ঞপ্তি: আগামী রবিবার সফাপুর ইউনিয়ন স্বাস্থ্য কেন্দ্রে বিনামূল্যে চক্ষু ক্যাম্প অনুষ্ঠিত হবে। জরুরী প্রয়োজনে সরাসরি কল করুন।";
  const animatedValue = useRef(new Animated.Value(screenWidth)).current;

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

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />

      <HeaderSection animatedValue={animatedValue} noticeText={noticeText} />

      <ScrollView style={globalStyles.scrollView} bounces={false}>
        {/* সার্চ বার পার্ট */}
        <View style={globalStyles.searchSection}>
          <View style={globalStyles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color="#64748b"
              style={globalStyles.searchIcon}
            />
            <TextInput
              style={globalStyles.input}
              placeholder="নাম বা মোবাইল নম্বর লিখে খুঁজুন..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
            {searchQuery.length > 0 && (
              <Ionicons
                name="close-circle"
                size={18}
                color="#94a3b8"
                onPress={() => setSearchQuery("")}
              />
            )}
          </View>
        </View>

        {/* গ্রিড বা লিস্ট সেকশন */}
        {searchQuery.trim().length > 0 ? (
          <View style={globalStyles.listSection}>
            <Text style={globalStyles.sectionTitle}>অনুসন্ধানের ফলাফল</Text>
            {filteredContacts.length === 0 ? (
              <Text style={globalStyles.emptyText}>
                কোনো নম্বর খুঁজে পাওয়া যায়নি!
              </Text>
            ) : (
              filteredContacts.map((contact, idx) => (
                <View key={idx} style={globalStyles.contactCard}>
                  <View style={globalStyles.contactInfo}>
                    <Text style={globalStyles.contactName}>{contact.name}</Text>
                    <Text style={globalStyles.contactPhone}>
                      <Ionicons name="call-outline" size={13} /> {contact.phone}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={globalStyles.callButton}
                    onPress={() => makeCall(contact.phone)}
                  >
                    <Ionicons name="call" size={14} color="#fff" />
                    <Text style={globalStyles.callButtonText}>কল</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        ) : (
          <View style={globalStyles.gridSection}>
            <Text style={globalStyles.sectionTitle}>জরুরী সেবাসমূহ</Text>
            <View style={globalStyles.gridContainer}>
              {categories.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    globalStyles.gridCard,
                    (item.id === "7" ||
                      item.id === "8" ||
                      item.id === "9" ||
                      item.id === "10") && { width: "100%" },
                  ]}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (item.id === "9") {
                      navigation.navigate("Complaint");
                    } else if (item.id === "10") {
                      navigation.navigate("Links");
                    } else {
                      navigation.navigate("Details", {
                        categoryId: item.id,
                        categoryTitle: item.title,
                        color: item.color,
                      });
                    }
                  }}
                >
                  <View
                    style={[
                      globalStyles.iconContainer,
                      { backgroundColor: item.color + "15" },
                    ]}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={26}
                      color={item.color}
                    />
                  </View>
                  <Text style={globalStyles.cardTitle}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

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

// 📋 ২. ডিটেইলস বা তালিকা স্ক্রিন কম্পোনেন্ট
function DetailsScreen({ route, navigation }: any) {
  const { categoryId, categoryTitle, color } = route.params;
  const contacts = contactsData[categoryId] || [];
  const [selectedGroup, setSelectedGroup] = useState("সব");
  const filteredContacts =
    categoryId === "7" && selectedGroup !== "সব"
      ? contacts.filter((c) => c.group === selectedGroup)
      : contacts;

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={color} />
      <View style={[globalStyles.detailsHeader, { backgroundColor: color }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={globalStyles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={globalStyles.detailsHeaderTitle}>
          {categoryTitle} ডিরেক্টরি
        </Text>
        <View style={{ width: 24 }} />
      </View>

      {categoryId === "7" && (
        <View style={globalStyles.filterWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={globalStyles.filterScroll}
          >
            {bloodGroups.map((group) => (
              <TouchableOpacity
                key={group}
                style={[
                  globalStyles.filterChip,
                  selectedGroup === group
                    ? { backgroundColor: color }
                    : { backgroundColor: "#f1f5f9" },
                ]}
                onPress={() => setSelectedGroup(group)}
              >
                <Text
                  style={[
                    globalStyles.filterChipText,
                    selectedGroup === group
                      ? { color: "#fff" }
                      : { color: "#475569" },
                  ]}
                >
                  {group}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <ScrollView
        style={globalStyles.scrollView}
        contentContainerStyle={{ padding: 20 }}
      >
        {filteredContacts.length === 0 ? (
          <Text style={globalStyles.emptyText}>
            কোনো নম্বর খুঁজে পাওয়া যায়নি।
          </Text>
        ) : (
          filteredContacts.map((contact, index) => (
            <View key={index} style={globalStyles.contactCard}>
              <View style={globalStyles.contactInfo}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Text style={globalStyles.contactName}>{contact.name}</Text>
                  {contact.group && (
                    <View
                      style={[
                        globalStyles.badgeContainer,
                        { backgroundColor: color + "15" },
                      ]}
                    >
                      <Text
                        style={[globalStyles.badgeTextStyled, { color: color }]}
                      >
                        {contact.group}
                      </Text>
                    </View>
                  )}
                  {contact.designation && (
                    <View
                      style={[
                        globalStyles.badgeContainer,
                        { backgroundColor: color + "15" },
                      ]}
                    >
                      <Text
                        style={[globalStyles.badgeTextStyled, { color: color }]}
                      >
                        {contact.designation}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={[globalStyles.contactPhone, { color: color }]}>
                  <Ionicons name="call-outline" size={13} /> {contact.phone}
                </Text>
                {contact.sub && (
                  <Text style={globalStyles.contactSub}>{contact.sub}</Text>
                )}
              </View>
              <TouchableOpacity
                style={[globalStyles.callButton, { backgroundColor: color }]}
                onPress={() => makeCall(contact.phone)}
              >
                <Ionicons name="call" size={14} color="#ffffff" />
                <Text style={globalStyles.callButtonText}>কল করুন</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// 📩 ৩. অভিযোগ ও মতামত স্ক্রিন কম্পোনেন্ট
function ComplaintScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const sendComplaint = () => {
    if (!name.trim() || !phone.trim() || !message.trim()) {
      Alert.alert("ত্রুটি", "অনুগ্রহ করে সবগুলো তথ্য পূরণ করুন।");
      return;
    }
    const adminWhatsAppNumber = "8801711111111";
    const formattedText = `📝 *নতুন অভিযোগ/মতামত*\n\n👤 *নাম:* ${name}\n📞 *মোবাইল:* ${phone}\n💬 *বার্তা:* ${message}`;
    const url = `whatsapp://send?phone=${adminWhatsAppNumber}&text=${encodeURIComponent(formattedText)}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) return Linking.openURL(url);
        Alert.alert("দুঃখিত", "আপনার ফোনে হোয়াটসঅ্যাপ ইনস্টল করা নেই।");
      })
      .catch((err) => console.error(err));
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#a855f7" />
      <View
        style={[globalStyles.detailsHeader, { backgroundColor: "#a855f7" }]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={globalStyles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={globalStyles.detailsHeaderTitle}>অভিযোগ ও মতামত বক্স</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView
        style={globalStyles.scrollView}
        contentContainerStyle={{ padding: 20 }}
      >
        <View style={globalStyles.formCard}>
          <Text style={globalStyles.formInstruction}>
            সফাপুর ইউনিয়নের সার্বিক উন্নয়নে আপনার যেকোনো অভিযোগ সরাসরি আমাদের
            জানান।
          </Text>
          <Text style={globalStyles.complaintInputLabel}>আপনার নাম</Text>
          <TextInput
            style={globalStyles.complaintFormInput}
            placeholder="এখানে আপনার নাম লিখুন"
            value={name}
            onChangeText={setName}
          />
          <Text style={globalStyles.complaintInputLabel}>মোবাইল নম্বর</Text>
          <TextInput
            style={globalStyles.complaintFormInput}
            placeholder="এখানে আপনার মোবাইল নম্বর লিখুন"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <Text style={globalStyles.complaintInputLabel}>অভিযোগ বা বিবরণ</Text>
          <TextInput
            style={[
              globalStyles.complaintFormInput,
              { height: 120, textAlignVertical: "top" },
            ]}
            placeholder="আপনার সমস্যাটি বিস্তারিত লিখুন..."
            multiline={true}
            numberOfLines={5}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity
            style={globalStyles.complaintSubmitButton}
            onPress={sendComplaint}
          >
            <Ionicons name="paper-plane" size={18} color="#fff" />
            <Text style={globalStyles.complaintSubmitButtonText}>
              হোয়াটসঅ্যাপে জমা দিন
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 🌐 ৪. গুরুত্বপূর্ণ লিঙ্ক স্ক্রিন কম্পোনেন্ট
function LinksScreen({ navigation }: any) {
  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d9488" />
      <View
        style={[globalStyles.detailsHeader, { backgroundColor: "#0d9488" }]}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={globalStyles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={globalStyles.detailsHeaderTitle}>
          গুরুত্বপূর্ণ লিঙ্কসমূহ
        </Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView
        style={globalStyles.scrollView}
        contentContainerStyle={{ padding: 20 }}
      >
        {importantLinks.map((link, index) => (
          <View key={index} style={globalStyles.contactCard}>
            <View style={globalStyles.contactInfo}>
              <Text style={globalStyles.contactName}>{link.title}</Text>
              <Text style={globalStyles.contactSub}>{link.sub}</Text>
            </View>
            <TouchableOpacity
              style={[globalStyles.callButton, { backgroundColor: "#0d9488" }]}
              onPress={() => openWebsite(link.url)}
            >
              <Ionicons name="globe-outline" size={14} color="#ffffff" />
              <Text style={globalStyles.callButtonText}>ওপেন</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
