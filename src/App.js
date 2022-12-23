import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { CustomText,CustomButton,CustomRadio,CustomAutoComplete } from './template';
import Popup from './popup';

function App() {

  const [open,setOpen] = useState(false)


  return (
    <div className="App">
      <header className="App-header">
        <h3>Click Here!!!</h3>
        <CustomButton label={'Save Segments'} onClick={()=>setOpen((preState) => !preState)} variant={'contained'} />
        <Popup open={open} handleClose={()=>setOpen((preState) => !preState)} />
       </header>
    </div>
  );
}

export default App;
