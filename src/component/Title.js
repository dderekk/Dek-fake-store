import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { COLORS } from './Color';

export const Title = ({ text }) => {
    return(
        <View style={styles.titleContainer}>
          <View style={styles.line} />
          <Text style={styles.sectionTitle}>{text}</Text>
          <View style={styles.line} />
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        width: '90%',
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 35,
        marginBottom: 20,
        alignSelf: 'center',
        marginVertical: 20,
        backgroundColor: COLORS.TitleBackground, // Light pink background for the title
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 10, // Rounded corners for the title's background
        overflow: 'hidden', // Ensure the background doesn't bleed out of the corners
        elevation: 5, // Slight shadow for the title
        shadowOpacity: 0.4,
        shadowRadius: 4,
        shadowColor: '#000',
        shadowOffset: { height: 2, width: 0 },
    },
    line: {
        flex: 1,
        height: 2, 
        backgroundColor: COLORS.primary, // Assuming there's a 'primary' color in your COLORS object
    },
    sectionTitle: {
        fontSize: 24, // Reduced font size for better aesthetics
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 10,
        color: COLORS.primary, // Matching the color with primary color
    },
});