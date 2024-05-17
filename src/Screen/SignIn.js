import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { COLORS } from '../component/Color';
import { setUser } from '../redux/userSlice';

const server = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const url = `http://${server}:3000`;

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    try {
      const response = await fetch(`${url}/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
  
      if (data.status === 'OK') {
        dispatch(setUser({ id: data.id, name: data.name, email: data.email, token: data.token }));
        navigation.navigate('Profile');
      } else {
        Alert.alert('Error', data.message || 'Wrong email or password');
      }
    } catch (error) {
      Alert.alert('Error during sign in:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign in with your email and password</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button title="Clear" onPress={() => { setEmail(''); setPassword(''); }} />
          <Button title="Sign In" onPress={handleSignIn} />
        </View>
        <Text style={styles.switchLabel} onPress={() => navigation.navigate('SignUp')}>
          Switch to: sign up
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: COLORS.SignInBackground,
  },
  formContainer: {
    backgroundColor: COLORS.White,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
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
  switchLabel: {
    marginTop: 20,
    textAlign: 'center',
    color: 'blue',
  },
});

export default SignIn;
