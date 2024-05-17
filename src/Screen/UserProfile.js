import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet, ScrollView, Platform } from 'react-native';
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
        {isEditing ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={() => setIsEditing(false)} />
              <Button title="Confirm" onPress={handleUpdate} />
            </View>
          </>
        ) : (
          <>
            <Text style={styles.info}>Name: {user.name}</Text>
            <Text style={styles.info}>Email: {user.email}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Update" onPress={() => setIsEditing(true)} />
              <Button title="Sign Out" onPress={handleSignOut} />
            </View>
          </>
        )}
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
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default UserProfile;
