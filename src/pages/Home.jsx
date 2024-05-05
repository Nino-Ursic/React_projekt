import stil from '../App.module.css'

function Home (){
    return(
        <div className={stil.main}>
            <div className={stil.naslov}>Početna</div>
            <div className={stil.section}>
                <div className={stil.podnaslov}>Opis</div>
                <div>Ova stranica služi za lakšu organizaciju volonterskih akcija. Olakšava postupak i korisnicima i organizatorima. Omogućena je jednostavna prijava i pregled prijavljenih. Mogu se prijavljivati nove akcije te zahtjevi za dodavanje udruge na stranicu.</div>
            </div>
            <div className={stil.section}>
                <div className={stil.podnaslov}>Autor</div>
                <div>Ime: Nino Ursić</div>
                <div>Obrazovanje: pohađam preddiplomski studij računarstva</div>
            </div>
            <div className={stil.section}>
                <div className={stil.podnaslov}>Kontakt</div>
                <div>Email: <a href='mailto:ninoursic12@gmail.com'>ninoursic12@gmail.com</a></div>
                <div>Instagram: <a href='https://www.instagram.com/ninoursic/'>ninoursic</a></div>
                <div></div>
            </div>
        </div>
    );
}

export default Home