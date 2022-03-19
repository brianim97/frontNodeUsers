export const logOut = (setLogged) => {
    setLogged(false);
    window.localStorage.clear();
    
  };

