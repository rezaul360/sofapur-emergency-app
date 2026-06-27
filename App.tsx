import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
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
      name: "সরকারি তথ্য ও সেবা (333)",
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
      sub: "১ নং ওয়ার্ড (সফাপুর গ্রাম)",
      designation: "ইউপি মেম্বার",
    },
  ],
};

// 🌐 সরকারি গুরুত্বপূর্ণ লিঙ্কের ডেটাবেজ
const importantLinks = [
  {
    title: "অনলাইন জন্ম-মৃত্যু নিবন্ধন",
    sub: "জন্ম নিবন্ধন আবেদন ও যাচাই পোর্টাল",
    url: "https://bdris.gov.bd/",
  },
  {
    title: "জাতীয় পরিচয়পত্র (NID) সেবা",
    sub: "এনআইডি কার্ড ডাউনলোড ও সংশোধন",
    url: "https://services.nidw.gov.bd/",
  },
  {
    title: "অনলাইন ই-পাসপোর্ট আবেদন",
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

// ক্যাটাগরি লিস্ট (১০ নম্বর বাটন হিসেবে লিংক যুক্ত করা হয়েছে)
const categories = [
  { id: "1", title: "হাসপাতাল ও ডাক্তার", icon: "medical", color: "#ef4444" },
  { id: "2", title: "থানা ও পুলিশ", icon: "shield-half", color: "#3b82f6" },
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
  }, // 🌐 নতুন বাটন
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

// 🌐 ওয়েবসাইট লিঙ্ক ওপেন করার ফাংশন
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
  const noticeText =
    "📢 বিশেষ বিজ্ঞপ্তি: আগামী রবিবার সফাপুর ইউনিয়ন স্বাস্থ্য কেন্দ্রে বিনামূল্যে চক্ষু ক্যাম্প অনুষ্ঠিত হবে।grid জরুরী প্রয়োজনে সরাসরি কল করুন।";
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

  const getFilteredContacts = () => {
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
  };

  const filteredContacts = getFilteredContacts();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#059669" />

      {/* নোটিশ বোর্ড */}
      <View style={styles.noticeContainer}>
        <View style={styles.noticeLabel}>
          <Text style={styles.noticeLabelText}>ঘোষণা</Text>
        </View>
        <View style={styles.noticeScrollArea}>
          <Animated.View style={{ transform: [{ translateX: animatedValue }] }}>
            <Text numberOfLines={1} style={styles.noticeText}>
              {noticeText}
            </Text>
          </Animated.View>
        </View>
      </View>

      <ScrollView style={styles.scrollView} bounces={false}>
        {/* হেডার পার্ট */}
        <View style={styles.headerContainer}>
          <Text style={styles.subTitle}>গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</Text>
          <Text style={styles.mainTitle}>সফাপুর ইউ পি ইমার্জেন্সি সেবা</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>জরুরী যোগাযোগ ডিরেক্টরি</Text>
          </View>
        </View>

        {/* সার্চ বার পার্ট */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search-outline"
              size={20}
              color="#64748b"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
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

        {/* গ্রিড সেকশন */}
        {searchQuery.trim().length > 0 ? (
          <View style={styles.listSection}>
            <Text style={styles.sectionTitle}>অনুসন্ধানের ফলাফল</Text>
            {filteredContacts.length === 0 ? (
              <Text style={styles.emptyText}>
                কোনো নম্বর খুঁজে পাওয়া যায়নি!
              </Text>
            ) : (
              filteredContacts.map((contact, idx) => (
                <View key={idx} style={styles.contactCard}>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactName}>{contact.name}</Text>
                    <Text style={styles.contactPhone}>
                      <Ionicons name="call-outline" size={13} /> {contact.phone}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.callButton}
                    onPress={() => makeCall(contact.phone)}
                  >
                    <Ionicons name="call" size={14} color="#fff" />
                    <Text style={styles.callButtonText}>কল</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        ) : (
          <View style={styles.gridSection}>
            <Text style={styles.sectionTitle}>জরুরী সেবাসমূহ</Text>
            <View style={styles.gridContainer}>
              {categories.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.gridCard,
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
                      navigation.navigate("Links"); // ১০ নম্বর হলে লিঙ্ক স্ক্রিনে যাবে
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
                      styles.iconContainer,
                      { backgroundColor: item.color + "15" },
                    ]}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={26}
                      color={item.color}
                    />
                  </View>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={color} />

      <View style={[styles.detailsHeader, { backgroundColor: color }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.detailsHeaderTitle}>{categoryTitle} ডিরেক্টরি</Text>
        <View style={{ width: 24 }} />
      </View>

      {categoryId === "7" && (
        <View style={styles.filterWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}
          >
            {bloodGroups.map((group) => (
              <TouchableOpacity
                key={group}
                style={[
                  styles.filterChip,
                  selectedGroup === group
                    ? { backgroundColor: color }
                    : { backgroundColor: "#f1f5f9" },
                ]}
                onPress={() => setSelectedGroup(group)}
              >
                <Text
                  style={[
                    styles.filterChipText,
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
        style={styles.scrollView}
        contentContainerStyle={{ padding: 20 }}
      >
        {filteredContacts.length === 0 ? (
          <Text style={styles.emptyText}>কোনো নম্বর খুঁজে পাওয়া যায়নি।</Text>
        ) : (
          filteredContacts.map((contact, index) => (
            <View key={index} style={styles.contactCard}>
              <View style={styles.contactInfo}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Text style={styles.contactName}>{contact.name}</Text>
                  {contact.group && (
                    <View
                      style={[
                        styles.badgeContainer,
                        { backgroundColor: color + "15" },
                      ]}
                    >
                      <Text style={[styles.badgeTextStyled, { color: color }]}>
                        {contact.group}
                      </Text>
                    </View>
                  )}
                  {contact.designation && (
                    <View
                      style={[
                        styles.badgeContainer,
                        { backgroundColor: color + "15" },
                      ]}
                    >
                      <Text style={[styles.badgeTextStyled, { color: color }]}>
                        {contact.designation}
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={[styles.contactPhone, { color: color }]}>
                  <Ionicons name="call-outline" size={13} /> {contact.phone}
                </Text>
                {contact.sub && (
                  <Text style={styles.contactSub}>{contact.sub}</Text>
                )}
              </View>
              <TouchableOpacity
                style={[styles.callButton, { backgroundColor: color }]}
                onPress={() => makeCall(contact.phone)}
              >
                <Ionicons name="call" size={14} color="#ffffff" />
                <Text style={styles.callButtonText}>কল করুন</Text>
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#a855f7" />
      <View style={[styles.detailsHeader, { backgroundColor: "#a855f7" }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.detailsHeaderTitle}>অভিযোগ ও মতামত বক্স</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ padding: 20 }}
      >
        <View style={styles.formCard}>
          <Text style={styles.formInstruction}>
            সফাপুর ইউনিয়নের সার্বিক উন্নয়নে আপনার যেকোনো অভিযোগ সরাসরি আমাদের
            জানান।
          </Text>
          <Text style={styles.inputLabel}>আপনার নাম</Text>
          <TextInput
            style={styles.formInput}
            placeholder="এখানে আপনার নাম লিখুন"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.inputLabel}>মোবাইল নম্বর</Text>
          <TextInput
            style={styles.formInput}
            placeholder="এখানে আপনার মোবাইল নম্বর লিখুন"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <Text style={styles.inputLabel}>অভিযোগ বা বিবরণ</Text>
          <TextInput
            style={[
              styles.formInput,
              { height: 120, textAlignVertical: "top" },
            ]}
            placeholder="আপনার সমস্যাটি বিস্তারিত লিখুন..."
            multiline={true}
            numberOfLines={5}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity style={styles.submitButton} onPress={sendComplaint}>
            <Ionicons name="paper-plane" size={18} color="#fff" />
            <Text style={styles.submitButtonText}>হোয়াটসঅ্যাপে জমা দিন</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// 🌐 ৪. নতুন গুরুত্বপূর্ণ লিঙ্ক স্ক্রিন কম্পোনেন্ট
function LinksScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d9488" />

      <View style={[styles.detailsHeader, { backgroundColor: "#0d9488" }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.detailsHeaderTitle}>গুরুত্বপূর্ণ লিঙ্কসমূহ</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ padding: 20 }}
      >
        {importantLinks.map((link, index) => (
          <View key={index} style={styles.contactCard}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{link.title}</Text>
              <Text style={styles.contactSub}>{link.sub}</Text>
            </View>

            <TouchableOpacity
              style={[styles.callButton, { backgroundColor: "#0d9488" }]}
              onPress={() => openWebsite(link.url)}
            >
              <Ionicons name="globe-outline" size={14} color="#ffffff" />
              <Text style={styles.callButtonText}>ওপেন</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  scrollView: { flex: 1 },
  headerContainer: {
    backgroundColor: "#059669",
    paddingTop: 25,
    paddingBottom: 35,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    alignItems: "center",
    elevation: 5,
  },
  subTitle: {
    color: "#a7f3d0",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
  },
  mainTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 14,
  },
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.22)",
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 50,
  },
  badgeText: { color: "#ffffff", fontSize: 13, fontWeight: "700" },
  noticeContainer: {
    flexDirection: "row",
    backgroundColor: "#fef2f2",
    borderBottomWidth: 1,
    borderBottomColor: "#fee2e2",
    alignItems: "center",
    height: 40,
    overflow: "hidden",
  },
  noticeLabel: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 12,
    height: "100%",
    justifyContent: "center",
    zIndex: 10,
  },
  noticeLabelText: { color: "#ffffff", fontSize: 12, fontWeight: "bold" },
  noticeScrollArea: { flex: 1, justifyContent: "center", width: "100%" },
  noticeText: { color: "#dc2626", fontSize: 13, fontWeight: "600", width: 900 },
  searchSection: { paddingHorizontal: 20, marginTop: -20, zIndex: 1 },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 16,
    height: 54,
    elevation: 3,
  },
  searchIcon: { marginRight: 10 },
  input: { flex: 1, color: "#1e293b", fontSize: 15 },
  gridSection: { paddingHorizontal: 20, marginTop: 25 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 15,
    paddingLeft: 2,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridCard: {
    backgroundColor: "#ffffff",
    width: "48%",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: "center",
    marginBottom: 12,
    elevation: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    textAlign: "center",
  },
  listSection: { paddingHorizontal: 20, marginTop: 20 },
  contactCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    elevation: 1,
  },
  contactInfo: { flex: 1, marginRight: 10 },
  contactName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1e293b",
    marginBottom: 4,
  },
  contactPhone: { fontSize: 14, fontWeight: "600", marginBottom: 2 },
  contactSub: { fontSize: 12, color: "#64748b" },
  callButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  callButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 6,
  },
  emptyText: {
    color: "#94a3b8",
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
  },
  detailsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    elevation: 4,
  },
  backButton: { padding: 5 },
  detailsHeaderTitle: { color: "#ffffff", fontSize: 18, fontWeight: "bold" },
  filterWrapper: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  filterScroll: { paddingHorizontal: 15, gap: 8 },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  filterChipText: { fontSize: 13, fontWeight: "700" },
  badgeContainer: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 2,
  },
  badgeTextStyled: { fontSize: 11, fontWeight: "bold" },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    elevation: 2,
    marginBottom: 20,
  },
  formInstruction: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 22,
    marginBottom: 20,
    textAlign: "center",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 8,
    paddingLeft: 2,
  },
  formInput: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: "#1e293b",
    marginBottom: 18,
  },
  submitButton: {
    backgroundColor: "#a855f7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 10,
    elevation: 2,
  },
  submitButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
