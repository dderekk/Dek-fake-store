import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';

import { useNavigation } from "@react-navigation/native";

import { ButtonPrototype } from '../component/ButtonPrototype';
import { Title } from '../component/Title';

export function Products({ route }) { 
  const [productData, setProductData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      if (route.params?.category) {
        try {
          const res = await fetch(`https://fakestoreapi.com/products/category/${route.params.category}`);
          const data = await res.json();
          setProductData(data); 
        } catch (e) {
          console.error('Error in fetchData:', e.message);
        }
      }
    };

    fetchProducts(); 
  }, [route.params?.category]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {productData.map((product) => (
        <TouchableOpacity
          key={product.id}
          style={styles.productCard}
          onPress={() => navigation.navigate('ProductDetail', { product })}
        >
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <Text style={styles.productPrice}>${product.price}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <View style={styles.buttonContainer}>
      <ButtonPrototype
          label="Back"
          icon="arrow-back-circle-outline"
          Bsize={16}
          fn={() => navigation.goBack()}
      />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 10,
  },
  productInfo: {
    flex: 1,
    padding: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'grey',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});