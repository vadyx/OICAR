import { getAsyncData } from "./asyncStorage";

const keyToken = "@token";

const Api = async(endpoint, options = {}) => {
    options.headers = options.headers || {};
    const token = await getAsyncData(keyToken);
    options.headers = {...options.headers, "Authorization":`Bearer ${token}`};
    console.log(options.headers);
    return await fetch(endpoint, {...options });
};

export default Api;