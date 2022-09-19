import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

const URL = "https://sshs-meal-api-kklmx0m20-hamerin.vercel.app/api"
const URL_SNACK = "https://snack.sshs-pebble.dev/snack"

const DAYS_OF_WEEK = ["일", "월", "화", "수", "목", "금", "토"]

export default function App() {

  const [morning, setMorning] = useState("로딩중...")
  const [lunch, setLunch] = useState("로딩중...")
  const [dinner, setDinner] = useState("로딩중...")
  const [snack, setSnack] = useState<String | undefined>("로딩중...")

  useEffect(() => {
    axios
      .get(URL)
      .then((data) => {
        const day = String(new Date().getDate())
        //@ts-ignore
        setMorning(data.data[day]["morning"]); setLunch(data.data[day]["lunch"]); setDinner(data.data[day]["dinner"])
      })

    axios
      .get(URL_SNACK)
      .then((response) => {
        const year = new Date().getFullYear()
        const month = new Date().getMonth()+1
        const day = new Date().getDate()
        //@ts-ignore
        console.log(response.data)
        let data;
        let success = false;
        for (data of response.data) {
          if(data.year === year && data.month === month && data.day === day) {
            success = true
            break
          }
        }
        if(success) setSnack(data['snack'])
        else setSnack(undefined)
      })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{new Date().getMonth()+1}월 {new Date().getDate()}일 {DAYS_OF_WEEK[new Date().getDay()]}요일 설곽 급식/간식</Text>
      
      <View style={styles.table}>

        <View style={styles.row}>
          <View style={{ flexDirection: "row", alignItems: "center", width: "100%", height: "100%" }}>
            <View style={styles.name}>
              <Text style={styles.titleText}>아침</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.contentText}>{morning === undefined ? "오늘은 아침이 없어요!" : morning}</Text>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flexDirection: "row", alignItems: "center", width: "100%", height: "100%" }}>
            <View style={styles.name}>
              <Text style={styles.titleText}>점심</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.contentText}>{lunch === undefined ? "오늘은 점심이 없어요!" : lunch}</Text>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flexDirection: "row", alignItems: "center", width: "100%", height: "100%" }}>
            <View style={styles.name}>
              <Text style={styles.titleText}>저녁</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.contentText}>{dinner === undefined ? "오늘은 저녁이 없어요!" : dinner}</Text>
            </View>
          </View>
        </View>

        <View style={styles.rowEnd}>
          <View style={{ flexDirection: "row", alignItems: "center", width: "100%", height: "100%" }}>
            <View style={styles.name}>
              <Text style={styles.titleText}>간식</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.contentText}>{snack === undefined ? "오늘은 간식이 없어요!" : snack}</Text>
            </View>
          </View>
        </View>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title : {
    marginBottom:"5px",
    fontSize: 15,
    fontWeight: '500'
  },
  table: {
    borderColor: "#000",
    borderWidth: 1,
    alignItems: "center",
    width: "80%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "90%",
    borderRadius: 20
  },
  row: {
    borderBottomWidth: 1,
    alignItems: "center",
    alignContent: "center",
    flex: 1,
    fontSize: 20,
    width: "100%",
  },
  rowEnd: {
    alignItems: "center",
    flex: 1,
    fontSize: 20,
    width: "100%",
  },
  name: {
    width: "20%",
    alignItems: "center",
    flexDirection: "column"
  },
  content: {
    width: "80%",
    flexDirection: "column",
    alignContent: "flex-start"
  },
  titleText: {
    fontWeight: "bold" 
  },
  contentText: {
    fontWeight: "300",
    fontSize:12
  }
});
