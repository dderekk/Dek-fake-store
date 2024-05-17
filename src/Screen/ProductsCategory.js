import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonPrototype } from '../component/ButtonPrototype';
import { Title } from '../component/Title';
import { useNavigation } from "@react-navigation/native";
import { fetchCategories } from '../redux/CategorySlice';

export function CategoryScreen() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const categoryData = useSelector(state => state.categories.data);
    const loading = useSelector(state => state.categories.status === 'loading');

    useEffect(() => {
        if (!user.isLoggedIn) {
            Alert.alert('Authentication required', 'Please sign in or sign up to access this feature.');
            navigation.navigate('Profile');
        } else if (categoryData.length === 0) {
            dispatch(fetchCategories());
        }
    }, [user.isLoggedIn, categoryData.length, dispatch]);

    return (
        <View style={styles.screen}>
            <Title text={"Product Categories"} style={styles.title} />
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <ScrollView contentContainerStyle={styles.container}>
                    {categoryData.map((category, index) => (
                        <ButtonPrototype
                            key={index}
                            label={category.toUpperCase()} // Text in uppercase for better visibility
                            icon="return-down-forward-sharp"
                            Bsize={24}
                            fn={() => navigation.navigate('Products', { category: category })}
                            style={styles.button}
                        />
                    ))}
                    <Text style={styles.developerName}>Developed by Derek Qiu</Text>
                </ScrollView>
            )}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding:20,
        backgroundColor: '#f4f4f4',
    },
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 10,
    },
    title: {
        marginVertical: 20,
    },
    developerName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 100,
    }
});
