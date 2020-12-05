import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


import { useUser } from '../contexts/user';

const SignIn = () => {
    const { signIn } = useUser();
    const [disabled, setDisabled] = useState(true);
    const [user, setUser] = useState('');


    useEffect(() => {
        if (user.length >= 3) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [user]);

    async function handleSignIn() {
        await signIn(user);
    }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Antes de começar, precisamos saber seu nick da Twitch.</Text>
        <TextInput
            placeholder="Insira o nome"
            placeholderTextColor='rgba(0,0,0,0.7)'
            style={styles.input}
            autoCapitalize='none'
            autoCorrect={false}
            onChangeText={setUser}
            value={user}
        />
        <TouchableOpacity style={disabled ? styles.buttonDisabled : styles.button} onPress={handleSignIn} disabled={disabled} >
            <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
        <Text style={styles.credits}>Essa aplicação não tem envolvimento com a Twitch, StreamElements ou streamers citados.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontFamily: 'bold',
        fontSize: 24,
        marginBottom: 10,
    },
    input: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 10,
        borderRadius: 5,
    },
    button: {
        marginTop: 10,
        backgroundColor: '#6441A4',
        padding: 10,
        borderRadius: 5,
    },
    buttonDisabled: {
        marginTop: 10,
        backgroundColor: '#6441A480',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'semibold',
        textAlign: 'center'
    },
    credits: {
        marginTop: 10,
        color: '#a2a2a2',
        fontFamily: 'regular'
    }
})

export default SignIn;