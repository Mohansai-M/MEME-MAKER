import { useEffect, useRef, useState } from "react";
import "../MemePages/MemeMaker.css"
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch, Routes, } from "react-router-dom";
import { MagnifyingGlass } from "phosphor-react";
import { IoClose } from "react-icons/io5";


function MemeMaker() {

  const filters =["Cat","Dog","Politics","Sad","Drake","Happy"]
  
  const [Meme, setMeme] = useState([]);
  const [SearchItem,setSearchItem] = useState("")
  const [FilterItem,setFilterItem]=useState("")
  const [filteredData,setfilteredData] = useState([])
  const [filterData, setfilterData] = useState("");
  const [bg,setBg]= useState("white");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/`)
      .then((response) => setMeme(response.data));
  }, []);


  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setSearchItem(searchWord);
    const newFilter = Meme.filter((image) => {
    
      return image.metadata.body.originalname.toLowerCase().includes(searchWord.toLowerCase());
    });
  if (searchWord === "") {
    setfilteredData([]);
  } else {
    setfilteredData(newFilter);
  }
console.log(filteredData)
}
const FilterRange =(e) =>
{
   if(e.target.checked)
  {
  setFilterItem(e.target.value)
   const newFilter = Meme.filter((image) => {
     return image.metadata.body.filetag
       .toLowerCase()
       .includes(FilterItem.toLowerCase());
   });
   if (FilterItem === "") {
     setfilterData(Meme);
   } else {
     setfilterData(newFilter);
   }
}}

  return (
    <main>
      <div className="container-filed MemeMaker">
        <div className="row">

          <div className="col MemeData">
            <div className="row">
              <div className="wrapper">
                <div className="search-input">
                  <input
                    type="text"
                    placeholder="Type to search.."
                    onChange={handleFilter}
                  />
                </div>
                <div className="ok">
                  <MagnifyingGlass
                    size={32}
                    className="SearchIcon"
                    weight="thin"
                  />
                </div>
                {filteredData.length != 0 && (
                  <div className="dataResult">
                    {filteredData.map((meme, key) => {
                      return <ul className="dataItem">
                      <li className="Imgs"><img src={meme.metadata.url} className="searImg"/>
                      <p className="Textimg">{meme.metadata.body.originalname}</p></li> 
                       </ul>;
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="row MainMeme">
              <div className="MemeCard">
                {Meme.map((meme, id) => (
                      <div className="MemeDetails">
                        <div className="imgdiv1">
                          <Link to={`/get/${meme.filename}`}>
                            <img className="imgdiv" src={meme.metadata.url} />
                          </Link>
                        </div>
                        <span className="MemeName">
                          {meme.metadata.body.originalname}
                        </span>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

    export default MemeMaker;
