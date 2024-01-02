import React from 'react';

const OtherDataUser = ({address, changeAddressDataHandler}) => {
    return (
        <div className={"other-data-div"}>
            Street: <input type={"text"} value={address.street}
                           onChange={(e) => changeAddressDataHandler({...address, street: e.target.value})}/>
            <br/>
            City: <input type={"text"} value={address.city}
                         onChange={(e) => changeAddressDataHandler({...address, city: e.target.value})}/>
            <br/>
            ZipCode: <input type={"text"} value={address.zipcode}
                            onChange={(e) => changeAddressDataHandler({...address, zipcode: e.target.value})}/>
        </div>
    );
};
export default OtherDataUser;
