import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";
import { Modal, MantineProvider} from "@mantine/core"; 
import {  } from '@mantine/core';

export default function EditModal({ modalOpened, setModalOpened, name, phone, id , handleEdit}) {
    const { user } = useContext(AuthContext);
    const { toast } = useContext(ToastContext);
    const [userDetails, setUserDetails] = useState({ name: name, phone: phone });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await fetch(`http://localhost:8000/api/contact`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` }, body: JSON.stringify({ id, ...userDetails }),
        });
        const result = await res.json();
        if (!result.error) {
            toast.success(`updated contact`);
            handleEdit(userDetails.name, userDetails.phone);
            setUserDetails({ name: "", phone: "" });
            setModalOpened(false);
        } else toast.error(result.error);
    };

    return (
        <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
        <Modal overlayOpacity={0.55} overlayBlur={3} size="50%" opened={modalOpened} onClose={() => setModalOpened(false)} centered>
            <h1 className="px-auto pb-16  justify-center flex items-center text-xl font-medium "> EDIT CONTACT </h1>
            
            <div className="  my-2 mx-auto   border-[2px]  w-1/2 justify-center flex items-center rounded-md shadow-md">
                <div>
                    <div className="flex items-center bg-gray-100 rounded-l-md border border-white justify-center w-12 h-12 ">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 scale-150 " viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
                    </div>
                </div>
                <div className="  w-full">
                    <input type="text" name="name" value={userDetails.name} onChange={handleInputChange} className="w-full h-12 px-4 py-1 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none bg-white" placeholder="Name" />
                </div>
            </div>

            <div className="my-2 mx-auto border-[2px] w-1/2 justify-center flex items-center rounded-md shadow-md" >
                <div>
                    <div className="flex items-center bg-gray-100 rounded-l-md border border-white justify-center w-12 h-12 text-white ">
                        <svg  className="h-5 w-5 text-blue-500 scale-150" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                    </div>
                </div>
                <div className="  w-full">
                    <input type="tel" name="phone" value={userDetails.phone} onChange={handleInputChange} className="w-full h-12 px-4 py-1 rounded-r-md border border-gray-100 text-gray-800 focus:outline-none bg-white" placeholder="Phone" />
                </div>
            </div>

            <div className="pt-10 px-auto justify-center flex items-center pb-10" >
                <button class="w-1/2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={ handleSubmit}> Save Changes </button>
            </div>
        </Modal>
        </MantineProvider>
    )
}
