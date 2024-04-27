import { Text, View, StyleSheet, Image, Button, Pressable} from 'react-native';
import { COLORS } from './Color';
import { Ionicons } from '@expo/vector-icons';

export const ButtonPrototype = ({label, icon, Bsize, fn = () => console.log('clicked')}) =>{
  return(
    <Pressable style={({pressed}) => (pressed? {opacity:0.3} : {} )} onPress = {fn}>
      <View style={styles.buttonBox}>
        <Ionicons name={icon} size={Bsize} color={COLORS.ButtonText}/>
        <Text style={styles.text}>{label}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    buttonBox: {
      paddingVertical: 20,
      paddingHorizontal: 20, 
      padding: 15,
      backgroundColor: COLORS.ButtonOutter,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 6, 
      shadowOpacity: 0.6,
      shadowRadius: 3,
      shadowColor: '#000',
      shadowOffset: { height: 1, width: 0 },
      minWidth: '50%',
    },
    text: {
      fontSize: 16, 
      fontWeight: 'bold',
      color: COLORS.ButtonText, 
    },
  });