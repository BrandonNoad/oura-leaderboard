import Axios from 'axios';

let axiosInstance = null;

export const init = (jwt) => {
    if (axiosInstance !== null) {
        // return;
    }

    const headers = { Authorization: `Bearer ${jwt}` };

    axiosInstance = Axios.create({
        baseURL: `${process.env.GATSBY_BASE_URL}/.netlify/functions`,
        headers
    });
};

export const fetchSleepForDay = (date, accessToken) =>
    axiosInstance.get('/sleep', { params: { date, accessToken } });
