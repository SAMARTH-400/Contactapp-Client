import styles from '@/styles/Home.module.css';
import Header from '../components/Header';
import Contacts from '../components/Contacts';

export default function Home(){
    return(
        <div className="bg-gray-800 h-screen" >
            <Header/>
            <Contacts/>
        </div>
    )
};