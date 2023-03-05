import { useContext , useState} from "react";
import EditModal from "../components/EditModal";
import ToastContext from "../context/ToastContext";

export default function Contact({key, name, phone, id, handleDelete}) {
    const { toast } = useContext(ToastContext);
    const [modalOpened, setModalOpened] = useState(false); 
    const [userDetails, setUserDetails] = useState({ Username: name, Userphone: phone});

    const deleteContact = async() => {
        if (window.confirm("are you sure you want to delete this contact ?")) {
            try {
                const res = await fetch(`http://localhost:8000/api/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }});
                const result = await res.json();
                if(!result.error) {
                    toast.success("Deleted contact");
                    handleDelete(id);
                } else {
                    toast.error(result.error);
                }
            }catch(err) {console.log(err)};
        }
    };
    const handleEdit = (un , up) => {
        setUserDetails({Username: un, Userphone: up});
    }
    return (
        <div className="grid grid-cols-10 bg-slate-600">
            <div className="text-center  px-1 py-2 text-blue-100 col-span-3"> {userDetails.Username} </div>
            <div className=" px-1 py-2 text-gray-400 font-medium col-span-4 text-center"> {userDetails.Userphone} </div>
            <div className="text-center  px-1 py-2 text-orange-800 flex gap-5 justify-center  col-span-3 ">
                <button onClick={deleteContact} className="text-rose-500 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
                <button onClick={()=> setModalOpened(true)} className="text-cyan-500  " >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                </button>
            </div>
            <EditModal modalOpened ={modalOpened} setModalOpened={setModalOpened} name={userDetails.Username} phone={userDetails.Userphone} id={id}  handleEdit={handleEdit} />
        </div>
    );
};
