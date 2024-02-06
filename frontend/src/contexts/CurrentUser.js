import React, { createContext, useEffect, useState } from "react";


export const CurrentUserContext = createContext()

function CurrentUserProvider({ children }){
    const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const getLoggedInUser = async () => {
      try {
        let response = await fetch('http://localhost:5000/authentication/profile');
        let user = await response.json();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    getLoggedInUser();
  }, []);

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