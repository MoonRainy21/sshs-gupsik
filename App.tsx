import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';

const URL = "https://sshs-meal-api-kklmx0m20-hamerin.vercel.app/api"
const URL_SNACK = "https://snack.sshs-pebble.dev/snack"

const URL_TIME = "https://www.timeapi.io/api/Time/current/zone?timeZone=Asia/Seoul"

export default function App() {

  const [morning, setMorning] = useState("로딩중...")
  const [lunch, setLunch] = useState("로딩중...")
  const [dinner, setDinner] = useState("로딩중...")
  const [snack, setSnack] = useState<String | undefined>("로딩중...")

  const [year, setYear] = useState<Number>(0)
  const [month, setMonth] = useState<Number>(0)
  const [day, setDay] = useState<Number>(0)

  useEffect(() => {
    axios
      .get(URL_TIME)
      .then((response) => {
        setYear(response.data.year)
        setMonth(response.data.month)
        setDay(response.data.day)
      })
      console.log([year, month, day].toString())
  }, [])

  useEffect(() => {
    console.log([year, month, day].toString())

    if (year === 0 || month === 0 || day === 0) return

    axios
      .get(URL)
      .then((data) => {
        const dayString = day.toString()
        setMorning(data.data[dayString]["morning"]); setLunch(data.data[dayString]["lunch"]); setDinner(data.data[dayString]["dinner"])
      })

    axios
      .get(URL_SNACK)
      .then((response) => {
        let data;
        let success = false;
        for (data of response.data) {
          if (data.year === year && data.month === month && data.day === day) {
            success = true
            break
          }
        }
        if (success) setSnack(data['snack'])
        else setSnack(undefined)
      })
  }, [day])

  return (
    <View style={styles.container}>

      <Text style={styles.titleText}>{`${month.toString()}월 ${day.toString()}일 설곽 급식/간식`}</Text>
      
      <View style={styles.table}>

        <View style={styles.row}>
          <View style={{ flexDirection: "row", alignItems: "center", width: "100%", height: "100%" }}>
            <View style={styles.name}>
              <Text style={styles.titleText}>아침</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.contentText}>{morning === undefined ? "오늘 아침은 없어요!" : morning}</Text>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flexDirection: "row", alignItems: "center", width: "100%", height: "100%" }}>
            <View style={styles.name}>
              <Text style={styles.titleText}>점심</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.contentText}>{lunch === undefined ? "오늘 점심은 없어요!" : lunch}</Text>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flexDirection: "row", alignItems: "center", width: "100%", height: "100%" }}>
            <View style={styles.name}>
              <Text style={styles.titleText}>저녁</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.contentText}>{dinner === undefined ? "오늘 저녁은 없어요!" : dinner}</Text>
            </View>
          </View>
        </View>

        <View style={styles.rowEnd}>
          <View style={{ flexDirection: "row", alignItems: "center", width: "100%", height: "100%" }}>
            <View style={styles.name}>
              <Text style={styles.columnText}>간식</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.contentText}>{snack === undefined ? "오늘 간식은 없어요!" : snack}</Text>
            </View>
          </View>
        </View>

      </View>
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
  titleText: {
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
  columnText: {
    fontWeight: "bold"
  },
  contentText: {
    fontWeight: "300",
    fontSize: 12
  }
});
