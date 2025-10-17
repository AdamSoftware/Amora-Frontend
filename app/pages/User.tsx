import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Switch } from 'react-native';
import HandleAPIRequest from '../components/HandleAPIRequest';
import UserHelper from '../helper/user';
import NotifyMessages from '../helper/NotifyMessages';
import BackBtn from '../components/BackBtn';
import { LinearGradient } from 'expo-linear-gradient';
import TopView from '../components/TopView';
import SubscriptionLoading from '../components/subscriptionLoading';
import Setting from '../components/Setting';

export default function User() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [ActiveTab, setActiveTab] = useState('User');
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<any>({});

  useEffect(() => {
    async function loadUser() {
      HandleAPIRequest.HandleGetByIdRequest(
        "users",
        String(UserHelper.id),
        (data) => {
          setUser(data);
          setEditedUser(data);
          setLoading(false);
        },
        (error) => {
          console.error("Get user request failed:", error);
          setLoading(false);
          NotifyMessages.notifyError("Failed to load user data.");
        }
      );
    }
    loadUser();
  }, []);

  const handleSave = () => {
    HandleAPIRequest.HandleEditRequest(
      "users",
      user.Id,
      editedUser,
      (data) => {
        setUser(data);
        setEditMode(false);
        NotifyMessages.notifySuccess("Profile updated successfully!");
      },
      (error) => {
        console.error("Update failed:", error);
        NotifyMessages.notifyError("Failed to update profile.");
      }
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading user data...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No user data available.</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={['#ff9a9e', '#fad0c4']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.backbutton}>
          <BackBtn />
        </View>
        <View style={styles.topView}>
          <TopView onTabChange={(tab) => setActiveTab(tab)} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {ActiveTab === 'User' ? (
            <>
              <View style={styles.headerRow}>
                <Text style={styles.title}>Profile</Text>
                <View style={styles.editSwitchContainer}>
                  <Text style={styles.switchLabel}>Edit</Text>
                  <Switch
                    value={editMode}
                    onValueChange={(value) => {
                      if (!value) handleSave(); // save when switching off
                      setEditMode(value);
                    }}
                    trackColor={{ false: '#ccc', true: '#FF6F61' }}
                    thumbColor="#fff"
                  />
                </View>
              </View>

              {[
                { label: "Firstname", key: "Firstname" },
                { label: "Lastname", key: "Lastname" },
                { label: "Email", key: "Email" },
                { label: "City", key: "City" },
                { label: "Phone", key: "PhoneNumber" },
                { label: "Address", key: "Address" },
                { label: "Postal Code", key: "ZipCode" },
              ].map(field => (
                <View key={field.key} style={styles.card}>
                  <Text style={styles.fieldLabel}>{field.label}</Text>
                  {editMode ? (
                    <TextInput
                      style={styles.input}
                      value={editedUser[field.key]}
                      onChangeText={text =>
                        setEditedUser({ ...editedUser, [field.key]: text })
                      }
                    />
                  ) : (
                    <Text style={styles.fieldValue}>{user[field.key]}</Text>
                  )}
                </View>
              ))}
            </>
          ) : ActiveTab === 'Subscriptions' ? (
            <View style={{ flex: 1 }}>
              <SubscriptionLoading />
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <Setting />
            </View>
          )}
       

        </ScrollView>
      </View>
    </LinearGradient>
  );
}


const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },

  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  backbutton: { 
    position: 'absolute', 
    top: 55, 
    left: 25, 
    zIndex: 10 
  },

  topView: { 
    position: 'absolute', 
    top: 100, 
    left: 0, 
    right: 0, 
    paddingHorizontal: 20, 
    zIndex: 0 
  },

  content: { 
    flex: 1, 
    marginTop: 160, 
    width: '100%', 
    paddingHorizontal: 20 
  },

  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 20, 
    height: 60 
  },

  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#222', 
    textAlignVertical: 'center' 
  },

  editSwitchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },

  switchLabel: { 
    marginRight: 10, 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#555' 
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5
  },

  fieldLabel: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#555', 
    marginBottom: 6 
  },

  fieldValue: { 
    fontSize: 16, 
    color: '#222' 
  },

  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9'
  }
});

