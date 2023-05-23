import {
  getDatabase,
  ref,
  child,
  get,
  set,
  onValue,
  update,
  off
} from "firebase/database";
import { dataRef } from "./firebase";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Information from "./setting";
import ImgScreenshort from "./imgscreenshort";
import History from "./history";
function HomeScreen() {
  const [buttonStatus1, setButtonStatus1] = useState();
  const [buttonStatus2, setButtonStatus2] = useState();
  const [buttonStatus3, setButtonStatus3] = useState();
  const [buttonStatus4, setButtonStatus4] = useState();
  const [buttonStatus5, setButtonStatus5] = useState();
  const [buttonStatus6, setButtonStatus6] = useState();
  const [buttonStatus7, setButtonStatus7] = useState();
  const dbRef = ref(getDatabase(dataRef));

  useEffect(() => {
    const dbRef = ref(getDatabase());
    const relayRef = child(dbRef, "autoControl");
    const handleSnapshot = (snapshot) => {
      if (snapshot.exists()) {
        const dataValue7 = snapshot.val();
        setButtonStatus7(dataValue7);
      } else {
        console.log("No data available");
      }
    };
    const handleError = (error) => {
      console.error(error);
    };
    onValue(relayRef, handleSnapshot, handleError);
    return () => off(relayRef, "value", handleSnapshot);
  }, []);
  console.log(buttonStatus6);

  useEffect(() => {
    const dbRef = ref(getDatabase());
    const relayRef = child(dbRef, "Relay");
    const handleSnapshot = (snapshot) => {
      if (snapshot.exists()) {
        const dataValue1 = snapshot.val().relay1.status;
        const dataValue2 = snapshot.val().relay2.status;
        const dataValue3 = snapshot.val().relay3.status;
        const dataValue4 = snapshot.val().relay4.status;
        const dataValue5 = snapshot.val().relay5.status;
        const dataValue6 = snapshot.val().relay6.status;
        setButtonStatus1(dataValue1);
        setButtonStatus2(dataValue2);
        setButtonStatus3(dataValue3);
        setButtonStatus4(dataValue4);
        setButtonStatus5(dataValue5);
        setButtonStatus6(dataValue6);
      } else {
        console.log("No data available");
      }
    };
    const handleError = (error) => {
      console.error(error);
    };
    onValue(relayRef, handleSnapshot, handleError);
    return () => off(relayRef, "value", handleSnapshot);
  }, []);
  console.log(buttonStatus1);

  const handleButtonPress1 = () => {
    const newButtonStatus = buttonStatus1 === 1 ? 0 : 1;
    setButtonStatus1(newButtonStatus);
    // Update the data in Firebase
    set(child(dbRef, "Relay/relay1/status"), newButtonStatus)
      .then(() => {
        console.log("Data updated successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleButtonPress2 = () => {
    const newButtonStatus = buttonStatus2 === 1 ? 0 : 1;
    setButtonStatus2(newButtonStatus);
    // Update the data in Firebase
    set(child(dbRef, "Relay/relay2/status"), newButtonStatus)
      .then(() => {
        console.log("Data updated successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleButtonPress3 = () => {
    const newButtonStatus = buttonStatus3 === 1 ? 0 : 1;
    setButtonStatus3(newButtonStatus);
    // Update the data in Firebase
    set(child(dbRef, "Relay/relay3/status"), newButtonStatus)
      .then(() => {
        console.log("Data updated successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleButtonPress4 = () => {
    const newButtonStatus = buttonStatus4 === 1 ? 0 : 1;
    setButtonStatus4(newButtonStatus);
    // Update the data in Firebase
    set(child(dbRef, "Relay/relay4/status"), newButtonStatus)
      .then(() => {
        console.log("Data updated successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleButtonPress5 = () => {
    const newButtonStatus = buttonStatus5 === 1 ? 0 : 1;
    setButtonStatus5(newButtonStatus);
    // Update the data in Firebase
    set(child(dbRef, "Relay/relay5/status"), newButtonStatus)
      .then(() => {
        console.log("Data updated successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleButtonPress7 = () => {
    const newButtonStatus = buttonStatus7 === 1 ? 0 : 1;
    setButtonStatus7(newButtonStatus);
    // Update the data in Firebase
    set(child(dbRef, "autoControl"), newButtonStatus)
      .then(() => {
        console.log("Data updated successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleButtonPress6 = () => {
    const newButtonStatus = buttonStatus6 === 1 ? 0 : 1;
    setButtonStatus6(newButtonStatus);
    // Update the data in Firebase
    set(child(dbRef, "Relay/relay6/status"), newButtonStatus)
      .then(() => {
        console.log("Data updated successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePress = () => {
    setIsPlaying(!isPlaying);
  };

  const music = {
    uri: "https://i.pinimg.com/564x/b1/bc/6d/b1bc6daf31d08ee2b77e1724143903da.jpg",
  };
  return (
    <View style={styles.buttonContainer}>
      {/* Button đèn sưởi */}
      <Pressable
        onPress={handleButtonPress1}
        style={[
          styles.button,
          buttonStatus1 === 1 ? styles.buttonOn : styles.buttonOff,
        ]}
      >
        <Foundation name="lightbulb" size={40} color="black" />
        <Text>{buttonStatus1 === 1 ? "Bật" : "Tắt"} Đèn sưởi ấm </Text>
      </Pressable>

      <Pressable
        onPress={handleButtonPress2}
        style={[
          styles.button,
          buttonStatus2 === 1 ? styles.buttonOn : styles.buttonOff,
        ]}
      >
        <MaterialCommunityIcons
          name="floor-lamp-dual"
          size={40}
          color="black"
        />
        <Text>{buttonStatus2 === 1 ? "Bật" : "Tắt"} đèn chống cú </Text>
      </Pressable>
      <Pressable
        onPress={handleButtonPress3}
        style={[
          styles.button,
          buttonStatus3 === 1 ? styles.buttonOn : styles.buttonOff,
        ]}
      >
        <MaterialCommunityIcons
          name="fan"
          size={40}
          color={buttonStatus3 === 1 ? "white" : "black"}
          style={buttonStatus2 === 1 ? styles.animation : styles.animations}
        />
        <Text>{buttonStatus3 === 1 ? "Bật" : "Tắt"} quạt </Text>
      </Pressable>

      <Pressable
        onPress={handleButtonPress4}
        style={[
          styles.button,
          buttonStatus4 === 1 ? styles.buttonOn : styles.buttonOff,
        ]}
      >
        <MaterialCommunityIcons name="pump" size={40} color="black" />
        <Text>{buttonStatus4 === 1 ? "Bật" : "Tắt"} bơm </Text>
      </Pressable>

      <Pressable
        onPress={handleButtonPress5}
        style={[
          styles.button,
          buttonStatus5 === 1 ? styles.buttonOn : styles.buttonOff,
        ]}
      >
        <Entypo name="water" size={40} color="black" />
        <Text>{buttonStatus5 === 1 ? "Bật" : "Tắt"} phun sương </Text>
      </Pressable>
      <Pressable
        onPress={handleButtonPress7}
        style={[
          styles.button,
          buttonStatus7 === 1 ? styles.buttonOn : styles.buttonOff,
        ]}
      >
        <MaterialCommunityIcons name="robot-happy" size={40} color="black" />
        <Text>{buttonStatus7 === 1 ? "Bật" : "Tắt"} Chế độ auto</Text>
      </Pressable>
      <View
        style={{
          borderRadius: 20,
        }}
      >
        <ImageBackground
          source={music}
          resizeMode="cover"
          style={{
            width: "100%",
            height: 100,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 20,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              borderRadius: 10,
              justifyContent: "space-between",
              paddingLeft: 40,
              paddingRight: 40,
              paddingTop: 10,
              paddingLeft: 40,
            }}
          >
            <Foundation name="previous" size={24} color="#ffffff" />

            <TouchableOpacity onPress={handlePress}>
              <View>
                <FontAwesome
                  name="pause"
                  size={24}
                  color="#ffffff"
                  onPress={handleButtonPress6}
                  style={buttonStatus6 === 0 ? styles.btnactive : null}
                />
                <FontAwesome
                  name="play"
                  size={24}
                  color="#ffffff"
                  onPress={handleButtonPress6}
                  style={buttonStatus6 === 1 ? styles.btnactive : null}

                />
              </View>
            </TouchableOpacity>
            <Foundation name="next" size={24} color="#ffffff" />
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Infomation" component={Information} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Image" component={ImgScreenshort} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    padding: 15,
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    textAlign: "center",
    alignItems: "center",
    width: "48%",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 300, height: 100 },
    shadowOpacity: 0.9,
    shadowRadius: 3,
    marginBottom: 25,
  },
  buttonOn: {
    backgroundColor: "#05e6ff",
  },
  buttonOff: {
    backgroundColor: "#ffffff",
  },
  animation: {
    transform: [{ rotate: "180deg" }],
  },
  btnactive: {
    display: "none",
  },
});
