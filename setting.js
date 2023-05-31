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
              uri: "https://img.freepik.com/free-photo/closeup-shot-thermometer-beach-sand_181624-12367.jpg?w=1380&t=st=1685545410~exp=1685546010~hmac=8f902cd81b4aa925bb565f3db732f34c56b7cdde1ad7a8c47ccbc079ee015fcc",
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
              <Text style={{ color: "#000000", fontSize: 30, fontWeight: 900 }}>
                NHIỆT ĐỘ
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
                      color: Temp <= 35 ? "#FF3333" : "#FF3333",
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
                    color={Temp <= 35 ? "#FF3333" : "#FF3333"}
                  />
                </View>
                <FontAwesome5
                  name="temperature-high"
                  size={80}
                  color={Temp <= 35 ? "#FF3333" : "#FF3333"}
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
                    backgroundColor: Temp <= 35 ? "#FF3333" : "#FF3333",
                    marginRight: 5,
                    marginLeft: 5,
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: Temp <= 35 ? "#FF3333" : "#FF3333",
                  }}
                >
                  {Temp > 32 ? "Nhiệt độ cao" : Temp < 29 ? "Nhiệt độ thấp" : "Nhiệt độ thường"}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <ImageBackground
            source={{
              uri: "https://img.freepik.com/free-photo/water-drops-glass_1323-179.jpg?w=1380&t=st=1685545503~exp=1685546103~hmac=216de38fb347480c46f2658b0152c3e99eb711ea30d52fa33ae00df423ebad6a",
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
              <Text style={{ color: "#000000", fontSize: 30, fontWeight: 900 }}>
                ĐỘ ẨM
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
                      color: Humi <= 80 ? "#1265C7" : "#1265C7",
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
                    color={Humi <= 80 ? "#1265C7" : "#1265C7"}
                  />
                </View>
                <MaterialCommunityIcons
                  name="air-humidifier"
                  size={80}
                  color={Humi <= 80 ? "#1265C7" : "#1265C7"}
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
                    backgroundColor: Humi <= 80 ? "#1265C7" : "#1265C7",
                    marginRight: 5,
                    marginLeft: 5,
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: Humi <= 80 ? "#1265C7" : "#1265C7",
                  }}
                >
                  {Humi > 85 ? "Độ ẩm cao" : Humi < 65 ? "Độ ẩm thấp" : "Độ ẩm thường"}
                </Text>
              </View>
            </View>
          </ImageBackground>
          
          <ImageBackground
            source={{
              uri: "https://img.freepik.com/free-photo/vibrant-pastel-sky_53876-94792.jpg?w=1380&t=st=1685547161~exp=1685547761~hmac=f9dbc585d3d3d7aae1950f9bfd20cfc4469588414957a39a9407512d266f26e3",
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
                ÁNH SÁNG
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
                      color: Light <= 5 ? "#FFD700" : "#FFD700",
                      fontSize: 50,
                      fontWeight: 700,
                      marginTop: 10,
                    }}
                  >
                    {Light}
                  </Text>
                  <MaterialCommunityIcons
                    name="car-light-dimmed"
                    size={50}
                    color={Light <= 5 ? "#FFD700" : "#FFD700"}
                  />
                </View>
                <Entypo
                  name="light-up"
                  size={80}
                  color={Light <= 5 ? "#FFD700" : "#FFD700"}
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
                    backgroundColor: Light <= 5 ? "#FFD700" : "#FFD700",
                    marginRight: 5,
                    marginLeft: 5,
                  }}
                ></View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: Light <= 5 ? "#FFD700" : "#FFD700",
                  }}
                >
                  {Light > 0.2 ? "Cường độ ánh sáng cao" : "Cường độ ánh sáng bình thường"}
                </Text>
              </View>
            </View>
          </ImageBackground>
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