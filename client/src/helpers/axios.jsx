import axios from "axios";

const instance = axios.create({
    baseURL : "https://real-jade-rabbit-robe.cyclic.app/",
})

export default instance;
