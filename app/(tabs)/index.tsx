import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import Card from '@/components/Card';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.4;

const DATA = [
  { id: 1, name: 'سارة', age: 25, image: require('@/assets/images/react-logo.png') },
  { id: 2, name: 'أحمد', age: 30, image: require('@/assets/images/react-logo@2x.png') },
  { id: 3, name: 'ليلى', age: 22, image: require('@/assets/images/react-logo@3x.png') },
  { id: 4, name: 'خالد', age: 28, image: require('@/assets/images/partial-react-logo.png') },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [data, setData] = useState(DATA);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);

  const onSwipe = useCallback((direction: 'left' | 'right') => {
    console.log(`Swiped ${direction}`);
    // يمكن إضافة منطق مختلف هنا (مثل إرسال طلب API)
    if (direction === 'right') {
      console.log('Liked!');
    } else {
      console.log('Disliked!');
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }, []);

  const resetCard = useCallback(() => {
    translateX.value = withSpring(0);
    translateY.value = withSpring(0);
    rotation.value = withSpring(0);
  }, [translateX, translateY, rotation]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      rotation.value = interpolate(
        event.translationX,
        [-SCREEN_WIDTH / 2, SCREEN_WIDTH / 2],
        [-15, 15],
        'clamp'
      );
    })
    .onEnd((event) => {
      if (event.translationX > SWIPE_THRESHOLD) {
        // Swipe Right (Like)
        translateX.value = withSpring(SCREEN_WIDTH * 1.5, {}, () => {
          runOnJS(onSwipe)('right');
          runOnJS(resetCard)();
        });
      } else if (event.translationX < -SWIPE_THRESHOLD) {
        // Swipe Left (Dislike)
        translateX.value = withSpring(-SCREEN_WIDTH * 1.5, {}, () => {
          runOnJS(onSwipe)('left');
          runOnJS(resetCard)();
        });
      } else {
        // Return to center
        runOnJS(resetCard)();
      }
    });

  const topCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotateZ: `${rotation.value}deg` },
      ],
    };
  });

  const nextCardStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
      [0.9, 0.95, 0.9],
      'clamp'
    );
    const opacity = interpolate(
      translateX.value,
      [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
      [0.5, 1, 0.5],
      'clamp'
    );
    return {
      transform: [{ scale }],
      opacity,
    };
  });

  const renderCards = () => {
    return data.map((item, index) => {
      if (index < currentIndex) {
        return null; // البطاقات التي تم سحبها
      }

      const isTopCard = index === currentIndex;
      const isNextCard = index === currentIndex + 1;
      const isThirdCard = index === currentIndex + 2;

      let cardStyle = {};
      let zIndex = data.length - index;

      if (isTopCard) {
        cardStyle = topCardStyle;
      } else if (isNextCard) {
        cardStyle = nextCardStyle;
      } else if (isThirdCard) {
        cardStyle = { transform: [{ scale: 0.9 }] };
      } else {
        return null; // عرض 3 بطاقات فقط
      }

      return (
        <Animated.View
          key={item.id}
          style={[styles.animatedCard, cardStyle, { zIndex }]}
        >
          <Card {...item} index={index} />
        </Animated.View>
      );
    }).reverse(); // لعرض البطاقة العلوية في الأعلى
  };

  if (currentIndex >= data.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.noMoreCards}>لا مزيد من البطاقات!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <View style={styles.cardContainer}>
          {renderCards()}
        </View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  cardContainer: {
    width: SCREEN_WIDTH,
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedCard: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMoreCards: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Home;
