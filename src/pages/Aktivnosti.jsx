import stil from '../App.module.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import userContext from '../components/kontekst';
import { useContext } from 'react';

function Aktivnosti(){
    const [aktivnosti, setAktivnosti] = useState([]);
    const user = useContext(userContext);
    const [formaPodaci, postaviPodatke] = useState({
        imeAktivnosti: '',
        vrijeme: '',
        lokacija: '',
        opis: '',
        udruga: '',
        sudionici: []
    })

    useEffect(()=>{
        dohvatiAktivnosti();
    }, [])

    function dohvatiAktivnosti(){
        axios.get('http://localhost:3001/aktivnosti')
            .then(rez =>{setAktivnosti(rez.data)})
            .catch(err => console.log(err));
    }

    function saljiPodatke(){
        axios.post('http://localhost:3001/aktivnosti', formaPodaci)
            .then(rez => console.log(rez));
        dohvatiAktivnosti();
    }

    function promjenaUlaza(event){
        const {name, value} = event.target;
        postaviPodatke({...formaPodaci, [name]: value});
    }

    function brisiAktivnost(id){
        axios.delete(`http://localhost:3001/aktivnosti/${id}`)
            .then(()=>{
                console.log('delete succesful');
                dohvatiAktivnosti();
            });
    }

    return(
        <div className={stil.main}>
        <div className={stil.naslov}>Aktivnosti</div>
            <div className={stil.aktivnosti}>
                {
                aktivnosti.map(aktivnost =>{
                    return(
                        <div className={stil.aktivnost} key={aktivnost.id}>
                            <div className={stil.podnaslov}>{aktivnost.imeAktivnosti}</div>
                            <div>Vrijeme održavanja: {aktivnost.vrijeme}</div>
                            <Link to={`/aktivnosti/${aktivnost.id}`} state={aktivnost} >Detalji</Link>
                            {(user === 'admin') &&
                                <button onClick={()=>brisiAktivnost(aktivnost.id)} className={stil.delete}>Delete</button>
                            }
                        </div>
                    )
                })
                }
                <div className={stil.section}>
                    <div className={stil.podnaslov}>Dodaj aktivnost:</div>
                    <form onSubmit={saljiPodatke} className={stil.forma}>
                        <div>
                        <label>
                            Aktivnost:
                            <input
                            type='text'
                            name='imeAktivnosti'
                            value={formaPodaci.imeAktivnosti}
                            onChange={promjenaUlaza}
                            required
                            />
                        </label>
                        </div>
                        <div>
                        <label>
                            Vrijeme:
                            <input
                            type='text'
                            name='vrijeme'
                            value={formaPodaci.vrijeme}
                            onChange={promjenaUlaza}
                            required
                            />
                        </label>
                        </div>
                        <div>
                        <label>
                            Lokacija:
                            <input
                            type='text'
                            name='lokacija'
                            value={formaPodaci.lokacija}
                            onChange={promjenaUlaza}
                            required
                            />
                        </label>
                        </div>
                        <div>
                        <label>
                            Opis:
                            <input
                            type='text'
                            name='opis'
                            value={formaPodaci.opis}
                            onChange={promjenaUlaza}
                            required
                            />
                        </label>
                        </div>
                        <div>
                        <label>
                            Udruga:
                            <input
                            type='text'
                            name='udruga'
                            value={formaPodaci.udruga}
                            onChange={promjenaUlaza}
                            required
                            />
                        </label>
                        </div>

                        <button type='submit'>Dodaj Aktivnost</button>
                    </form>
                </div>
            </div> 
        </div>
    );
}

export default Aktivnosti