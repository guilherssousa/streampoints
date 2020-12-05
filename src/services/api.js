import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.streamelements.com'
});

async function getStreamCode(stream) {
    try {
        const response = await api.get(`/kappa/v2/channels/${stream}`);
        return response.data;
    } catch (e) {
        return 404;
    }
}

async function getPoints(stream, user) {
    try {
        const response = await api.get(`/kappa/v2/points/${stream}/${user}`);
        return response.data;
    } catch (e) {
        return null;
    }
}

async function getData(streams, user) {
    let data = [];
    for (_stream in streams) {
        let streamProfile = await getStreamCode(streams[_stream]);
        if (streamProfile != 404) {
            let streamPoints = await getPoints(streamProfile._id, user);
            if (streamPoints != null) {
                data.push({
                    ...streamProfile, ...streamPoints
                })
            }
        }
    }
    return data;
}

export { getStreamCode, getData };