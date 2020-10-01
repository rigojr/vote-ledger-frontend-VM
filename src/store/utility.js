export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const parseRawDataUser = (rawUser) => {

    const userTemp = {
      id: rawUser.id,
      name: rawUser.nombre,
      faculty: rawUser.facultad,
      school: rawUser.escuela,
      email: rawUser.email,
    };

    const fetchTemp = {
      ...userTemp,
      password: rawUser.password,
      type: rawUser.type,
      status: rawUser.status,
      voteRercord: {...rawUser.HistorialVotos}
    }

    return {
      user: userTemp,
      fetch: fetchTemp
    }

  }