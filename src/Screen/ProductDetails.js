import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ButtonPrototype } from '../component/ButtonPrototype';

function ProductDetail({ route }) {
  const { product } = route.params;
  const navigation = useNavigation();

  const addToCart = () => {
    console.log('Add to cart:', product.title); 
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 20,
    fontWeight: '500',
    color: '#4CAF50',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    lineHeight: 24,
    color: '#666',
    backgroundColor: '#f9f9f9',  // Light gray background to make it stand out
    padding: 15,  // Padding to give some space inside the box
    borderRadius: 8,  // Rounded corners
    marginHorizontal: 20,  // Horizontal margin to align it well with other content
    marginTop: 10,
    shadowColor: '#000',  // Shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,  // For Android shadow effect
  },
  ratingContainer: {
    alignSelf: 'stretch',
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
  },
  ratingContainer: {
    marginTop: 10,
    backgroundColor: '#f8f8f8',
    width: '100%',
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
  },
});


export default ProductDetail;
