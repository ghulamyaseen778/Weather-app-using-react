import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [InputVal, SetInputVal] = useState("")
  const [ApiResponse, SetapiResponse] = useState("")
  const [Err, SetErr] = useState(false)
  const [ApiCalling, SetApiCalling] = useState(false)

  useEffect(
    () =>  {
     axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${InputVal?InputVal:"karachi"}&appid=7891670d3515f398c98507fab7f0831f&units=metric`)
       .then((res) => {
          SetapiResponse(res.data)
          // console.log("response",res.data)
          SetInputVal('')
        })
        .catch((err) => {
          console.log(err)
          SetErr(true)
        })
      },
      [ApiCalling]
      )
      
      const ShowResult = () =>{
        if (!InputVal) {
          console.log("please Enter city Name")
          SetInputVal("")
          return
        }
        SetApiCalling(!ApiCalling)
        // console.log(InputVal)
      }
      return (
        <>
      <section className="con">
        <div className="div-t">
          <h1 className='heading'>Weather App</h1>
          <input type="text" placeholder='Enter City Name......' value={InputVal} className='search' onChange={(e) => { SetInputVal(e.target.value) }} />
          <button className='btn' onClick={ShowResult}>search</button>
        </div>
        {
          Err === true ? <p>error occured</p>:
          (<>
          <div className="div-b">
          <ul className="Container">
            <li className='Weather'>{ApiResponse!=""?ApiResponse.weather[0].description:"Clouds"}</li>
            <li className='City'>{ApiResponse!=""?ApiResponse.name:"karachi"}<sub className='Short'>{ApiResponse!=""?ApiResponse.sys.country:"pk"}</sub></li>
            <li className='Temp'>{ApiResponse!=""?ApiResponse.main.temp+"°":"00°"}</li>
            {/* <li>Broken Cloud</li>
            <li>Karachi<sub>PK</sub></li>
            <li>29.9</li> */}
          </ul>
        </div></>)
        }
      </section>
    </>
  );
}

export default App;
