import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { Pressable, Text, View } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home', headerShown: false }} />
      <View className="flex-1 items-center justify-center gap-20 bg-white dark:bg-black">
        <View className="flex-row gap-3">
          {['dark', 'light', 'system'].map((item, index) => (
            <ChangeSchemeButton key={index} item={item} />
          ))}
        </View>

        <Text className="text-8xl text-black dark:text-white">Text</Text>
      </View>
    </>
  );
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const ChangeSchemeButton = ({ item }: { item: string }) => {
  const scale = useSharedValue(1);
  const { setColorScheme } = useColorScheme();
  return (
    <AnimatedPressable
      onPressIn={() => (scale.value = withSpring(0.8))}
      onPressOut={() => (scale.value = withSpring(1))}
      style={{
        transform: [{ scale }],
      }}
      onPress={() => {
        setColorScheme(item as 'light' | 'dark' | 'system');
        console.error('Changed scheme to', item);
      }}
      className="rounded-full bg-red-600 px-6 py-3">
      <Text className="text-lg capitalize text-white">{item}</Text>
    </AnimatedPressable>
  );
};
