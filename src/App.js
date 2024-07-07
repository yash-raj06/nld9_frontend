import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [sdks, setSdks] = useState([]);
  const [newSdk, setNewSdk] = useState(
    { 
      name: '', 
      language: '', 
      code: '', 
      description: '' 
    }
  );

  useEffect(() => {
    fetchSdks();
  }, []);
  const fetchSdks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/sdks');
      setSdks(response.data);
    } catch (error) {
      console.log('Error fetching SDKs:', error);
    }
  };
  const handleChange = (e) => {
    setNewSdk({ ...newSdk, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/sdks', newSdk);
      fetchSdks();
      setNewSdk({ name: '', language: '', code: '', description: '' });
    } catch (error) {
      console.error('Error adding SDK:', error);
    }
  };

  const searchSDK = async() =>{
    var sdkname = document.getElementById('sdkname');
    console.log(sdkname);
    try{
      console.log("Inside searchSDK");
      const response = await axios.post('http://localhost:5000/api/search', {
        name: sdkname
      });
      console.log('--------------------');
      console.log(response.data);
      console.log('--------------------');
      /* setNewSdk(response.data);
      setSdks[0]=newSdk; */
    } catch (error) {
      console.log('Error fetching SDKs:', error);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Developer Tools and SDKs</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="SDK Name" value={newSdk.name} onChange={handleChange} required />
          <input type="text" name="language" placeholder="Language" value={newSdk.language} onChange={handleChange} required />
          <textarea name="code" placeholder="Code" value={newSdk.code} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={newSdk.description} onChange={handleChange} required />
          <button type="submit">Add SDK</button>
        </form>
        <form onSubmit={searchSDK}>
          <input type="text" id='sdkname' name="name" placeholder="Search SDK" required />
          <button type="submit">Add SDK</button>
        </form>
        <h2>Available SDKs</h2>
        <ul>
          {sdks.map((sdk, index) => (
            <li key={sdk._id}>
              <h3>{index+1} - {sdk.name}</h3>
              <p>Language: {sdk.language}</p>
              <pre>Code: {sdk.code}</pre>
              <p>Description: {sdk.description}</p>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
