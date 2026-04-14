import { createContext, useContext, useState, useEffect } from "react"

// create context
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUsesr] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");

        if (token && role ) {
            setUsesr({token, role, name, email});
        }

    }, []); 


    // login 
    const login  = (token, role, name, email) =>{
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
    }

    const logout = () =>{
        localStorage.clear();
        setUsesr(null);
    }

    return(
        <AuthContext.Provider value = {{user, login , logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);