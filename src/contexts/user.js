import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-community/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [streams, setStreams] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
          const storagedUser = await AsyncStorage.getItem("@Streampoints:user");
          const storagedToken = JSON.parse(await AsyncStorage.getItem("@Streampoints:streams"));
    
          if (storagedUser && storagedToken) {
            setUser(storagedUser);
            setStreams(storagedToken);
          }

          setLoading(false);
        }
    
        loadStorageData();
    }, []);

    async function signIn(user) {
        setUser(user);
        await AsyncStorage.setItem("@Streampoints:user", user);
    }

    async function signOut() {
        await AsyncStorage.clear();
        setUser(null);
    }

    async function addStreamer(streamer) {
      await setStreams([...streams, streamer]);
      await AsyncStorage.setItem("@Streampoints:streams", JSON.stringify(streams));
    }

    async function deleteStreamer(streamer) {
      for (let i in streams) {
        if(streams[i] == streamer) {
          streams.splice(i, 1);
          await setStreams(streams);
          await AsyncStorage.setItem("@Streampoints:streams", JSON.stringify(streams));
        };
      };
    };

    return (
        <UserContext.Provider
          value={{ signed: !!user, user, streams, loading, signIn, signOut, addStreamer, deleteStreamer }}
        >
          {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext)
    return context
}