import DocumentVerification from '../../models/documentVerification';
import Api from '../../services/api';
import { storeAsyncData } from '../../services/asyncStorage';

export const REGISTRATION = 'REGISTRATION';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
const keyToken = "@token";

export const registration = (username, firstName, lastName, email, password) => {
    return async dispatch => {
        const response = await Api('http://192.168.151.113:12335/api/registration',
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
            const responseError = await response.json();
            let errorData;
            switch (responseError.Message) {
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
            registrationSuccessful: resData
        });
    };
};

export const login = (username, password) => {
    return async dispatch => {
        const response = await Api('http://192.168.151.113:12335/api/login',
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
            isLoggedIn: true,
            userData: {
                id: resData.IDRegisteredUser,
                firstName: resData.FirstName,
                lastName: resData.LastName,
                email: resData.Email,
                rating: resData.Rating,
                registrationDate: resData.RegistrationDate,
                profilePicture: resData.ProfileImage,
                documentVerification: new DocumentVerification(
                    resData.Verification.PersonalIdentificationVerified,
                    resData.Verification.PersonalIdentificationVerificationExpirationDate,
                    resData.Verification.DriverLicenseVerified,
                    resData.Verification.DriverLicenseVerificationExpirationDate,
                ),
                token: resData.Token
            }
        });
        storeAsyncData(keyToken,resData.Token);
    };
};

export const logout = () => {
    return {
        type: LOGOUT
    };
}