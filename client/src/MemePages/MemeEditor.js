import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import '../MemePages/MemeEditor.css';

import { ProjectContext, ProjectProvider } from "../Global";
import { useContext } from "react/cjs/react.development";
   

function MemeEditor(props) {

  
const Fonts=["Brush Script MT",,"Courier New","Garamond","Times New Roman","Georgia","Tahoma","Trebuchet MS",
"Lucida Console","Verdana","Helvetica" ]
  const state = useContext(ProjectContext);
  const [isLogged] = state.useCheck.isLogged;
  const email = state.useCheck.email[0];
  const [detailMeme, setDetailMeme] = useState([])
  const [currentImagebase64, setcurrentImagebase64] = useState(null);
  const [currentImage, setcurrentImage] = useState(0);
  const imageRef = useRef(null);
  const svgRef = useRef(null);
  const [propsy,setpropsy] = useState(props);
  const [Fontcolor, SetFontcolor] = useState("#787878");
  const [Border, setBorder] = useState(0);
  const [Fontsize, setFontsize] = useState(20);
  const [Bordercolor, setBordercolor] = useState("#000000");
  const [topText, setTopText] = useState("");
  const [bottomText, setbottomText] = useState("");
  const [recty, setRecty] = useState(100);
  const [ptopX, setptopX] = useState("50%");
  const [FontStyle,setFontStyle] = useState("Impact")
  let ptopY = "10%";
  let pbottomX = "50%";
  let pbottomY = "90%";
  const textStyle = {
    fontFamily: FontStyle,
    fontSize: Fontsize,
    textTransform: "uppercase",
    fill: Fontcolor,
    stroke: Bordercolor,
    strokeWidth: Border,
    userSelect: "none",
  };
   
 
  const [Meme, setMeme] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/`)
      .then((response) => setMeme(response.data));
  }, []);


  const initialState = {
    top: "10%",
    bottom: "50%",
    left: 0,
  };


  function TopTexter(e) {
    setTopText(e.target.value);
  }

    function BottomTexter(e) {
      setbottomText(e.target.value);
    }
    function Fontystyle(e) {
      setFontStyle(e.target.value);
    }


  useEffect(() => {
    if (props.match.params.filename) {
      Meme.forEach((meme) => {
        if (meme.filename === props.match.params.filename) {
          setDetailMeme(meme);
          const img = new Image();
          img.setAttribute("crossOrigin", "anonymous");
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL("image/png");
            setcurrentImagebase64(dataURL);
          };
          img.src = meme.metadata.url;
        }
      });
    }

  }, [props.match.params.filename, Meme]);


  /*Canvas Function */

  function FontColor(e) {
    SetFontcolor(e.target.value);
  }
  function BorderColor(e) {
    setBordercolor(e.target.value);
  }
  function Bordersize(e) {
    setBorder(e.target.value);
  }
  function Fontsizer(e) {
    setFontsize(e.target.value);
    props.FontsizeFunc(Fontsize);
  }
  function FontDecrement() {
    if(Fontsize >=1){
    setFontsize((prevstate) =>prevstate - 1)}
  }
  function FontIncrement() {
    setFontsize((prevstate) => prevstate + 1);
  }
  function BorderDecrement() {
    if(Border >=1){
    setBorder((prevstate) => prevstate - 1);}
  }
  function BorderIncrement() {
    setBorder((prevstate) => prevstate + 1);
  }
    function BorderChangy(e) 
    {
      setBorder(parseInt(e.target.value));
    }

        function FontChangy(e) {
          setFontsize(parseInt(e.target.value));
        }


 function svgtoImg()
 {
    const svg = document.getElementById("svg_ref");
    let svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    const svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width;
    canvas.height = svgSize.height;
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
    );
    img.onload = function () {
      canvas.getContext("2d").drawImage(img, 0, 0);
      const canvasdata = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.download = props.match.params.filename;
      a.href = canvasdata;
      document.body.appendChild(a);
      a.click();
    };
 }
 const newFilter = Meme.filter((image) => {
   return image.filename
     .toLowerCase()
     .includes(props.match.params.filename.toLowerCase());
 });


  return (
    <main>
      <div className="MemePanel">
        <div className="SvgPanel">
          <div className="MemeEditor">
            <svg
              id="svg_ref"
              width="800px"
              height="500px"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <image
                ref={imageRef}
                xlinkHref={currentImagebase64}
                width="800px"
                height="500px"
              />

              <Draggable
                bounds={{ top: 0, bottom: 400, left: -350, right: 300 }}
              >
                <text style={textStyle} x={ptopX} y={ptopY}>
                  {topText}
                </text>
              </Draggable>

              <Draggable
                bounds={{
                  top: -400,
                  left: -350,
                  right: 400,
                  bottom: 0,
                }}
              >
                <text
                  style={textStyle}
                  x={pbottomX}
                  y={pbottomY}
                  dominantBaseline="middle"
                  textAnchor="middle"
                >
                  {bottomText}
                </text>
              </Draggable>
            </svg>
            <div>
              <p>
                {newFilter.map((meme, id) => (
                  <p className="heading-tertiary">
                    {meme.metadata.body.originalname}
                  </p>
                ))}
              </p>
            </div>
            <button type="button" className="memeDownload" onClick={svgtoImg}>
              Download
            </button>
          </div>
          <div className="MemeFeatures">
            <div className="Features">
              <form className="Featureclass">
                <div>
                  <label for="toptext">Top Text</label>
                  <input
                    className="TopTextClass"
                    type="text"
                    name="toptext"
                    id="toptext"
                    placeholder="Add text to the top"
                    onChange={(e) => {
                      TopTexter(e);
                    }}
                  />
                </div>
                <div>
                  <label for="toptext">Bottom Text</label>
                  <input
                    className="TopTextClass"
                    type="text"
                    name="toptext"
                    id="toptext"
                    placeholder="Add text to the top"
                    onChange={(e) => {
                      BottomTexter(e);
                    }}
                  />
                </div>
                <div className="FontStyler">
                  <div className="dropdown">
                    <button
                      className="btn FontStyleButton dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="true"
                    >
                      Font styles
                    </button>
                    <ul
                      className="dropdown-menu FontStyleul"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {Fonts.map((font, index) => (
                        <li>
                          <button
                            style={{ fontFamily: font }}
                            type="button"
                            className="dropdown-item"
                            value={font}
                            onClick={(e) => Fontystyle(e)}
                          >
                            {font}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="Coloring">
                  <div>
                    <label for="toptext">Font Color</label>
                    <input
                      type="color"
                      id="colorpicker"
                      value={Fontcolor}
                      onChange={(e) => FontColor(e)}
                    ></input>
                  </div>
                  <div>
                    <label for="toptext">Border color</label>
                    <input
                      type="color"
                      id="colorpicker"
                      value={Bordercolor}
                      onChange={(e) => BorderColor(e)}
                    ></input>
                  </div>
                </div>
                <div className="Size">
                  <div className="sizer">
                    <label for="toptext">Border Size</label>
                    <div className="minsizer">
                      <input
                        className="Sizeinputs"
                        type="number"
                        id="BorderSize"
                        value={Border}
                        onChange={BorderChangy}
                      ></input>
                      <div className="updownbuttom">
                        <button
                          type="button"
                          className="sizemanage sizeup"
                          onClick={BorderIncrement}
                        >
                          +1
                        </button>
                        <button
                          type="button"
                          className="sizemanage sizedown"
                          onClick={BorderDecrement}
                        >
                          -1
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="sizer">
                    <label for="toptext">Font Size</label>
                    <div className="minsizer">
                      <input
                        className="Sizeinputs"
                        type="number"
                        id="BorderSize"
                        value={Fontsize}
                        onChange={FontChangy}
                      ></input>
                      <div className="updownbuttom">
                        <button
                          type="button"
                          className="sizemanage sizeup"
                          onClick={FontIncrement}
                        >
                          +1
                        </button>
                        <button
                          type="button"
                          className="sizemanage sizedown"
                          onClick={FontDecrement}
                        >
                          -1
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MemeEditor;
