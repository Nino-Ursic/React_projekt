import stil from '../App.module.css'

function Home (){
    return(
        <div className={stil.main}>
            <div className={stil.naslov}>Početna</div>
            <div className={stil.section}>
                <div className={stil.podnaslov}>Opis</div>
                <div>Ova stranica služi za lakšu organizaciju volonterskih akcija. Olakšava postupak i korisnicima i organizatorima. Omogućena je jednostavna prijava i pregled prijavljenih</div>
            </div>
            <div className={stil.section}>
                <div className={stil.podnaslov}>Autor</div>
                <div>Nino Ursić druga godina preddiplomskog studija računarstva. Pohađa JuniorDEV tečaj za React.</div>
            </div>
            <div className={stil.section}>
                <div className={stil.podnaslov}>Kontakt</div>
                <div>e-mail:</div>
                <div>Instagram: </div>
                <div></div>
            </div>
        </div>
    );
}

export default Home