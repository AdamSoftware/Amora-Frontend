import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { Picker } from "@react-native-picker/picker";
import { goToLogin, UserCreateAccountHelper } from "../helper/user";
import { TextInputMask } from "react-native-masked-text";

const CARD_MAX = 420;
const CARD_MIN = 320;

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

const cardWidth = Math.max(
  Math.max(SCREEN_W * 0.88, CARD_MIN),
  CARD_MAX
);

const scaleFont = (size: number) => {
  const scale = SCREEN_W / 375;
  const newSize = size * scale;
  return Math.round(newSize);
};

export default function CreateAccountPage() {
  const actionSheetRef = useRef(null);
  const [state, setSelectedState] = useState("WI");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Responsive card math: takes a percentage of screen width, with min & max bounds
  const CARD_MIN = 300;
  const CARD_MAX = 420;
  const cardWidth = Math.max(CARD_MIN, Math.min(SCREEN_W * 0.92, CARD_MAX));
  const cardPadding = Math.round(cardWidth * 0.045); // scales padding with width
  const cardRadius = Math.round(cardWidth * 0.04);

  const checkPasswordsMatch = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !zip ||
      !address ||
      !city ||
      !state ||
      !password
    ) {
      alert("Looks like you haven't finished filling out everything.");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Looks like your passwords don't match. Please try again.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    UserCreateAccountHelper.createAccount(
      firstName,
      lastName,
      email,
      phone,
      zip,
      address,
      city,
      state,
      password
    );
    return true;
  };

  const states = [
    { label: "Wisconsin", value: "WI" },
    { label: "California", value: "CA" },
    { label: "New York", value: "NY" },
    { label: "Texas", value: "TX" },
    { label: "Florida", value: "FL" },
    /* ...rest of states... */
  ];

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#FFE4E8" }}
      contentContainerStyle={styles.wrapper}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join Amora 💕</Text>

      <View
        style={[
          styles.formCard,
          {
            width: cardWidth,
            padding: cardPadding,
            borderRadius: cardRadius,
          },
        ]}
      >
        <View style={styles.row}>
          <View style={[styles.column, { marginRight: 8 }]}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              placeholder="First"
              style={styles.input}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              placeholder="Last"
              style={styles.input}
              onChangeText={setLastName}
            />
          </View>
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <View style={styles.row}>
          <View style={[styles.column, { marginRight: 8 }]}>
            <Text style={styles.label}>Phone</Text>
            <TextInputMask
              type={"custom"}
              options={{ mask: "(999) 999-9999" }}
              placeholder="(123) 456-7890"
              value={phone}
              style={styles.input}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>Zip</Text>
            <TextInput
              placeholder="Zipcode"
              style={styles.input}
              onChangeText={setZip}
              keyboardType="numeric"
            />
          </View>
        </View>

        <Text style={styles.label}>Address</Text>
        <TextInput
          placeholder="Street address"
          style={styles.input}
          onChangeText={setAddress}
        />

        <View style={styles.row}>
          <View style={[styles.column, { marginRight: 8 }]}>
            <Text style={styles.label}>City</Text>
            <TextInput
              placeholder="City"
              style={styles.input}
              onChangeText={setCity}
            />
          </View>

          <View style={styles.column}>
            <Text style={styles.label}>State</Text>
            <TouchableOpacity
              style={styles.pickerWrapper}
              onPress={() => actionSheetRef.current?.setModalVisible(true)}
            >
              <Text>{states.find((s) => s.value === state)?.label}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.label}>Password</Text>
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          placeholder="Confirm password"
          style={styles.input}
          secureTextEntry
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity
        style={[styles.buttonPrimary, { minWidth: Math.round(cardWidth * 0.5) }]}
        onPress={() => checkPasswordsMatch()}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={() => goToLogin()}>
        <Text style={styles.buttonSecondaryText}>Back to Login</Text>
      </TouchableOpacity>

      <ActionSheet ref={actionSheetRef} gestureEnabled>
        <Picker selectedValue={state} onValueChange={(val) => setSelectedState(val)}>
          {states.map((s) => (
            <Picker.Item key={s.value} label={s.label} value={s.value} />
          ))}
        </Picker>

        <TouchableOpacity
          onPress={() => actionSheetRef.current?.setModalVisible(false)}
          style={{ padding: 16, alignItems: "center", borderTopWidth: 1, borderColor: "#eee" }}
        >
          <Text style={{ color: "#FF4B6E", fontWeight: "900", fontSize: scaleFont(15) }}>Done</Text>
        </TouchableOpacity>
      </ActionSheet>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
    backgroundColor: "#FFE4E8",
    alignItems: "center",
    paddingTop: Math.round(SCREEN_H * 0.03),
    justifyContent: "center",
    marginTop: "auto",
  },
  title: {
    fontSize: scaleFont(24),
    fontWeight: "700",
    color: "#FF4B6E",
    textAlign: "center",
  },
  subtitle: {
    fontSize: scaleFont(16),
    color: "#FF4B6E",
    marginBottom: 16,
    textAlign: "center",
  },
  formCard: {
    width: cardWidth,
    backgroundColor: "#FFB3C1",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 12,
  },
  label: {
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
    fontSize: scaleFont(15),
  },
  input: {
    backgroundColor: "#FFF5F8",
    height: 44,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FF6B6B",
    width: "100%",
    fontSize: scaleFont(14),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
  },
  pickerWrapper: {
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    height: 44,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  buttonPrimary: {
    backgroundColor: "#FF4B6E",
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 4,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 24,
    alignItems: "center",
    marginTop: 11,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: scaleFont(15),
  },
  buttonSecondary: {
    marginTop: 10,
  },
  buttonSecondaryText: {
    color: "#FF4B6E",
    fontWeight: "600",
    fontSize: scaleFont(15),
  },
});

