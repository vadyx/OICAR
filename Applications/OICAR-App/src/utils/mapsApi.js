import ENV from '../../env';

export const fetchStaticMap = async (lat, lng) => {
    const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=17&size=600x400&maptype=roadmap&markers=color:red%7Clabel:A%7C${lat},${lng}&key=${ENV.googleApiKey}`;
    return imagePreviewUrl;
}

export const fetchGeolocation = async (lat, lng) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=hr&key=${ENV.googleApiKey}`);
    const resData = await response.json();
    const addr = resData.results[0].formatted_address;

    const addrData = addr.split(",");
    const formattedAddr = {
        street: addrData[0],
        city: addrData[1] + ", " + addrData[2],
        country: addrData[3]
    };

    return formattedAddr;
};