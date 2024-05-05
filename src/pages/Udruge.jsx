import stil from '../App.module.css';
import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import userContext from '../components/kontekst';

function Udruge(){

    const [udruge, setUdruge] = useState([]);
    const [zahtjevi, setZahtjevi] = useState([]);
    const [gradovi, setGradovi] = useState([]);
    const [sortiranje, setSortiranje] = useState('');
    const user = useContext(userContext);
    const [formaPodaci, postaviPodatke] = useState({
        ime: '',
        adresa: '',
        grad: ''
    });

    useEffect(()=>{
        axios.get('http://localhost:3001/gradovi')
            .then(rez=>{setGradovi(rez.data)})
            .catch(err=>console.log(err));
        dohvatiUdruge();
        dohvatiZahtjeve();
    },[])

    function dohvatiUdruge(){
        axios.get('http://localhost:3001/udruge')
            .then(rez=>setUdruge(rez.data))
            .catch(err=>console.log(err));
    }
    function dohvatiZahtjeve(){
        axios.get('http://localhost:3001/udrugeZahtjevi')
            .then(rez=>setZahtjevi(rez.data))
            .catch(err=>console.log(err));
    }

    useEffect(() => {
        if (sortiranje === 'ime') {
          const sortedUdruge = [...udruge].sort((a, b) => {
            if (a.ime < b.ime) return -1;
            if (a.ime > b.ime) return 1;
            return 0;
          });
          setUdruge(sortedUdruge);
        } else if (sortiranje === 'grad') {
          const sortedUdruge = [...udruge].sort((a, b) => {
            if (a.grad < b.grad) return -1;
            if (a.grad > b.grad) return 1;
            return 0;
          });
          setUdruge(sortedUdruge);
        } else if (sortiranje === 'adresa') {
          const sortedUdruge = [...udruge].sort((a, b) => {
            if (a.adresa < b.adresa) return -1;
            if (a.adresa > b.adresa) return 1;
            return 0;
          });
          setUdruge(sortedUdruge);
        }
    }, [sortiranje]);

    function promjenaUlaza(event){
        const {name, value} = event.target;
        postaviPodatke({...formaPodaci, [name]: value});
    }

    function saljiPodatke(){
        alert('Zahtvjev poslan, udruga će biti dodana nakon odobrenja.');
        axios.post('http://localhost:3001/udrugeZahtjevi', formaPodaci)
            .then(()=>{
                console.log('post succesful');
            });
    }

    function brisiUdrugu(id){
        axios.delete(`http://localhost:3001/udruge/${id}`)
            .then(()=>dohvatiUdruge())
            .catch(err=>console.log(err));
    }

    function brisiZahtjev(id){
        axios.delete(`http://localhost:3001/udrugeZahtjevi/${id}`)
            .then(()=>dohvatiZahtjeve())
            .catch(err=>console.log(err));
    }

    function odobriZahtjev(zahtjev){
        brisiZahtjev(zahtjev.id);
        axios.post(`http://localhost:3001/udruge`, zahtjev)
            .then(()=>{
                console.log('Zahtjev odobren.');
                dohvatiUdruge();
        })
            .catch(err=>console.log(err));
    }

    return(
        <div className={stil.main}>
            <div className={stil.naslov}>Udruge</div>
            <div className={stil.section}>
                <div className={stil.podnaslov}>Sortiranje:</div>
                <div className={stil.opcije}>
                    <label>
                        <input
                            type='radio'
                            value='ime'
                            checked={sortiranje==='ime'}
                            onChange={()=>setSortiranje('ime')} />
                        Ime
                    </label>
                    <label>
                        <input
                            type='radio'
                            value='grad'
                            checked={sortiranje==='grad'}
                            onChange={()=>setSortiranje('grad')} />
                        Grad
                    </label>
                    <label>
                        <input
                            type='radio'
                            value='adresa'
                            checked={sortiranje==='adresa'}
                            onChange={()=>setSortiranje('adresa')} />
                        Adresa
                    </label>
                </div>
            </div>
            <div className={stil.aktivnosti}>
                {
                    udruge.map((udruga)=>{
                        return(
                            <div className={stil.volonter} key={udruga.id}>
                                <div className={stil.ime}>{udruga.ime}</div>
                                <div>Grad: {udruga.grad}</div>
                                <div>Adresa: {udruga.adresa}</div>
                                {(user === 'admin') &&
                                <button onClick={()=>brisiUdrugu(udruga.id)} className={stil.delete}>Delete</button>
                                }
                            </div>
                        )
                    })
                }
            </div>
            <hr />
            {(user==='admin')&&
            <div>
                <div className={stil.naslov}>Zahtjevi:</div>
                <div className={stil.aktivnosti}>
                {
                    zahtjevi.map((zahtjev)=>{
                        return(
                            <div className={stil.volonter} key={zahtjev.id}>
                                <div className={stil.ime}>{zahtjev.ime}</div>
                                <div>Grad: {zahtjev.grad}</div>
                                <div>Adresa: {zahtjev.adresa}</div>
                                {(user === 'admin') &&
                                <div className={stil.opcije}>
                                    <button onClick={()=>brisiZahtjev(zahtjev.id)} className={stil.delete}>Delete</button>
                                    <button onClick={()=>odobriZahtjev(zahtjev)} className={stil.aprove}>Odobri</button>
                                </div>
                                }
                            </div>
                        )
                    })
                }
                </div>
            </div>
            }
            <div className={stil.section}>
            <div className={stil.podnaslov}>Zahtjev za odobrenje:</div>
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
                    Adresa:                        
                    <input
                    type='text'
                    name='adresa'
                    value={formaPodaci.adresa}
                    onChange={promjenaUlaza}
                    required
                    />
                </label>
                </div>
                <div>
                <label>
                    Grad: 
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

                <button type='submit'>Pošalji zahtjev:</button>
            </form>
            </div>
        </div>
    );
}

export default Udruge