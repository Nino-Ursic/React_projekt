import stil from '../App.module.css';
import {useLocation, Link} from 'react-router-dom';
import userContext from '../components/kontekst';
import { useContext, useState } from 'react';
import axios from 'axios';

function Aktivnost(){
    let {state} = useLocation();
    const aktivnost = state;
    const [sudionici, setSudionici] = useState(aktivnost.sudionici);
    const user = useContext(userContext);
    const [name, setName] = useState('');

    function handlePrijava(){
        axios.patch(`http://localhost:3001/aktivnosti/${aktivnost.id}`, {
            sudionici : [...sudionici, name]
        }); 
        
        setSudionici([...sudionici, name]);
    }

    function brisiSudionika(sudionik){
        const newSudionici = sudionici.filter(el=>el!==sudionik);
        axios.patch(`http://localhost:3001/aktivnosti/${aktivnost.id}`, {
            sudionici : newSudionici
        }); 
        setSudionici(newSudionici);
    }

    return(
        <div className={stil.main}>
            <div className={stil.section}>
                <div className={stil.podnaslov}>Opis:</div>
                <div>{aktivnost.opis}</div>
            </div>
            <div className={stil.section}>
                <div className={stil.podnaslov}>Organizator:</div>
                <div>{aktivnost.udruga}</div>
            </div>
            <div className={stil.section}>
                <div className={stil.podnaslov}>Lokacija:</div>
                <div>{aktivnost.lokacija}</div>
            </div>
            <div className={stil.section}>
                <div className={stil.podnaslov}>Sudionici:</div>
                <div>{sudionici.map((sudionik)=>{
                    return(
                        <div className={stil.sudionik}>
                            {sudionik}
                            {(user==='admin')&&
                                <button onClick={()=>brisiSudionika(sudionik)} className={stil.delete}>Delete</button>
                            }
                        </div>
                    ); 
                })}</div>
            </div>
            <div className={stil.section}>
                    <div className={stil.podnaslov}>Prijavi se:</div>
                    <label>
                        Ime:
                        <input type='text' value={name} onChange={e=>setName(e.target.value)}/>
                    </label>
                    <button onClick={handlePrijava}>Prijavi</button>
            </div>
            <div className={stil.section}>
                <Link to='/aktivnosti' >Povratak na aktivnosti</Link>
            </div>
        </div>
    );
}

export default Aktivnost
