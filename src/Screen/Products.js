import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
import { ButtonPrototype } from '../component/ButtonPrototype';
import { Title } from '../component/Title';
import { fetchProductsByCategory } from '../redux/productSlice';

export function Products({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const category = route.params?.category;
  const productState = useSelector(state => state.products);
  const productData = productState.data[category] || [];
  const loading = productState.status === 'loading';

  useEffect(() => {
    if (category && !productData.length) {
      dispatch(fetchProductsByCategory(category));
    }
  }, [category, productData.length, dispatch]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screen}>
      <Title text={category ? category.toUpperCase() : 'Products'} style={styles.title} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={productData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.container}
        />
      )}
      <View style={styles.buttonContainer}>
        <ButtonPrototype
          label="Back"
          icon="arrow-back-circle-outline"
          Bsize={16}
          fn={() => navigation.goBack()}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f4f4f4',
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
    paddingVertical: 10,
  },
  title: {
    marginVertical: 20,
  },
});
