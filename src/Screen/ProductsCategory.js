import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

import { ButtonPrototype } from '../component/ButtonPrototype';
import { Title } from '../component/Title';

import { useNavigation } from "@react-navigation/native";

export function CategoryScreen() {
    const navigation = useNavigation();
    

    const [categoryData, setCategoryData] = useState([]);
  
    const fetchData = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setCategoryData(data); 
      } catch (e) {
        console.error('Error in fetchData:', e.message);
      }
    };
  
    useEffect(() => {
      fetchData(); 
    }, []);
  
    return (
      <View style={styles.screen}>
          <Title text={"Categories"} style={styles.title}/>
          <ScrollView contentContainerStyle={styles.container}> 
              {categoryData.map((category, index) => ( 
                  <ButtonPrototype 
                      key={index} 
                      label={category.toUpperCase()}  // Text in uppercase for better visibility
                      icon="return-down-forward-sharp" 
                      Bsize={24} 
                      fn={() => navigation.navigate('Products', { category: category })}
                      style={styles.button}
                  />
              ))}
          </ScrollView>
      </View>
  );
  
}
  
  const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f4f4f4', 
    },
    container: {
        flexGrow: 1,
        justifyContent: 'flex-start', 
        alignItems: 'center',
        paddingVertical: 10, 
    },
});