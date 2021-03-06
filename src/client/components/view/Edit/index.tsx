import * as React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface IUseParams {
    id: string;
} 



const Edit: React.FC = () => {
    const { id } = useParams<IUseParams>();
    const [chirpUser, setUser] = useState<string>('');
    const [chirpText, setText] = useState<string>('');
    const history = useHistory();

    useEffect(() => {
        (async() => {
            let r: Response = await fetch(`/chirps/${id}`);
            let data = await r.json();
            setUser(data.user);
            setText(data.text);
        })();
    }, []);

    const handleDelete = async() => {
        const r: Response = await fetch(`/chirps/delete/${id}`, {
            method: 'DELETE'
        })
        history.push('/');
    }

    const handleEdit = async() => {
        const r: Response = await fetch(`/chirps/edit/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: chirpUser, text: chirpText})
          })
        history.push('/');
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
                            <input type="text" className="form-control" value={chirpUser} 
                            onChange={(event) => { setUser(event.target.value) }}
                            />
                        </div>
                        <div className="input-group mt-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">Content: </span>
                            </div>
                            <textarea className="form-control" aria-label="With textarea" value={chirpText}
                            onChange={(event) => { setText(event.target.value); }}
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="row">
                            <div className="col d-flex justify-content-center">
                                <button onClick={() => { handleDelete(); }} className="btn btn-secondary" id="delete-chirp">Delete</button>
                            </div>
                            <div className="col d-flex justify-content-center">
                                <button onClick={() => { handleEdit(); }} className="btn btn-secondary" id="save-chirp">Save</button>
                            </div>
                        </div>
                    </div>
                </section>
            </>
    );
}

export default Edit; 