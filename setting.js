import {
  getDatabase,
  ref,
  child,
  get,
  set,
  onValue,
  update,
} from "firebase/database";
import { dataRef } from "./firebase";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  RNCWebView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import { WebView } from "react-native-webview";

export default function Information() {
  const [Temp, setTemp] = useState();
  const [Humi, setHumi] = useState();
  const [Light, setLight] = useState();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const dbRef = ref(getDatabase(dataRef));
  useEffect(() => {
    setInterval(() => {
      get(child(dbRef, `DHT`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setTemp(snapshot.val().Temperature);
            setHumi(snapshot.val().Humidity);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000);
  }, []);

  useEffect(() => {
    setInterval(() => {
      get(child(dbRef, `BH1750`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setLight(snapshot.val().Light);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000);
  }, []);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 5,
          }}
        >
          <ImageBackground
            source={{
              uri: "https://i.pinimg.com/564x/fb/51/a6/fb51a64b7e12d4ed3ff182d9249590e2.jpg",
            }}
            style={{
              flex: 1,
              resizeMode: "cover",
              justifyContent: "center",
              height: 200,
              marginBottom: 10,
            }}
            imageStyle={{ borderRadius: 20 }}
          >
            <View
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 20,
                backgroundColor: "rgba(255, 255, 255, 0.4)", // Adjust the opacity for the glass effect
                height: 200,
              }}
            >
              <Text style={{ color: "#ffffff", fontSize: 30, fontWeight: 900 }}>
                Nhiệt độ
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: Temp <= 35 ? "#09FF00" : "#FF3333",
                      fontSize: 50,
                      fontWeight: 700,
                      marginTop: 10,
                    }}
                  >
                    {Temp}
                  </Text>
                  <MaterialCommunityIcons
                    name="temperature-celsius"
                    size={50}
                    color={Temp <= 35 ? "#09FF00" : "#FF3333"}
                  />
                </View>
                <FontAwesome5
                  name="temperature-high"
                  size={80}
                  color={Temp <= 35 ? "#09FF00" : "#FF3333"}
                />
              </View>
              <View
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  marginTop: 10,
                  width: 230,
                  padding: 4,
                  borderRadius: 5,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 10,
                    backgroundColor: Temp <= 35 ? "#09FF00" : "#FF3333",
                    marginRight: 5,
                    marginLeft: 5,
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: Temp <= 35 ? "#09FF00" : "#FF3333",
                  }}
                >
                  {Temp <= 35 ? "Nhiệt độ bình thường" : "Nhiệt độ quá cao"}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <ImageBackground
            source={{
              uri: "https://i.pinimg.com/564x/45/f8/62/45f862b88c3d13d52a223fcdb63e5249.jpg",
            }}
            style={{
              flex: 1,
              resizeMode: "cover",
              justifyContent: "center",
              height: 200,
              marginBottom: 10,
            }}
            imageStyle={{ borderRadius: 20 }}
          >
            <View
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 20,
                backgroundColor: "rgba(255, 255, 255, 0.4)", // Adjust the opacity for the glass effect
                height: 200,
              }}
            >
              <Text style={{ color: "#ffffff", fontSize: 30, fontWeight: 900 }}>
                Độ ẩm
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: Humi <= 80 ? "#33CCFF" : "#FF3333",
                      fontSize: 50,
                      fontWeight: 700,
                      marginTop: 10,
                    }}
                  >
                    {Humi}
                  </Text>
                  <FontAwesome
                    name="percent"
                    size={39}
                    color={Humi <= 80 ? "#33CCFF" : "#FF3333"}
                  />
                </View>
                <MaterialCommunityIcons
                  name="air-humidifier"
                  size={80}
                  color={Humi <= 80 ? "#33CCFF" : "#FF3333"}
                />
              </View>
              <View
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  marginTop: 10,
                  width: 230,
                  padding: 4,
                  borderRadius: 5,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 10,
                    backgroundColor: Humi <= 80 ? "#33CCFF" : "#FF3333",
                    marginRight: 5,
                    marginLeft: 5,
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: Humi <= 80 ? "#33CCFF" : "#FF3333",
                  }}
                >
                  {Humi <= 80 ? "Độ ẩm bình thường" : "độ ẩm quá cao"}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <View
            source={{
              uri: "https://i.pinimg.com/564x/57/8f/54/578f54f7c67dade8bbb7a2bc5fc1c110.jpg",
            }}
            style={{
              flex: 1,
              resizeMode: "cover",
              justifyContent: "center",
              height: 200,
              marginBottom: 10,
            }}
            imageStyle={{ borderRadius: 20 }}
          >
            <View
              style={{
                width: "100%",
                padding: 15,
                borderRadius: 20,
                backgroundColor: "rgba(255, 255, 255, 1)", // Adjust the opacity for the glass effect
                height: 200,
              }}
            >
              <Text style={{ color: "#000000", fontSize: 30, fontWeight: 900 }}>
                Ánh Sáng
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: Light <= 5 ? "#FFD700" : "#FF3333",
                      fontSize: 50,
                      fontWeight: 700,
                      marginTop: 10,
                    }}
                  >
                    {Light}
                  </Text>
                  <FontAwesome5
                    name="fantasy-flight-games"
                    size={50}
                    color={Light <= 5 ? "#FFD700" : "#FF3333"}
                  />
                </View>
                <Entypo
                  name="light-up"
                  size={80}
                  color={Light <= 5 ? "#FFD700" : "#FF3333"}
                />
              </View>
              <View
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  marginTop: 10,
                  width: 230,
                  padding: 4,
                  borderRadius: 5,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 10,
                    width: 10,
                    borderRadius: 10,
                    backgroundColor: Light <= 5 ? "#FFD700" : "#FF3333",
                    marginRight: 5,
                    marginLeft: 5,
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: Light <= 5 ? "#FFD700" : "#FF3333",
                  }}
                >
                  {Light <= 5 ? "Ánh sáng bình thường" : "Ánh sáng quá cao"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <Text>Camera</Text>
          <View style={styles.container}>
            <WebView
              source={{ uri: "http://171.248.33.156:5000/video_feed" }}
              style={{ width:"100%", height: 150,flex: 1, borderRadius:15, marginTop:10 }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
