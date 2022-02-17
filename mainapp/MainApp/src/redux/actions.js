const API_URL = 'https://mocki.io/v1/aac8b81a-139c-4235-82e6-0dbadf33f2b7';

export const setName = (name) => {
    return {
        type: 'SET_NAME',
        payload: name
    }
}

export const setAge = (age) => {
    return {
        type: 'SET_AGE',
        payload: age
    }
}

export const setIncrementAge = (age) => {
    return {
        type: 'SET_INCREMENT_AGE',
        payload: age
    }
}

export const getCities = () => {
    try {
        return async dispatch => {
            const result = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await result.json();
            if (json) {
                dispatch({
                    type: 'GET_CITIES',
                    payload: json
                });
            } else {
                console.log('Unable to fetch!');
            }
        }
    } catch (error) {
        console.log(error);
    }
}
