import React, { createContext, useState } from "react";


export const CurrentUserContext = createContext()

function CurrentUserProvider({ children }){
    const [currentUser, setCurrentUser] = useState(null)

    const setAndExportCurrentUser = (user) => {
        setCurrentUser(user)
    }


    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser: setAndExportCurrentUser }}>
            {children}
        </CurrentUserContext.Provider>
    );


}

export default CurrentUserProvider