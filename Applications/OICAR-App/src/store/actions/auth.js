export const REGISTRATION = 'REGISTRATION';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const registration = (username, fullName, email, password) => {
    return async dispatch => {
        const response = await fetch('http://192.168.1.3:12335/api/RegisteredUsers',
            {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({
                    FirstName: fullName,
                    LastName: fullName,
                    Email: email,
                    Rating: 4.0,
                    RegistrationDate: new Date(),
                    LoginCredentials:{
                        Username: username,
                        Pwd: password
                    }
                })
            }
        );

        if (!response.ok) {
            const errorResData = await response.text();
            //response contains error, throw it as a {'column', 'errortext'} object
            throw new Error('Registration was not ok');
        }

        const resData = await response.json();
        console.log('Returned data: ');
        console.log(resData);

        dispatch({
            type: REGISTRATION,
            registrationSuccessful: true
        });
    }
};

export const logout = () => {
    return {
        type: LOGOUT
    };
}