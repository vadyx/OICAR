export const UPDATE_PROFILE_IMAGE = "UPDATE_PROFILE_IMAGE";

export const updateProfilePicture = (id, picture) => {
    return async dispatch => {
        const response = await fetch(`http://192.168.1.3:12335/api/user/setProfileImage/${id}`,
            {
                method: 'PUT',               
                headers: {
                    'Content-type' : 'application/json'
                },
                body: JSON.stringify(picture)
            }
        );

        if (!response.ok) {
            throw new Error("Error in setting the new picture");
        }

        dispatch({
            type: UPDATE_PROFILE_IMAGE,
            picture: picture
        });
    };
}