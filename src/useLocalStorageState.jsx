import React, {useState, useEffect} from 'react'

function useLocalStorageState(initialState, keyName) {
    // The keyname is how the data will be named and saved in localStorage 
  
    const [value, setValue] = useState(function () {
        const storedValue = localStorage.getItem(keyName);
        return storedValue ? JSON.parse(storedValue) : initialState; 
  });

    useEffect(
    function () {
      localStorage.setItem(keyName, JSON.stringify(value));
    }
  ,[value, keyName]);

  return [value, setValue];
}

export default useLocalStorageState

