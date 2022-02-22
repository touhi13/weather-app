import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Home: React.FC = () => {
    const [countryName, setCountryName] = useState<string>();
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.value);
        setCountryName(event.target.value);
    }
    const onSubmit = () => {
        console.log(countryName);
        navigate(`/country/${countryName}`);
    }
    return (
        <div>
            <h1>Welcome To Wether Application</h1>
            <div>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" value={countryName} onChange={handleInputChange} />
            </div>
            <Button variant="contained" onClick={onSubmit}>Contained</Button>
        </div>
    );
};

export default Home;

