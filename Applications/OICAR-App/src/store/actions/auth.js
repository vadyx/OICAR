export const REGISTRATION = 'REGISTRATION';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const registration = (username, firstName, lastName, email, password) => {
    return async dispatch => {
        const response = await fetch('http://192.168.1.2:12335/api/RegisteredUsers',
            {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({
                    FirstName: firstName,
                    LastName: lastName,
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
            const errorResData = await response.json();
            let errorData;
            switch (errorResData.Message) {
                case 'UQ_USERNAME':
                    errorData = {
                        id: 'username',
                        message: 'Netko već koristi ovo korisničko ime!'
                    };
                    break;
                case 'UQ_EMAIL':
                    errorData = {
                        id: 'email',
                        message: 'Ova adresa e-pošte se već koristi!'
                    };
                    break;
                default:
                    throw new Error('Registration failed!')
            }

            throw errorData;
        }

        const resData = await response.json();

        dispatch({
            type: REGISTRATION,
            registrationSuccessful: true
        });
    };
};

export const login = (username, password) => {
    return async dispatch => {
        const response = await fetch('http://192.168.1.2:12335/api/LoginCredentials',
            {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify({
                    Username: username,
                    Pwd: password
                })
            }
        );

        if (!response.ok) {
            throw new Error();
        }

        const resData = await response.json();
        if (!resData) {
            throw new Error();
        }

        dispatch({
            type: LOGIN,
            isLoggedIn: true
        });
    };
};

export const logout = () => {
    return {
        type: LOGOUT
    };
}