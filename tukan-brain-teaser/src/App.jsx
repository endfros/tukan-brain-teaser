import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SliderPicker } from "react-color";
import tukanLogo from "./assets/tukanLogo.png";
import exportAsImage from "./utils/exportAsImage";
import { AnimatePresence, motion } from "framer-motion";
import { useTable } from "react-table";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { Options } from "./components/Options";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table className="text-center" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr
            className="py-2 border-slate-800 border-b-2"
            {...headerGroup.getHeaderGroupProps()}
          >
            {headerGroup.headers.map((column) => (
              <th
                className="py-4 border-slate-800 border-b-2"
                {...column.getHeaderProps()}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              className="border-solid border-2 border-slate-100 border-t-slate-300 border-b-slate-300"
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                return (
                  <td className="py-3 border-none" {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function round(num, places) {
  return +(Math.round(num + "e+" + places) + "e-" + places);
}

function changeDateFormat(date, format) {
  const dateParts = date.split("/");
  if (format === "YMD") {
    return dateParts[2] + "/" + dateParts[1] + "/" + dateParts[0];
  } else if (format === "MDY") {
    return dateParts[1] + "/" + dateParts[0] + "/" + dateParts[2];
  } else {
    return date;
  }
}

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
  const exportRef = useRef();

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
        console.log(res.data.data);
        setValues(res.data.data);
        setLoading(false);
        JSON.parse(localStorage.getItem("variables"))
          ? setVariable(JSON.parse(localStorage.getItem("variables")))
          : setVariable([]);
        // setVariable(JSON.parse(localStorage.getItem("variables")))
      })
      .catch((err) => console.log(err));
  }, []);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(variable);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setVariable(items);
  }

  const handleDecimals = (value) => {
    if (value < 0) {
      setDecimals(0);
    } else if (value === null) {
      setDecimals(0);
    } else {
      setDecimals(Number(value));
    }
  };

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
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="mx-4 px-4 "
                >
                  {variable.map((element, index) => {
                    localStorage.setItem("variables", JSON.stringify(variable));
                    console.log(decimals);
                    return (
                      <div key={element.variable}>
                        <AnimatePresence>
                          {edit && (
                            <div>
                              <div
                                className="transition-opacity"
                                aria-hidden="true"
                              >
                                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                              </div>
                              <motion.div
                                className="flex justify-center static px-4 sm:p-0"
                                initial={{
                                  opacity: 0,
                                  scale: 1,
                                }}
                                animate={{
                                  opacity: 1,
                                  scale: 1,
                                  transition: {
                                    ease: "easeOut",
                                    duration: 0.5,
                                  },
                                }}
                                exit={{
                                  opacity: 0,
                                  scale: 1,
                                  transition: {
                                    ease: "easeIn",
                                    duration: 0.5,
                                  },
                                }}
                              >
                                <div
                                  className={`h-auto flex flex-col w-11/12 absolute z-10 md:left-1/4 top-20 md:w-3/6 bg-electric-violet-500 rounded-lg p-6 text-electric-violet-100 overflow-auto`}
                                >
                                  <p className="text-electric-violet-100 font-extrabold text-lg md:text-xl">
                                    Editing item: {item.variable}
                                  </p>
                                  <div className="flex justify-between items-center my-4">
                                    <p className="text-electric-violet-100 font-extrabold md:text-xl">
                                      Edit your title:
                                    </p>
                                    <input
                                      defaultValue={item.customTitle}
                                      onChange={(e) => {
                                        console.log(item.customTitle);
                                        item.customTitle = e.target.value;
                                      }}
                                      className="rounded px-4 py-2 text-electric-violet-900"
                                      type="text"
                                    />
                                  </div>
                                  {item.displayType === "chart" ? (
                                    <p></p>
                                  ) : (
                                    <div>
                                      <div className="flex flex-col lg:flex-row justify-between">
                                        <p className="text-electric-violet-100 font-extrabold md:text-xl">
                                          Edit the graph color:
                                        </p>
                                        <button
                                          className={`w-12 h-6 static border-solid self-center my-4 border-electric-violet-50 border-4`}
                                          onClick={(e) => {
                                            setOpenPicker(!openPicker);
                                          }}
                                          style={{
                                            backgroundColor: `${blockPickerColor}`,
                                          }}
                                        ></button>
                                        <div className="w-48 my-4 self-center">
                                          <SliderPicker
                                            color={blockPickerColor}
                                            onChange={(color) => {
                                              setBlockPickerColor(color.hex);
                                              item.graphColor =
                                                blockPickerColor;
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <div className="flex flex-col">
                                        <p className="text-electric-violet-100 font-extrabold md:text-xl">
                                          Edit how you want to visualize the
                                          data:
                                        </p>
                                        <section className="flex flex-row justify-center my-4">
                                          <button
                                            className={`${
                                              item.displayType &&
                                              item.displayType === "bar"
                                                ? `bg-electric-violet-900 transition}`
                                                : "transition"
                                            } p-4 rounded-xl`}
                                            onClick={(e) => {
                                              setBar(true);
                                              item.displayType = "bar";
                                            }}
                                          >
                                            Bar
                                          </button>
                                          <button
                                            className={`${
                                              item.displayType === "line"
                                                ? `bg-electric-violet-900 transition}`
                                                : "transition"
                                            } p-4 rounded-xl`}
                                            onClick={(e) => {
                                              setBar(false);
                                              item.displayType = "line";
                                            }}
                                          >
                                            Line
                                          </button>
                                        </section>
                                      </div>
                                    </div>
                                  )}

                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setEdit(!edit);
                                      setItem(null);
                                      setBar(true);
                                    }}
                                    className="rounded-full self-center text-2xl px-4 py-2 m-4 text-electric-violet-50 text-center bg-electric-violet-900"
                                  >
                                    Save changes
                                  </button>
                                </div>
                              </motion.div>
                            </div>
                          )}
                        </AnimatePresence>
                        <Draggable draggableId={element.variable} index={index}>
                          {(provided) => (
                            <div
                              className="bg-electric-violet-50 my-4 lg:mx-24 p-2 md:p-12 rounded-lg"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div ref={exportRef}>
                                <div className="flex justify-center md:justify-between  my-2 md:my-4">
                                  <img
                                    src={tukanLogo}
                                    className="hidden md:block md:h-12 lg:h-16"
                                    alt=""
                                  />
                                  <h1 className="font-bold capitalize">
                                    {element.customTitle}
                                  </h1>
                                  <div>
                                    <button
                                      onClick={(e) => {
                                        console.log(
                                          `Edita esta carta ${element.variable}`
                                        );
                                        setEdit(!edit);
                                        setItem(element);
                                      }}
                                      className="bg-electric-violet-900 self-end hover:bg-electric-violet-600 hover:transition-colors transition-colors text-electric-violet-100 px-4 py-2 mx-2 rounded-full"
                                    >
                                      Edit
                                    </button>

                                    <button
                                      onClick={(e) => {
                                        console.log(
                                          `Descarga esta carta ${element.variable}`
                                        );
                                        exportAsImage(
                                          exportRef.current,
                                          "test"
                                        );
                                      }}
                                      className="bg-electric-violet-900 self-end hover:bg-electric-violet-600 hover:transition-colors transition-colors text-electric-violet-100 px-4 py-2 mx-2 rounded-full"
                                    >
                                      Download
                                    </button>

                                    <button
                                      onClick={(e) => {
                                        console.log(
                                          `Elimina esta carta ${element.variable}`
                                        );
                                        const newList = variable.filter(
                                          (item) =>
                                            item.variable !== element.variable
                                        );
                                        console.log(newList);
                                        localStorage.setItem(
                                          "variables",
                                          JSON.stringify(newList)
                                        );
                                        setVariable(newList);
                                      }}
                                      className="bg-electric-violet-900 md:self-end hover:bg-red-800 hover:transition-colors transition-colors text-electric-violet-100 px-4 py-2 rounded-full"
                                    >
                                      x
                                    </button>
                                  </div>
                                </div>
                                {element.displayType === "bar" ? (
                                  <Bar
                                    options={{
                                      responsive: true,
                                      plugins: {
                                        legend: {
                                          position: "top",
                                        },
                                        title: {
                                          display: true,
                                          text: element.graphTitle[0].titulo,
                                        },
                                      },
                                    }}
                                    data={{
                                      labels: element.labels,
                                      datasets: [
                                        {
                                          label: element.variable,
                                          data: element.numbers,
                                          backgroundColor: element.graphColor,
                                        },
                                      ],
                                    }}
                                  />
                                ) : element.displayType === "line" ? (
                                  <Line
                                    options={{
                                      responsive: true,
                                      plugins: {
                                        legend: {
                                          position: "top",
                                        },
                                        title: {
                                          display: true,
                                          text: element.graphTitle[0].titulo,
                                        },
                                      },
                                    }}
                                    data={{
                                      labels: element.labels,
                                      datasets: [
                                        {
                                          label: element.variable,
                                          data: element.numbers,
                                          backgroundColor: element.graphColor,
                                        },
                                      ],
                                    }}
                                  />
                                ) : element.displayType === "chart" ? (
                                  <div>
                                    <div className="flex justify-center">
                                      <Table
                                        columns={[
                                          {
                                            Header:
                                              element.graphTitle[0].titulo,
                                            columns: [
                                              {
                                                Header: "Fecha",
                                                accessor: "fecha",
                                              },
                                              {
                                                Header: "Dato",
                                                accessor: "dato",
                                              },
                                            ],
                                          },
                                        ]}
                                        data={element.labels.map(function (
                                          value,
                                          index
                                        ) {
                                          return {
                                            fecha: value,
                                            dato: element.numbers[index],
                                          };
                                        })}
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <p></p>
                                )}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      </div>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>

      <footer className="flex justify-center self-center p-4 text-center ">
        <p>Hecho con ❤️ por Rodrigo Montoya. Arequipa 2023.</p>
      </footer>
    </div>
  );
}

export default App;
