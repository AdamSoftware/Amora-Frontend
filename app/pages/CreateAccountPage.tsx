import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { Picker } from "@react-native-picker/picker";
import { goToLogin,UserCreateAccountHelper } from "../helper/user";
import {TextInputMask} from "react-native-masked-text";


export default function CreateAccountPage() {
  const actionSheetRef = useRef<any>(null);
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

  const checkPasswordsMatch = () => {
    if (!firstName ||
        !lastName ||
        !email ||
        !phone ||
        !zip ||
        !address ||
        !city ||
        !state ||
        !password) {
      alert("Looks like you haven't finished filling out everything.");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Looks like your passwords don't match. please try again.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    UserCreateAccountHelper.createAccount(firstName, lastName, email, phone, zip, address, city, state, password);
    return true;
  };

  const states = [
    { label: "Wisconsin", value: "WI" },
    { label: "California", value: "CA" },
    { label: "New York", value: "NY" },
    { label: "Texas", value: "TX" },
    { label: "Florida", value: "FL" },
    { label: "Illinois", value: "IL" },
    { label: "Pennsylvania", value: "PA" },
    { label: "Ohio", value: "OH" },
    { label: "Michigan", value: "MI" },
    { label: "Georgia", value: "GA" },
    { label: "North Carolina", value: "NC" },
    { label: "New Jersey", value: "NJ" },
    { label: "Virginia", value: "VA" },
    { label: "Washington", value: "WA" },
    { label: "Arizona", value: "AZ" },
    { label: "Massachusetts", value: "MA" },
    { label: "Tennessee", value: "TN" },
    { label: "Indiana", value: "IN" },
    { label: "Missouri", value: "MO" },
    { label: "Maryland", value: "MD" },
    { label: "Minnesota", value: "MN" },
    { label: "South Carolina", value: "SC" },
    { label: "Alabama", value: "AL" },
    { label: "Louisiana", value: "LA" },
    { label: "Kentucky", value: "KY" },
    { label: "Oregon", value: "OR" },
    { label: "Oklahoma", value: "OK" },
    { label: "Connecticut", value: "CT" },
    { label: "Iowa", value: "IA" },
    { label: "Utah", value: "UT" },
    { label: "Nevada", value: "NV" },
    { label: "Arkansas", value: "AR" },
    { label: "Mississippi", value: "MS" },
    { label: "Kansas", value: "KS" },
    { label: "New Mexico", value: "NM" },
    { label: "Nebraska", value: "NE" },
    { label: "West Virginia", value: "WV" },
    { label: "Idaho", value: "ID" },
    { label: "Hawaii", value: "HI" },
    { label: "Maine", value: "ME" },
    { label: "New Hampshire", value: "NH" },
    { label: "Montana", value: "MT" },
    { label: "Rhode Island", value: "RI" },
    { label: "Delaware", value: "DE" },
    { label: "South Dakota", value: "SD" },
    { label: "North Dakota", value: "ND" },
    { label: "Alaska", value: "AK" },
    { label: "Vermont", value: "VT" },
    { label: "Wyoming", value: "WY" },
    { label: "District of Columbia", value: "DC" },
    { label: "Puerto Rico", value: "PR" },
    { label: "Guam", value: "GU" },
    { label: "U.S. Virgin Islands", value: "VI" },
    { label: "American Samoa", value: "AS" },
    { label: "Northern Mariana Islands", value: "MP" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Join Amora 💕</Text>

      <View style={styles.formCard}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>First Name</Text>
            <TextInput placeholder="First" style={styles.input} onChangeText={setFirstName} />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput placeholder="Last" style={styles.input} onChangeText={setLastName} />
          </View>
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput placeholder="Enter your email" style={styles.input} onChangeText={setEmail}/>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Phone</Text>
            <TextInputMask
              type={'custom'}
              options={{
                mask: '(999) 999-9999'
              }}
              placeholder="(123) 456-7890"
              value={phone}
              style={styles.input}
              onChangeText={setPhone}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Zip</Text>
            <TextInput placeholder="Zipcode" style={styles.input} onChangeText={setZip}/>
          </View>
        </View>

        <Text style={styles.label}>Address</Text>
        <TextInput placeholder="Street address" style={styles.input} onChangeText={setAddress}/>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>City</Text>
            <TextInput placeholder="City" style={styles.input} onChangeText={setCity}/>
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
        <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={setPassword}/>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          placeholder="Confirm password"
          style={styles.input}
          secureTextEntry
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity
        style={styles.buttonPrimary}
        onPress={() => checkPasswordsMatch()}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => goToLogin()}
      >
        <Text style={styles.buttonSecondaryText}>Back to Login</Text>
      </TouchableOpacity>

      <ActionSheet ref={actionSheetRef} gestureEnabled>
        <Picker
          selectedValue={state}
          onValueChange={(val) => setSelectedState(val)}
        >
          {states.map((s) => (
            <Picker.Item key={s.value} label={s.label} value={s.value} />
          ))}
        </Picker>
        <TouchableOpacity
          onPress={() => actionSheetRef.current?.setModalVisible(false)}
          style={{ padding: 16, alignItems: "center" }}
        >
          <Text style={{ color: "#FF4B6E", fontWeight: "600" }}>Done</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FF4B6E",
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    color: "#FF4B6E",
    marginBottom: 20,
  },
  formCard: {
    width: "100%",
    backgroundColor: "#FFB3C1",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#FF6B6B",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  label: {
    fontWeight: "700",
    color: "#00000",
    marginBottom: 6,
    fontSize: 15,
  },
  input: {
    backgroundColor: "#FFF5F8",
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FF6B6B",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginRight: 8,
  },
  pickerWrapper: {
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  buttonPrimary: {
    backgroundColor: "#FF4B6E",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  buttonSecondary: {
    paddingVertical: 10,
  },
  buttonSecondaryText: {
    color: "#FF4B6E",
    fontWeight: "600",
    fontSize: 15,
  },
});

