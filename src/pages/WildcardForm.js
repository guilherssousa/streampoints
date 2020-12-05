import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, TouchableOpacityComponent, Alert } from 'react-native';

import { getStreamCode } from '../services/api';

import { useUser } from '../contexts/user';

const WildcardForm = ({ route, navigation }) => {
    const [streamer, setStreamer] = useState('');
    const [streamData, setStreamData] = useState(undefined);
    const [buttonDisable, setButtonDisable] = useState(false);
    const [confirmButton, setConfirmButton] = useState(false);
    const { text } = route.params;
    const { addStreamer } = useUser();


    async function handleAddStreamer() {
        await addStreamer(streamer);
        navigation.navigate('Home');
    }

    async function checkStreamer() {
        setButtonDisable(true);
        let stream = await getStreamCode(streamer);
        if (stream == 404) {
            Alert.alert('O streamer não existe.')
            setButtonDisable(false);
        } else {
            setStreamData(stream);
            setConfirmButton(true);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{text}</Text>
            <TextInput
                placeholder="Insira o nome"
                placeholderTextColor='rgba(0,0,0,0.7)'
                style={styles.input}
                onChangeText={setStreamer}
                value={streamer}
                autoCapitalize='none'
                autoCorrect={false}
            />
            { streamData && (
                <View style={styles.streamer}>
                <View style={styles.streamerData}>
                  <Image style={styles.profileImage} source={{ uri: streamData.avatar }} />
                  <Text style={styles.streamTitle}>{streamData.displayName}</Text>
                </View>
              </View>
            )}
            
            {
                confirmButton ? (
                    <TouchableOpacity style={styles.buttonConfirm} onPress={handleAddStreamer}>
                        <Text style={styles.buttonText}>Confirmar</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.button} disabled={buttonDisable} onPress={checkStreamer}>
                        <Text style={styles.buttonText}>Checar</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
      paddingBottom: 0
    },
    title: {
        fontFamily: 'semibold',
        fontSize: 18
    },
    input: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 10,
        borderRadius: 5,
    },
    streamer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        padding: 15,
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth: 1,
        borderRadius: 10,
    },
    profileImage: {
        height: 60,
        width: 60,
        borderRadius: 70,
        backgroundColor: '#aeaeae',
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
    button: {
        marginTop: 10,
        backgroundColor: '#6441A4',
        padding: 10,
        borderRadius: 5,
    },
    buttonConfirm: {
        marginTop: 10,
        backgroundColor: '#64DDA4',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'semibold',
        textAlign: 'center'
    },
})

export default WildcardForm;