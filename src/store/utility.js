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

export const parseRawData = (rawEvent) => {
  const tempInitDate = new Date(rawEvent.fechainicio)
  const tempEndDate = new Date(rawEvent.fechafin)

  const eventsTemp = {
      id: rawEvent.id,
      eventName: rawEvent.nombreevento,
      state: rawEvent.estado,
      initDate: tempInitDate.toString(),
      endDate: tempEndDate.toString(),
  };

  const fetchTemp = {
      ...eventsTemp,
      record: {
          elections: {...rawEvent.Election},
          pollingStations: {...rawEvent.PollingTable}
      }
  }

  return {
    event: eventsTemp,
    fetch: fetchTemp
  }

}

export const isAdmin = (id, users) => {
  const user = users.find( user => user.id === id )
  if( user )
    return user.type === 'admin'
  return false
}