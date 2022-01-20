import React, { useState, useEffect, createContext } from 'react';
import { Navigate } from 'react-router-dom'

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        // fetch('/api/auth/user_data')
        //     .then(response => {
        //         if (response.email) {
        //             setIsAuth(true)
        //             console.log(response.email)
        //         } else {
        //             setIsAuth(false)
        //         }
        //     })
        fetch("/api/auth/authenticate", {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .then((res) => res.json())
        .then((result) => {
            if (result.email) {
                const { id, email, tier, referred, code } = result;
                const store = { id, email, tier, referred, code };
                console.log(store);
                localStorage.setItem('user-data', JSON.stringify(store));
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
        }).catch((err) => {
            setIsAuth(false);
            console.log('error', err)
        } )   
    }

    const logout = async () => {
        fetch("/api/auth/logout", {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            })
            .then((res) => res.json())
            .then(() => {
                setIsAuth(false);
                return <Navigate to='/' />
            }).catch((err) => {
                setIsAuth(false);
                console.log('error', err)
            } )
        }

    return <AuthContext.Provider value={{ isAuth, setIsAuth, checkAuth, logout }}>{children}</AuthContext.Provider>;
};

export {AuthContext, AuthProvider}