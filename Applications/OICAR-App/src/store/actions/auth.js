export const REGISTRATION = 'REGISTRATION';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const registration = (username, fullName, email, password) => {
    return async dispatch => {
        const response = await fetch('http://192.168.1.5:55598/api/RegisteredUsers',
            {
                method: 'POST',
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
            console.log(errorResData);
            throw new Error('Registration was not ok');
        }

        console.log('I got past the response');
        const resData = await response.json();
        console.log('Returned data: ');
        console.log(resData);

        dispatch({
            type: REGISTRATION,
            isSuccessful: false
        });
    }
};

export const logout = () => {
    return {
        type: LOGOUT
    };
}