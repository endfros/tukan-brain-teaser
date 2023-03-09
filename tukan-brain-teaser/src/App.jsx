import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Options } from "./components/Options";
import { DataContainer } from "./components/DataContainer";

function App() {
  const [values, setValues] = useState([]);
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [dateFormat, setDateFormat] = useState("DMY");
  const [decimals, setDecimals] = useState(4);
  const [display, setDisplay] = useState("bar");
  const [date, setDate] = useState(["1999-10-29", "2022-10-29"]);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState(true);
  const [variable, setVariable] = useState([]);
  const [bar, setBar] = useState(true);
  const [item, setItem] = useState();
  const [chart, setChart] = useState(false);
  const [blockPickerColor, setBlockPickerColor] = useState("#0f0ccb");
  const [openPicker, setOpenPicker] = useState(false);
  const [english, setEnglish] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://5i8qcjp333.execute-api.us-east-1.amazonaws.com/dev/series/?page=2&pageSize=50",
        {
          headers: {
            Authorization:
              "01f04831044f073702d9244604d41c055e7c14bb96218e169926482fb5699788",
          },
        }
      )
      .then((res) => {
        setValues(res.data.data);
        setLoading(false);
        JSON.parse(localStorage.getItem("variables"))
          ? setVariable(JSON.parse(localStorage.getItem("variables")))
          : setVariable([]);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <div className="p-0 bg-electric-violet-100 h-screen">
      <h1 className="text-2xl font-bold text-electric-violet-900 text-center p-4">
        Banxico Data Grapher
      </h1>
      <div className="grid grid-cols-12 m-0 p-0 h-5/6">
        <Options
          list={list}
          setList={setList}
          title={title}
          setTitle={setTitle}
          english={english}
          setEnglish={setEnglish}
          chart={chart}
          setChart={setChart}
          display={display}
          setDisplay={setDisplay}
          date={date}
          bar={bar}
          setBar={setBar}
          openPicker={openPicker}
          setOpenPicker={setOpenPicker}
          blockPickerColor={blockPickerColor}
          setBlockPickerColor={setBlockPickerColor}
          decimals={decimals}
          setDecimals={setDecimals}
          dateFormat={dateFormat}
          setDateFormat={setDateFormat}
          values={values}
          setValues={setValues}
          variable={variable}
          setVariable={setVariable}
        />

        <div
          className={`col-span-12 content-start rounded m-2 overflow-auto ${
            list ? "flex flex-col" : "hidden"
          } bg-electric-violet-300`}
        >
          <button
            onClick={(e) => {
              setList(!list);
            }}
            className="rounded-full self-center text-2xl px-4 py-2 m-4 text-electric-violet-50 text-center bg-electric-violet-900"
          >
            Add element
          </button>

          <DataContainer
            variable={variable}
            setVariable={setVariable}
            edit={edit}
            setEdit={setEdit}
            item={item}
            setItem={setItem}
            date={date}
            bar={bar}
            setBar={setBar}
            openPicker={openPicker}
            setOpenPicker={setOpenPicker}
            blockPickerColor={blockPickerColor}
            setBlockPickerColor={setBlockPickerColor}
            display={display}
            setDisplay={setDisplay}
          />
        </div>
      </div>

      <footer className="flex justify-center self-center p-4 text-center ">
        <p>Hecho con ❤️ por Rodrigo Montoya. Arequipa 2023.</p>
      </footer>
    </div>
  );
}

export default App;
