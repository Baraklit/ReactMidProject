import React, {useState} from 'react';

const NewUser = ({userId, onCancelHandler, addNewUser}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')


    const cancelHandler = () => {
        onCancelHandler(false)
    }

    const createNewUser = () => {
        if (name.length > 0 && email.length > 0) {
            const newUser = {
                "id": userId + 1,
                "name": name,
                "username": "",
                "email": email,
                "address": {
                    "street": "",
                    "suite": "",
                    "city": "",
                    "zipcode": "",
                    "geo": {
                        "lat": "",
                        "lng": ""
                    }
                },
                "phone": "",
                "website": "",
                "company": {
                    "name": "",
                    "catchPhrase": "",
                    "bs": ""
                },
                "todos": [],
                "posts": []
            }
            addNewUser(newUser)
        } else
            alert("Please Fill Name&Email")
    }

    return (
        <div>
            <label>Name: </label>
            <input type={"text"} onChange={(e) => setName(e.target.value)}/>
            <br/>
            <label>Email: </label>
            <input type={"email"} onChange={(e) => setEmail(e.target.value)}/>
            <br/>
            <div style={{
                display: "flex",
                margin: "10px 0 0 0",
                justifyContent: "flex-end"
            }}>
                <button onClick={createNewUser}>Add</button>
                <button onClick={cancelHandler}>Cancel</button>
            </div>
        </div>
    );
};

export default NewUser;
