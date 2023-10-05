import axios from "axios";
import {API_KEY} from "./key.js";

const getData = async () => {
    return axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=300&api_key=${API_KEY}`)
        .then(({data}) => data.photos
            .map(photo => axios.head(photo.img_src)));
}

const index = async () => {
    const data = await getData();
    axios.all(data).then(arr => {
        let max = 0;
        let maxItem = {};
        arr.forEach(item => {
            const contentLength = item.headers.getContentLength();
            if (Number(item.headers.getContentLength()) > max) {
                max = contentLength;
                maxItem = item;
            }
        });
        return maxItem.config.url;
    })
        .then(console.log);
}

index()