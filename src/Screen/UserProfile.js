import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from '../redux/userSlice';
import { COLORS } from '../component/Color';
import { Title } from '../component/Title';

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState('');

  const handleSignOut = () => {
    dispatch(clearUser());
  };

  const handleUpdate = async () => {
    try {
      console.log('Updating user details...');
      console.log('Name:', name);
      console.log('Password:', password);

      const server = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
      const url = `http://${server}:3000/users/update`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await response.json();
      console.log('Update Response:', data);

      if (data.status === 'OK') {
        dispatch(setUser({ name: data.name, email: user.email, token: user.token }));
        Alert.alert('Success', 'User name and password updated successfully.');
        setIsEditing(false);
      } else {
        Alert.alert('Error', data.message || 'Failed to update user details.');
      }
    } catch (error) {
      console.error('Error updating user details:', error.message);
      Alert.alert('Error', 'Failed to update user details.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Title text="Profile" />
        <View style={styles.profileBox}>
          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#888"
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#888"
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.confirmButton} onPress={handleUpdate}>
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.info}>Name: {user.name}</Text>
              <Text style={styles.info}>Email: {user.email}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.updateButton} onPress={() => setIsEditing(true)}>
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                  <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: COLORS.ProfileBackground,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.ProfileBackground,
  },
  profileBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  },
  info: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  signOutButton: {
    flex: 1,
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfile;
