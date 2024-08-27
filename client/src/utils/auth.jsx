export const checkTokenValidity = () => {
    const tokenExpireTime = localStorage.getItem('tokenExpireTime');
    const currentTime = Date.now();

    console.log('Token Expire Time:', tokenExpireTime);
    console.log('Current Time:', currentTime);

    if (!tokenExpireTime || currentTime > parseInt(tokenExpireTime, 10)) {
        // Token etibarsızdırsa, onu silin
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExpireTime');
        console.log('Token expired, navigating to login');
        return false;
    }

    return true;
};
