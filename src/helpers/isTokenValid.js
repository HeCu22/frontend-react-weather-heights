import jwt_decode from 'jwt-decode';

function isTokenValid(jwtToken) {
    const decodedToken = jwt_decode(jwtToken);
    const expirationUnix = decodedToken.exp; // UNIX timestamp

    const now = new Date().getTime(); // javascript timestamp van het huidige moment
    const nowInUnix = Math.round(now / 1000); // UNIX timestamp van het huidige moment

    // seconden over wanneer we "nu" aftrekken van de expiratiedatum ?
    // console.log('istokenvalid', expirationUnix, nowInUnix);
    if (expirationUnix - nowInUnix > 0) {
        return true;   // token is nog valid
    } else
    {
        console.log('invalid token')
        return false;

    }
}

export default isTokenValid;

