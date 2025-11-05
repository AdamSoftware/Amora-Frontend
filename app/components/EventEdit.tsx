import { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native';
import BackBtn from './BackBtn';
import HandleAPIRequest from '../components/HandleAPIRequest';
import NotifyMessages from '../helper/NotifyMessages';
import { scaleFont } from '../helper/FontHelpers';
import TopViewEdit from '../components/TopViewEdit';
import EditableField from './EditableFields';
import DateChangeFields from './DateChangeFields';
import AttachedEventItems from './AttachedEventItems';

export default function EventEdit(Data: any) {
  const [data, setData] = useState<any>(Data.data);
  const [editMode, setEditMode] = useState(false);
  const [EditedData, setEditedData] = useState<any>(data);
  const [activeTab, setActiveTab] = useState<string>('Events');

  const handleSave = () => {
    HandleAPIRequest.HandleEditRequest(
      'events',
      data.Id,
      EditedData,
      (data) => {
        setData(data);
        setEditMode(false);
        NotifyMessages.notifySuccess('Event updated successfully!');
      },
      (error) => {
        console.error('Update failed:', error);
        NotifyMessages.notifyError('Failed to update event.');
      }
    );
  };

  const topPadding = editMode ? 0 : Platform.OS === 'android' ? StatusBar.currentHeight || 20 : 20;

  return (
    <SafeAreaView style={[styles.container, { paddingTop: topPadding }]}>
      {editMode && (
        <TopViewEdit activeTab={activeTab} onSelect={(tab) => setActiveTab(tab)} EditMode={editMode} />
      )}


      <View style={[styles.headerRow, !editMode && { marginTop: 10 }]}>
        <BackBtn />
        <View style={styles.switchedit}>
          <Text style={styles.switchLabel}>Editing</Text>
          <View style={[styles.toggleContainer, editMode && styles.toggleActive]}>
            <Switch
              value={editMode}
              onValueChange={(value) => {
                if (!value) handleSave();
                setEditMode(value);
              }}
              trackColor={{ false: 'rgba(200,200,200,0.4)', true: 'rgba(255,111,97,0.3)' }}
              thumbColor="#fff"
              ios_backgroundColor="transparent"
              style={styles.toggleSwitch}
            />
          </View>
        </View>
      </View>

      {activeTab === 'Events' && (

        <ScrollView contentContainerStyle={{ paddingBottom: 40, marginTop: 10, flexGrow: 1 }}>
          <View style={styles.eventPanel}>
            <EditableField
              label="Event Name"
              value={EditedData.Name}
              editMode={editMode}
              onChangeText={(text) => setEditedData({ ...EditedData, Name: text })}
            />
            <EditableField
              label="Description"
              value={EditedData.Description}
              editMode={editMode}
              onChangeText={(text) => setEditedData({ ...EditedData, Description: text })}
            />
            <DateChangeFields
              label="Date of the Event"
              value={EditedData.DateOfTheEvent}
              editMode={editMode}
              onChange={(date) => setEditedData({ ...EditedData, DateOfTheEvent: date.toISOString() })}
            />
            <View style={styles.activeRow}>
              <Switch
                value={EditedData.IsActive}
                disabled={!editMode}
                onValueChange={(value) => setEditedData({ ...EditedData, IsActive: value })}
                trackColor={{ false: 'rgba(200,200,200,0.4)', true: 'rgba(255,111,97,0.3)' }}
                thumbColor="#fff"
              />
            </View>
          </View>

          <View style={styles.AttachedSection}>
            <AttachedEventItems eventId={data.Id} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  switchedit: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchLabel: {
    fontSize: scaleFont(16),
    fontWeight: '600',
    color: '#d64b72',
    marginRight: 12,
  },
  toggleContainer: {
    borderRadius: 15,
    backgroundColor: 'rgba(200,200,200,0.3)',
    padding: 3,
  },
  toggleActive: {
    backgroundColor: 'rgba(255,111,97,0.3)',
  },
  toggleSwitch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  eventPanel: {
    alignSelf: 'center',
    backgroundColor: '#fffdf8', 
    borderRadius: 29,
    padding: 13,
    borderWidth: 1,
    borderColor: '#ffd1cc',
    shadowColor: '(rgb(255, 0, 128))',
    //shadowColor: 'rgb(255, 111, 97)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 5,
    elevation: 3,
    width: '95%',
  },
  activeRow: {
    marginTop: 15,
  },
  activeLabel: {
    fontSize: scaleFont(15),
    fontWeight: '500',
    color: '#555',
  },
  AttachedSection: {
    flex: 1,
  },
});

