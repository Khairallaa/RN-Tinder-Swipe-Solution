import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface CardProps {
  name: string;
  age: number;
  image: any;
  index: number;
}

const Card: React.FC<CardProps> = ({ name, age, image, index }) => {
  return (
    <View style={[styles.card, { zIndex: -index }]}>
      <Image source={image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}, {age}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: '90%',
    height: '70%',
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Card;
