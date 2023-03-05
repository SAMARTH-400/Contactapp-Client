import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from 'next/router'
import "react-toastify/dist/ReactToastify.css";
import ToastContext from "./ToastContext"


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const router = useRouter()
    const { toast } = useContext(ToastContext);
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        checkUserLoggedIn();
    }, []);
    // Check if user is logged in
    const checkUserLoggedIn = async () => {
        try{
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/me`, {
                method: "GET",
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            const result = await res.json();
            if(result.error) router.replace("/login")
            else{
                if ( location.pathname === "/login" || location.pathname === "/register"){
                    setTimeout(() => {
                        router.replace("/")
                    }, 500);
                }
                setUser(result);
            } 
        } catch (err) {console.log(err);}
    };
    // login request.
    const loginUser = async (userData) => {
        try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...userData }),
        });
        const result = await res.json();
            if(!result.error) {
                localStorage.setItem("token", result.token);
                toast.success("Login Successful");
                setUser(result.user);
                router.replace("/");
            } 
        else toast.error(result.error);
        }catch(err){console.log(err)}
    }
    // register request.
    const registerUser = async (userData) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...userData }),
            });
            const result = await res.json();
            if (!result.error) {
                toast.success("user registered successfully! login into your account!");
                router.replace("/login")
            } 
            else toast.error(result.error);
        } catch(err) {console.log(err)};
    }
    // return provider
    return <AuthContext.Provider value={{ loginUser, registerUser, user, setUser }}> {children} </AuthContext.Provider>
};
export default AuthContext;