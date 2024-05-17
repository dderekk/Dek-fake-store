import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ButtonPrototype } from '../component/ButtonPrototype';
import { Title } from '../component/Title';

import { useDispatch } from 'react-redux';
import { addItemToCart } from '../redux/cartSlice';


function ProductDetail({ route }) {
  const { product } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation(); // Correct useNavigation initialization

  const addToCart = () => {
    console.log('Add to cart:', product.title);
    dispatch(addItemToCart(product));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title text={'PRODUCT DETAILS'} style={styles.title} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>Rating: {product.rating.rate} ({product.rating.count} reviews)</Text>
      </View>
      <View style={styles.buttonContainer}>
        <ButtonPrototype
          label="Back"
          icon="arrow-back-circle-outline"
          Bsize={16}
          fn={() => navigation.goBack()}
        />
        <ButtonPrototype
          label="Add to Cart"
          icon="cart-outline"
          Bsize={16}
          fn={addToCart}
        />
      </View>
      <ScrollView style={styles.descriptionContainer}>
        <Text style={styles.description}>{product.description}</Text>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 22,
    fontWeight: '600',
    color: '#4CAF50',
    marginVertical: 10,
    textAlign: 'center',
  },
  ratingContainer: {
    alignSelf: 'stretch',
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 20,
  },
  rating: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
    marginBottom: 30,
  },
  descriptionContainer: {
    alignSelf: 'stretch',
    marginHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    maxHeight: 200, 
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    lineHeight: 24,
    color: '#666',
  },
});

export default ProductDetail;
