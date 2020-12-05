import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { getData } from '../services/api';

import { useUser } from '../contexts/user';

const Home = ({ navigation }) => {
  const { colors } = useTheme();
  const { user, streams, signOut, deleteStreamer } = useUser();
  const [streamers, setStreamers] = useState([]);
  const [ready, setReady] = useState(false);

  function handleNewStream() {
    navigation.navigate('Opções', {
      text: "Qual streamer você quer adicionar a lista?"
    });
  }

  async function handleLogout() {
    signOut();
  }

  async function handleDeleteStreamer(index, i) {
    Alert.alert(
      'Deseja apagar o streamer da sua lista?',
      'Se você apagá-lo, poderá adicionar denovo.',
      [
        {text: 'Sim', onPress: () => { 
          deleteStreamer(index.toLowerCase())
          setStreamers(streamers.splice(i, 1))
        }},
        {text: 'Não', onPress: () => {}},
      ],
    )
  }

  async function handleReset() {
    setStreamers(streamers);
  }

  useEffect(() => {
    async function loadStreams() {
      await AsyncStorage.setItem('@Streampoints:streams', JSON.stringify(streams));
      let data = await getData(streams, user);
      data.sort(function (a, b) {
        if (a.points > b.points) {
          return -1;
        }
        if (a.points < b.points) {
          return 1;
        }
        return 0;
      });
      setStreamers(data);
      setReady(true);

      if(streamers.length == 0) {
        setReady(false)
      }
    }

    loadStreams();
  }, [streamers]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background } ]}>
      <Text style={[styles.title, { color: colors.text } ]}>Lista de Stream</Text>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={handleNewStream}>Adicionar loja</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Trocar nick</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Atualizar</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll}>
        { ready ? streamers.map((streamer, index) => (
          <View key={index} style={styles.streamer}>
            <View style={styles.streamerData}>
              <TouchableOpacity onLongPress={ () => { handleDeleteStreamer(streamer.displayName, index) }  }>
                <Image style={styles.profileImage} source={{ uri: streamer.avatar }} />
              </TouchableOpacity>
              <Text style={[styles.streamTitle, { color: colors.text } ]}>{streamer.displayName}</Text>
            </View>
            <Text style={[styles.points, { color: colors.text }]}>{streamer.points} pts</Text>
          </View>
        )) : (
          <View style={styles.notTodayContainer}>
            <Text style={styles.notToday}>{
            streams.length == 0 ? 'Você não adicionou um streamer ainda.'  : 'Estamos preparando os dados...' }
            </Text>
          </View>
        ) }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 0
  },
  title: {
    fontFamily: 'bold',
    fontSize: 24
  },
  profileImage: {
    height: 60,
    width: 60,
    borderRadius: 70,
    backgroundColor: '#aeaeae',
  },
  streamer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },
  streamerData: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  streamTitle: {
    paddingLeft: 10,
    fontFamily: 'semibold',
    fontSize: 16
  },
  points: {
    paddingLeft: 10,
    fontFamily: 'regular',
    fontSize: 14
  },
  buttonView: {
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#6441A4',
    padding: 10,
    borderRadius: 5,
    marginRight: 5
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'semibold'
  },
  scroll: {
    marginTop: 10,
  },
  notTodayContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  notToday: {
    color: 'rgba(0,0,0,0.6)'
  }
});
  

export default Home;