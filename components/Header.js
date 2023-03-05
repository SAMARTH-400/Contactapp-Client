import {useContext} from 'react'
import { useRouter } from 'next/router';
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

export default function Header() {
    const router = useRouter();
    const { user , setUser } = useContext(AuthContext);
    const {toast} = useContext(ToastContext); 
    function logout(){
        setUser(null);
        localStorage.clear();
        toast.success("Logged out.");
        router.replace("/login");
    }
    return (
        <header>
            <nav className="px-4 lg:px-6 py-2.5 bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-2">
                    <div className="flex items-end ">
                        <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/phone-2043471-1741203.png?f=avif&w=256" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white pb-2 ml-1">CONTACTS</span>
                    </div>
                    <div className="flex items-center lg:order-2 gap-5">
                        <p>Welcome, <strong className='font-medium'> {user?.name} </strong></p>
                        <p class="text-white hover:bg-blue-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 bg-blue-600 focus:outline-none dark:focus:ring-gray-800" onClick={logout}>Logout </p>
                    </div>
                </div>
            </nav>
        </header>
    )
}