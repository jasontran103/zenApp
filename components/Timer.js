import React, {useState} from 'react';
import {
  Vibration,
  StatusBar,
  Easing,
  FlatList,
  TextInput,
  Animated,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Button,
}
  from 'react-native';

  import pauseButton from '../assets/image/pause.png';
  import backGround from '../assets/image/japanese_paper_texture.png';

const { width, height } = Dimensions.get('window');
const colors = {
  backGround: "#fffaf0",
  button: "#1B1B1B",
  text: "#000000",
}

const timers = [...Array(13).keys()].map((i) => (i === 0 ? 1 : i * 5));
const itemSize = width * 0.38;
const itemSpacing = (width - itemSize) / 2;

export default function Timer(props) {

  // const [counter,setCounter] = useState(0);

  const counter = props.counterProp;

  const setCounter = props.setCounterProp;

  const incrementCounter = () => {
      setCounter(counter + 1)
  };

  const xScroll = React.useRef(new Animated.Value(0)).current;
  const [duration, setDuration] = React.useState(timers[0]);
  const timerAnimation = React.useRef(new Animated.Value(height)).current;
  const animateButton = React.useRef(new Animated.Value(0)).current;
  const animateTextInput = React.useRef(new Animated.Value(timers[0])).current;
  const animateTextInput2 = React.useRef(new Animated.Value(timers[0])).current;
  const inputRef = React.useRef();

  React.useEffect(() => {
    const listner = animateTextInput.addListener(({ value }) => {
      inputRef?.current?.setNativeProps({
        text: Math.ceil(value).toString(),
      });
    });
    return () => {
      animateTextInput.removeListener(listner);
      animateTextInput.removeAllListeners();
    };
  });

    const combinedFunction = () => {
      animations();
      incrementCounter();
    }

  const animations = React.useCallback(() => {

    incrementCounter()
    animateTextInput.setValue(duration);
    Animated.sequence([
      Animated.timing(animateButton, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(timerAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(animateTextInput, {
          toValue: 0,
          duration: duration * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(timerAnimation, {
          toValue: height,
          duration: duration * 1000,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {

      Animated.timing(animateButton, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [duration]);

  const opacity = animateButton.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const translateY = animateButton.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const textOpacity = animateButton.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <ImageBackground
      source={backGround}
      style={styles.container}
    >
      <View style={styles.container}>
        <StatusBar hidden />
        <Text style={styles.timerText}>Timer</Text>
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              transform: [
                {
                  translateY: timerAnimation,
                },
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            StyleSheet.absoluteFillObject,
            {
              justifyContent: "flex-end",
              alignItems: "center",
              paddingBottom: 220,
              opacity,
              transform: [
                {
                  translateY,
                },
              ],
            },
          ]}
        >
          <Text style={styles.minutesText}>Minutes</Text>
          <TouchableOpacity onPress={combinedFunction}>
            <View style={styles.roundButton} />
            <Text style={styles.startSessionTimer}>START SESSION</Text>
          </TouchableOpacity>
        </Animated.View>
        <View
          style={{
            position: "absolute",
            top: height / 3,
            left: 0,
            right: 0,
            flex: 1,
          }}
        >
          <Animated.View
            style={{
              position: "absolute",
              width: itemSize,
              justifyContent: "center",
              alignSelf: "center",
              alignItems: "center",
              opacity: textOpacity,
            }}
          >
            <TextInput
              ref={inputRef}
              style={styles.text}
              defaultValue={duration.toString()}
            />
          </Animated.View>
          <Animated.FlatList
            data={timers}
            keyExtractor={(item) => item.toString()}
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / itemSize
              );
              setDuration(timers[index]);
            }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: xScroll } } }],
              { useNativeDriver: true }
            )}
            snapToInterval={itemSize}
            decelerationRate="fast"
            style={{ flexGrow: 0, opacity }}
            contentContainerStyle={{
              paddingHorizontal: itemSpacing,
            }}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * itemSize,
                index * itemSize,
                (index + 1) * itemSize,
              ];

              const opacity = xScroll.interpolate({
                inputRange,
                outputRange: [0.4, 1, 0.4],
              });

              const scale = xScroll.interpolate({
                inputRange,
                outputRange: [0.6, 1, 0.6],
              });
              return (
                <View
                  style={{
                    width: itemSize,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Animated.Text
                    style={[
                      styles.text,
                      {
                        opacity,
                        transform: [
                          {
                            scale,
                          },
                        ],
                      },
                    ]}
                  >
                    {item}
                  </Animated.Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  roundButton: {
    width: 200,
    height: 65,
    borderRadius: 100,
    backgroundColor: colors.button,
    padding: 10
  },
  roundButton2: {
    width: 200,
    height: 65,
    alignSelf: 'center',
    borderRadius: 100,
    backgroundColor: colors.button,
  },
  text: {
    fontSize: itemSize * 0.6,
    color: colors.text,
    fontWeight: "300",
  },
  timerText: {
    fontSize: 50,
    padding: 50,
    alignSelf: "center",
    color: colors.text,
    fontWeight: "300",
  },
  minutesText: {
    fontSize: 25,
    marginTop: 70,
    marginBottom: 50,
    alignSelf: "center",
    color: colors.text,
    fontWeight: "300",
  },
  startSessionTimer: {
    fontSize: 20,
    top: -45,
    alignSelf: "center",
    color: "#ffffff",
    fontWeight: "300",
  },
  stopSessionTimer: {
    fontSize: 20,
    top: 55,
    alignSelf: "center",
    color: "#ffffff",
    fontWeight: "300",
  },

  playButton: {
    borderRadius:50/2,
    width: 50,
    height: 50,
    top:435,
    alignSelf:'center',

    backgroundColor: colors.button,
  },
});
