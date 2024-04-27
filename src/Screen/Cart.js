import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Button, Image } from 'react-native';

export function Cart({ navigation }) {
    const [cartItems, setCartItems] = useState([
        // Example items in cart
        { id: 1, title: "Product 1", price: 19.99, image: "https://via.placeholder.com/150" },
        { id: 2, title: "Product 2", price: 29.99, image: "https://via.placeholder.com/150" },
        { id: 3, title: "Product 3", price: 39.99, image: "https://via.placeholder.com/150" },
    ]);

    const removeFromCart = (itemId) => {
        const updatedCartItems = cartItems.filter(item => item.id !== itemId);
        setCartItems(updatedCartItems);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Cart</Text>
            <ScrollView>
                {cartItems.map((item) => (
                    <View key={item.id} style={styles.itemContainer}>
                        <Image source={{ uri: item.image }} style={styles.productImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemTitle}>{item.title}</Text>
                            <Text style={styles.itemPrice}>${item.price}</Text>
                            <Button title="Remove" onPress={() => removeFromCart(item.id)} />
                        </View>
                    </View>
                ))}
            </ScrollView>
            <Button title="Checkout" onPress={() => navigation.navigate('Checkout')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    productImage: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'space-between',
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemPrice: {
        fontSize: 14,
        color: 'grey',
    },
});
