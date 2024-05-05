import stil from '../App.module.css';
import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import userContext from '../components/kontekst';


function Volonteri (){
    const [sviVolonteri, setSve] = useState([]);
    const [volonteri, setVolonteri] = useState([]);
    const user = useContext(userContext);
    const [gradovi, setGradovi] = useState([]);
    const [poslovi, setPoslovi] = useState([]);
    const [filter, setFilter] = useState('gradovi');
    const [odabir, setOdabir] = useState('');
    const [formaPodaci, postaviPodatke] = useState({
        ime: "",
        grad: "",
        posao: "",
        kontakt: ""
    })

    useEffect(()=>{
        dohvatiVolontere();
        axios.get('http://localhost:3001/gradovi')
            .then(rez=>{setGradovi(rez.data)})
            .catch(err=>console.log(err));
        axios.get('http://localhost:3001/poslovi')
            .then(rez=>setPoslovi(rez.data))
            .catch(err=>console.log(err));
    }, [])
    

    function dohvatiVolontere(){
        axios.get('http://localhost:3001/volonteri')
            .then(rez =>{
                setSve(rez.data)
                setVolonteri(rez.data);
            })
            .catch(err => console.log(err));
    }

    function filtriranje(){
        const noviVolonteri = volonteri.filter(el => el[filter] == odabir);
        setVolonteri(noviVolonteri);
    }

    function promjenaUlaza(event){
        const {name, value} = event.target;
        postaviPodatke({...formaPodaci, [name]: value});
    }

    function saljiPodatke(){
        axios.post('http://localhost:3001/volonteri', formaPodaci)
            .then(()=>{
                console.log('post succesful');
                dohvatiVolontere();
            });
    }

    function brisiVolontera(id){
        axios.delete(`http://localhost:3001/volonteri/${id}`)
            .then(()=>{
                console.log('delete succesful');
                dohvatiVolontere();
            });
    }

    return(
        <div className={stil.main}>
            <div className={stil.naslov}>Volonteri</div>
            <div className={stil.section}>
                <div className={stil.podnaslov}>Filtriraj:</div>
                <div className={stil.filtar}>
                <div className={stil.opcije}>
                    <label>
                        <input
                            type='radio'
                            value='grad'
                            checked={filter==='grad'}
                            onChange={()=>setFilter('grad')} />
                        Gradovi
                    </label>
                    <label>
                        <input
                            type='radio'
                            value='posao'
                            checked={filter==='posao'}
                            onChange={()=>setFilter('posao')} />
                        Poslovi
                    </label>
                </div>
                <div className={stil.opcije}>
                    {(filter==='grad')&&
                        <label>
                            Odaberite Grad: 
                            <select
                            name='ime'
                            value={odabir}
                            onChange={(e)=>{setOdabir(e.target.value)}}
                            required
                            >
                            <option value=''>--Odaberi grad--</option>
                            {gradovi.map(grad => (
                                <option key={grad.id} value={grad.ime}>
                                {grad.ime}
                                </option>
                            ))}
                            </select>
                        </label>
                    }
                    {(filter==='posao')&&
                        <label>
                            Odaberite vrstu posla: 
                            <select
                            name='posao'
                            value={odabir}
                            onChange={(e)=>{setOdabir(e.target.value)}}
                            required
                            >
                            <option value=''>--Odaberi posao--</option>
                            {poslovi.map(posao => (
                                <option key={posao.id} value={posao.posao}>
                                {posao.posao}
                                </option>
                            ))}
                            </select>
                        </label>
                    }
                </div>
                <div className={stil.opcije}>
                    <button onClick={()=>{filtriranje();}}>Filtriraj</button>
                    <button onClick={()=>{setVolonteri(sviVolonteri)}}>Prikaži sve</button>
                </div>
                </div>
            </div>
            <div className={stil.aktivnosti}>
                {
                    volonteri.map((volonter)=>{
                        return(
                            <div className={stil.volonter} key={volonter.id}>
                                <div className={stil.ime}>{volonter.ime}</div>
                                <div>Grad: {volonter.grad}</div>
                                <div>Posao: {volonter.posao}</div>
                                <Link to={`/volonteri/${volonter.id}`} state={volonter}>Detalji</Link>
                                {(user === 'admin') &&
                                <button onClick={()=>brisiVolontera(volonter.id)} className={stil.delete}>Delete</button>
                                }
                            </div>
                        )
                    })
                }
            </div>
            {(user === 'admin')&&
            <div className={stil.section}>
                <div className={stil.podnaslov}>Unos novog volontera:</div>
                <form onSubmit={saljiPodatke} className={stil.forma}>
                    <div>
                        <label>
                            Ime:
                            <input
                            type='text'
                            name='ime'
                            value={formaPodaci.ime}
                            onChange={promjenaUlaza}
                            required
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Odaberite Grad: 
                            <select
                            name='grad'
                            value={formaPodaci.grad}
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
                        </label>
                    </div>
                    <div>
                        <label>
                            Odaberite vrstu posla: 
                            <select
                            name='posao'
                            value={formaPodaci.posao}
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
                        </label>
                    </div>
                    <div>
                        <label>
                            Kontakt:
                            <input
                            type='text'
                            name='kontakt'
                            value={formaPodaci.kontakt}
                            onChange={promjenaUlaza}
                            required
                            />
                        </label>
                    </div>
                    <button type='submit'>Dodaj Volontera</button>
                </form>
            </div>
            }
        </div>
    );
}

export default Volonteri