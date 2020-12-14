import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Add: React.FC = () => {

    const [user, setUser] = useState<string>('');
    const [text, setText] = useState<string>('');
    const history = useHistory();

    const handlePost = async() => {
        if(user === "" || text === "") {
            alert('please enter stuffs');
        } else {
            const r: Response = await fetch(`/chirps/`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({user: user, text: text})
            });
        history.push('/');
        }
    }
   

    return (
        <>
            <section className="card m-2 shadow-sm">
                <h5 className="card-title m-1">Edit Chirp</h5>
                <div className="card-body m-0">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="">Username: </span>
                        </div>
                        <input type="text" className="form-control" placeholder="Username" 
                        onChange={(event) => { setUser(event.target.value) }}
                        />
                    </div>
                    <div className="input-group mt-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Content: </span>
                        </div>
                        <textarea className="form-control" aria-label="With textarea" placeholder="What's up?"
                        onChange={(event) => { setText(event.target.value); }}
                        />
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col d-flex justify-content-end">
                            <button onClick={() => { handlePost(); }} className="btn btn-secondary" id="delete-chirp">Save Chirp</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Add;