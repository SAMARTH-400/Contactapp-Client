import { useEffect, useState, useContext , useCallback } from "react";
import Spinner from "../components/Spinner";
import Contact from "../components/Contact";
import CreateModal from "../components/CreateModal";
import ToastContext from "../context/ToastContext";


export default function Contacts(){
    const { toast } = useContext(ToastContext);
    const [loading, setLoading] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [selected, setSelected] = useState([]);
    const [modalOpened, setModalOpened] = useState(false);
    useEffect(() => {
        getContacts();
    },[modalOpened]);
    
    const getContacts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/mycontacts`, {
                method: "GET",
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
            });
            const result = await res.json();
            if (!result.error) {
                setContacts(result.contacts);
                setLoading(false);
            } else {
                console.log(result);
                setLoading(false);
            }
        } catch(err) {console.log(err);}
    }

    const handleDelete = useCallback( id => {     
        setContacts(prev => prev.filter(c => c._id !== id));
    }, []);
    const handleDeleteMany = async() =>{
        if (window.confirm("are you sure you want to delete these contact ?")) {
            try{
                const deleteData = {
                    list: [...selected]
                };
                console.log(JSON.stringify(deleteData));
                const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/deletemany`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify(deleteData)
                });
                if(!res.error){
                    const filtered = contacts.filter((item) => !selected.includes(item._id));
                    setContacts(filtered);
                    setSelected([]);
                    toast.success("Deleted contact");
                }
            }catch(err) {console.log(err)};

        }
    }
    const handleSelect = ((id, checked) => {
        if(checked)selected.push(id);
        else{
            const i = selected.indexOf(id);
            selected.splice(i, 1);
        }
        setSelected(selected);
        console.log(selected);
    })  
    
    return(
        <div className="w-1/3 flex mx-auto mt-20 scale-110">
            <div className="w-full">
                <div className="grid grid-cols-10">
                    <h className="col-span-3 text-center py-2 bg-blue-500 text-orange-100 border-blue-400 border-r  ">Name</h>
                    <h className="col-span-4  text-center px-1 py-2 bg-blue-500 text-blue-100 border-blue-400 border-r">Phone</h>
                    <h className=" text-center col-span-3 px-1 py-2 bg-blue-500 text-blue-100">Action</h>
                </div>
                <div className="col-span-10 h-6 bg-slate-600 "></div>
                <div>
                    {loading ? ( <Spinner splash="Loading Contacts..." />) : (<>
                        {(contacts.length <= 0) ? <div className="bg-gray-300"> <h1 className="text-center text-base px-1 py-2 text-gray-500 ">No Contacts Found</h1> </div> : ''}
                        {contacts.map((c) => {
                            return ( <Contact key={c._id} name={c.name} phone={c.phone} id={c._id} handleDelete={handleDelete} handleSelect={handleSelect}/> );
                        })}
                    </>)} 
                </div>
                <div className="col-span-10 h-6 bg-slate-600"></div>
            </div>
            <div className="text-5xl font-lightt bg-blue-500 rounded-full absolute w-14 h-14 cursor-pointer text-center -bottom-8 -right-8 z-10" onClick={()=>setModalOpened(true)}>
            +
            </div>
            <button className="bg-red-500 absolute top-60 p-2 rounded" onClick={handleDeleteMany}>DELETE SELECTED</button>

            <CreateModal  modalOpened={modalOpened} setModalOpened={setModalOpened} />
        </div>
    )
}
