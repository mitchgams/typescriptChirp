import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export interface IChirps {
    nextid: number,
    id: string,
    user: string,
    text: string;
}

interface ChirpsProps {} 

const Chirps: React.FC<ChirpsProps> = props => {

    const [chirps, setChirps] = useState<IChirps[]>([]);

    const getChirps = async() => {
        let r = await fetch('/chirps');
        let data = await r.json();
        let chirps = Object.keys(data).map(key => {
            return {
                id: key,
                ...data[key]
            }
        });
        chirps.pop();
        /*************
         * used reverse() because i wanted the new
         * posts to be on top.
         */
        chirps.reverse();
        setChirps(chirps);
    }
    
    useEffect(() => { getChirps(); }, []);

    return (
        <>
            {chirps?.map(chirp => {
            return (
                <article key={chirp.id} className="card m-2 p-0 shadow-sm">
                    <h5 className="card-title m-1">{chirp.user}</h5>
                    <p className="card-body m-0">{chirp.text}</p>
                    <div className="card-footer m-0 p-0 d-flex justify-content-end"><Link to={`/${chirp.id}/admin`}>[edit]</Link></div>
                </article>
            );
        })}
        </>
    )
}

export default Chirps;