import stil from '../App.module.css';
import {useLocation, Link} from 'react-router-dom';
import userContext from '../components/kontekst';
import {useContext, useState, useEffect} from 'react';
import axios from 'axios';

function Volonter(){
    let {state} = useLocation();
    const [volonter, setVolonter] = useState(state);
    const user = useContext(userContext);
    const [uredivanje, setUredivanje] = useState(false);
    const [gradovi, setGradovi] = useState([]);
    const [poslovi, setPoslovi] = useState([]);
    const [komentari, setKomentari] = useState(volonter.komentari);
    const [komentar, setKomentar] = useState('');

    useEffect(()=>{
        axios.get('http://localhost:3001/gradovi')
            .then(rez=>{setGradovi(rez.data)})
            .catch(err=>console.log(err));
        axios.get('http://localhost:3001/poslovi')
            .then(rez=>setPoslovi(rez.data))
            .catch(err=>console.log(err));
    }, [])

    function spremanje(){
        setUredivanje(false);
        axios.put(`http://localhost:3001/volonteri/${volonter.id}`, volonter)
            .then(console.log('change succesful'))
            .catch(err=> console.log(err));
    }
    function promjenaUlaza(event){
        const {name, value} = event.target;
        setVolonter({...volonter, [name]: value});
    }

    function ostaviKomentar(){
        axios.patch(`http://localhost:3001/volonteri/${volonter.id}`, {
            komentari : [...komentari, komentar]
        }); 
        
        setKomentari([...komentari, komentar]);
    }

    function brisiKomentar(komentar){
        const newKomentari = komentari.filter(el=>el!==komentar);
        axios.patch(`http://localhost:3001/volonteri/${volonter.id}`, {
            komentari : newKomentari
        }); 
        setKomentari(newKomentari);
    }

    return(
        <div className={stil.main}>
            <div className={stil.section}>
                <div className={stil.podnaslov}>Ime:</div>
                {(!uredivanje)&&<div>{volonter.ime}</div>}
                {(uredivanje)&&
                        <input
                        type='text'
                        name='ime'
                        value={volonter.ime}
                        onChange={promjenaUlaza}
                        required/>
                }
            </div>
            <div className={stil.section}>
                <div className={stil.podnaslov}>Grad:</div>
                {(!uredivanje)&&<div>{volonter.grad}</div>}
                {(uredivanje)&&
                    <select
                    name='grad'
                    value={volonter.grad}
                    onChange={promjenaUlaza}
                    required
                    >
                    <option value=''>--Odaberi grad--</option>
                    {gradovi.map(grad => (
                        <option key={grad.id} value={grad.ime}>
                        {grad.ime}
                        </option>
                    ))}
                    </select>
                }
            </div>
            <div className={stil.section}>
                <div className={stil.podnaslov}>Posao:</div>
                {(!uredivanje)&&<div>{volonter.posao}</div>}
                {(uredivanje)&&
                    <select
                    name='posao'
                    value={volonter.posao}
                    onChange={promjenaUlaza}
                    required
                    >
                    <option value=''>--Odaberi posao--</option>
                    {poslovi.map(posao => (
                        <option key={posao.id} value={posao.posao}>
                        {posao.posao}
                        </option>
                    ))}
                    </select>
                }
            </div>
            <div className={stil.section}>
                <div className={stil.podnaslov}>Kontakt:</div>
                {(!uredivanje)&&<div>{volonter.kontakt}</div>}
                {(uredivanje)&&
                        <input
                        type='text'
                        name='ime'
                        value={volonter.kontakt}
                        onChange={promjenaUlaza}
                        required/>
                }
            </div>
            <div className={stil.section}>
                <div className={stil.podnaslov}>Komentari:</div>
                <div>{komentari.map((komentar)=>{
                    return(
                        <div className={stil.sudionik}>
                            {komentar}
                            {(user==='admin')&&
                                <button onClick={()=>brisiKomentar(komentar)} className={stil.delete}>Delete</button>
                            }
                        </div>
                    ); 
                })}</div>
                    <label>
                        Ostavi komentar: 
                        <input type='text' value={komentar} onChange={e=>setKomentar(e.target.value)}/>
                    </label>
                <button onClick={ostaviKomentar}>Spremi</button>
            </div>
            {(user==='admin')&&
                <div className={stil.section}>
                    {(!uredivanje)&&
                        <button onClick={()=>{setUredivanje(true)}}>Uredi</button>
                    }
                    {(uredivanje)&&
                        <button onClick={spremanje}>Spremi</button>
                    }
                </div>
            }
            <div className={stil.section}>
                <Link to='/volonteri' >Povratak na volontere</Link>
            </div>
        </div>
    );
}

export default Volonter