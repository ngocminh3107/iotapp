import {
  getDatabase,
  child,
  get,
  set,
  onValue,
  update,
  ref
} from "firebase/database";
import { dataRef } from "./firebase";
import { storage } from "./firebase";
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
} from "react-native";
import React, { useState, useEffect } from "react";
export default function History() {
  const [Temps, setTemps] = useState();
  const [Humis, setHumis] = useState();
  const [Lights, setLights] = useState();
  const dbRef = ref(getDatabase(dataRef));






  useEffect(() => {
    setInterval(() => {
      get(child(dbRef, `DHT`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setTemps(snapshot.val().TempHistory);
            setHumis(snapshot.val().HumHistory);
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
            setLights(snapshot.val().LightHistory);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000);
  }, []);

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    return date + "-" + month + "-" + year; //format: d-m-y;
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View>
          <View>
            <Text>Nhiệt độ</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Ngày</Text>
                <Text style={styles.tableHeader}>Nhiệt độ</Text>
                <Text style={styles.tableHeader}>Trạng thái</Text>
              </View>
              <View style={styles.tableRow}></View>

              {Temps &&
                Object.values(Temps)
                  .reverse()
                  .slice(0, 10)
                  .map((value, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text
                        style={[
                          styles.tableRow,
                          {
                            backgroundColor:
                              index % 2 === 0 ? "#82ff9d" : "white",
                            flex: 1,
                            padding: 10,
                          },
                        ]}
                      >
                        {getCurrentDate()}
                      </Text>
                      <Text
                        style={[
                          styles.tableRow,
                          {
                            backgroundColor:
                              index % 2 === 0 ? "#82ff9d" : "white",
                            flex: 1,
                            padding: 10,
                          },
                        ]}
                      >
                        {value}
                      </Text>
                      <Text
                        style={[
                          styles.tableRow,
                          {
                            backgroundColor:
                              index % 2 === 0 ? "#82ff9d" : "white",
                            flex: 1,
                            padding: 10,
                          },
                        ]}
                      >
                        {value > 35 ? "Cao" : "bình thường"}
                      </Text>
                    </View>
                  ))}
            </View>
          </View>
          <View>
            <Text>Độ Ẩm</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Ngày</Text>
                <Text style={styles.tableHeader}>Độ ẩm</Text>
                <Text style={styles.tableHeader}>Trạng thái</Text>
              </View>
              <View style={styles.tableRow}></View>

              {Humis &&
                Object.values(Humis)
                  .reverse()
                  .slice(0, 10)
                  .map((value, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text
                        style={[
                          styles.tableRow,
                          {
                            backgroundColor:
                              index % 2 === 0 ? "#82ff9d" : "white",
                            flex: 1,
                            padding: 10,
                          },
                        ]}
                      >
                        {getCurrentDate()}
                      </Text>
                      <Text
                        style={[
                          styles.tableRow,
                          {
                            backgroundColor:
                              index % 2 === 0 ? "#82ff9d" : "white",
                            flex: 1,
                            padding: 10,
                          },
                        ]}
                      >
                        {value}
                      </Text>
                      <Text
                        style={[
                          styles.tableRow,
                          {
                            backgroundColor:
                              index % 2 === 0 ? "#82ff9d" : "white",
                            flex: 1,
                            padding: 10,
                          },
                        ]}
                      >
                        {value > 70 ? "Cao" : "bình thường"}
                      </Text>
                    </View>
                  ))}
            </View>
          </View>
          <View>
            <Text>Ánh sáng</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Ngày</Text>
                <Text style={styles.tableHeader}>Ánh sáng</Text>
                <Text style={styles.tableHeader}>Trạng thái</Text>
              </View>
              <View style={styles.tableRow}></View>

              {Lights &&
                Object.values(Lights)
                  .reverse()
                  .slice(0, 10)
                  .map((value, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text
                        style={[
                          styles.tableRow,
                          {
                            backgroundColor:
                              index % 2 === 0 ? "#82ff9d" : "white",
                            flex: 1,
                            padding: 10,
                          },
                        ]}
                      >
                        {getCurrentDate()}
                      </Text>
                      <Text
                        style={[
                          styles.tableRow,
                          {
                            backgroundColor:
                              index % 2 === 0 ? "#82ff9d" : "white",
                            flex: 1,
                            padding: 10,
                          },
                        ]}
                      >
                        {value}
                      </Text>
                      <Text
                        style={[
                          styles.tableRow,
                          {
                            backgroundColor:
                              index % 2 === 0 ? "#82ff9d" : "white",
                            flex: 1,
                            padding: 10,
                          },
                        ]}
                      >
                        {value > 10 ? "Cao" : "bình thường"}
                      </Text>
                    </View>
                  ))}
            </View>
          </View>
          <View></View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    flex: 1,
    padding: 10,
  },
  tableCell: {
    flex: 1,
    padding: 10,
  },
});
