import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { SliderPicker } from "react-color";
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
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  return (
    <table className="text-center" {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                className="border-2 border-solid border-slate-700"
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
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    className="border-2 border-solid border-slate-700"
                    {...cell.getCellProps()}
                  >
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

function App() {
  const [values, setValues] = useState([]);
  const [title, setTitle] = useState("");
  const [allValues, setAllValues] = useState([]);
  const [display, setDisplay] = useState("bar");
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState(true);
  const [variable, setVariable] = useState([]);
  const [bar, setBar] = useState(true);
  const [chart, setChart] = useState(false);
  const [blockPickerColor, setBlockPickerColor] = useState("#48189a");
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
        console.log(res.data.data);
        setValues(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-0 bg-electric-violet-100 h-screen">
      <h1 className="text-2xl font-bold text-electric-violet-900 text-center p-4">
        Banxico Data Grapher
      </h1>
      <div className="grid grid-cols-12 m-0 p-0 h-5/6">
        <AnimatePresence>
          {!list && (
            <div>
              <div className="transition-opacity" aria-hidden="true">
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
                    duration: 0.15,
                  },
                }}
                exit={{
                  opacity: 0,
                  scale: 1,
                  transition: {
                    ease: "easeIn",
                    duration: 0.15,
                  },
                }}
              >
                <div
                  className={`h-5/6 absolute left-1/4 w-3/6 bg-electric-violet-500 rounded-lg m-2 p-2 text-electric-violet-100 overflow-auto`}
                >
                  <div className="flex items-center justify-between px-4">
                    <p className="text-electric-violet-100 font-extrabold text-xl">
                      Choose an element to see its values.
                    </p>
                    <button
                      onClick={(e) => {
                        setList(!list);
                      }}
                      className="bg-electric-violet-900 self-end hover:bg-red-800 hover:transition-colors transition-colors text-electric-violet-100 px-4 py-2 m-2 rounded-full"
                    >
                      x
                    </button>
                  </div>
                  <div className="px-4">
                    <p className="text-electric-violet-100 font-extrabold text-xl">
                      Choose your preferred title:
                    </p>
                    <input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="rounded px-4 py-2 text-electric-violet-900"
                      type="text"
                    />
                  </div>
                  <div className="px-4">
                    <p className="text-electric-violet-100 font-extrabold text-xl">
                      Choose your preferred laguage:
                    </p>
                    <button
                      className={`${
                        !english
                          ? "bg-electric-violet-900 transition"
                          : "transition"
                      } p-4 rounded-xl`}
                      onClick={(e) => {
                        setEnglish(false);
                      }}
                    >
                      Spanish
                    </button>
                    <button
                      className={`${
                        english
                          ? "bg-electric-violet-900 transition"
                          : "transition"
                      } p-4 rounded-xl`}
                      onClick={(e) => {
                        setEnglish(true);
                      }}
                    >
                      English
                    </button>
                  </div>
                  <div className="px-4">
                    <p className="text-electric-violet-100 font-extrabold text-xl">
                      Choose how you want to visualize the data:
                    </p>
                    <button
                      className={`${
                        !chart
                          ? "bg-electric-violet-900 transition"
                          : "transition"
                      } p-4 rounded-xl`}
                      onClick={(e) => {
                        setChart(false);
                      }}
                    >
                      Graph
                    </button>
                    <button
                      className={`${
                        chart
                          ? "bg-electric-violet-900 transition"
                          : "transition"
                      } p-4 rounded-xl`}
                      onClick={(e) => {
                        setChart(true);
                        setDisplay("chart");
                      }}
                    >
                      Chart
                    </button>
                  </div>
                  {!chart ? (
                    <div>
                      <div className="flex items-center justify-between px-4">
                        <p className="text-electric-violet-100 font-extrabold text-xl">
                          Choose the graph type:
                        </p>
                        <button
                          className={`${
                            bar
                              ? "bg-electric-violet-900 transition"
                              : "transition"
                          } p-4 rounded-xl`}
                          onClick={(e) => {
                            setBar(true);
                            setDisplay("bar");
                          }}
                        >
                          Bar
                        </button>
                        <button
                          className={`${
                            !bar
                              ? "bg-electric-violet-900 transition"
                              : "transition"
                          } p-4 rounded-xl`}
                          onClick={(e) => {
                            setBar(false);
                            setDisplay("line");
                          }}
                        >
                          Line
                        </button>
                      </div>
                      <div className="flex items-center justify-between px-4 my-2">
                        <p className="text-electric-violet-100 font-extrabold text-xl">
                          Choose the color:
                        </p>
                        <button
                          className={`w-12 h-6 static border-solid border-electric-violet-50 border-4`}
                          onClick={(e) => {
                            setOpenPicker(!openPicker);
                          }}
                          style={{
                            backgroundColor: `${blockPickerColor}`,
                          }}
                        ></button>
                        <div className="w-48">
                          <SliderPicker
                            color={blockPickerColor}
                            onChange={(color) => {
                              setBlockPickerColor(color.hex);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )}

                  <ul className={``}>
                    {values && values.length > 0 ? (
                      values.map((index) => {
                        return (
                          <li
                            onClick={() => {
                              axios
                                .get(
                                  `https://5i8qcjp333.execute-api.us-east-1.amazonaws.com/dev/series/${index.variable}?token=b24da979c4e5787e082743e930717c9251ec16cb569f2b3b4b404739f9f030d6`,
                                  {
                                    headers: {
                                      Authorization:
                                        "01f04831044f073702d9244604d41c055e7c14bb96218e169926482fb5699788",
                                    },
                                  }
                                )
                                .then((res) => {
                                  setVariable((variable) => [
                                    ...variable,
                                    {
                                      variable: index.variable,
                                      graphTitle: res.data.bmx.series,
                                      customTitle: title,
                                      values: res.data.bmx.series[0].datos,
                                      numbers: res.data.bmx.series[0].datos.map(
                                        (a) => a.dato
                                      ),
                                      labels: res.data.bmx.series[0].datos.map(
                                        (a) => a.fecha
                                      ),
                                      chart: chart,
                                      displayType: display,
                                      graphType: bar,
                                      graphColor: blockPickerColor,
                                    },
                                  ]);
                                  setLoading(false);
                                  setList(!list);
                                })
                                .catch((err) => console.log(err));
                            }}
                            key={index.variable}
                            className="py-4 px-2 m-2 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition"
                          >
                            <p className="font-bold">{index.variable}</p>
                            {english ? (
                              <p className="text-sm">{index.display_name_en}</p>
                            ) : (
                              <p className="text-sm">{index.display_name}</p>
                            )}

                            <p className="font-bold">{index.unit_id}</p>
                          </li>
                        );
                      })
                    ) : (
                      <h2></h2>
                    )}
                  </ul>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

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
            Add graph
          </button>
          <div className="mx-4 px-4 ">
            {variable && !loading ? (
              variable.map((element) => {
                console.log(element);
                return (
                  <div
                    key={element.variable}
                    className="bg-electric-violet-50 my-4 p-4 rounded-lg"
                  >
                    <h1 className="font-bold capitalize">
                      {element.customTitle}
                    </h1>
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
                        <h1 className="font-bold capitalize">
                          {element.customTitle}
                        </h1>
                        <p className="capitalize">{element.variable}</p>
                        <div className="flex justify-center">
                          <Table
                            columns={[
                              {
                                Header: element.graphTitle[0].titulo,
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
                            data={element.values}
                          />
                        </div>
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="flex flex-row items-center justify-center text-center h-fit">
                <button
                  disabled
                  type="button"
                  className="py-2.5 px-5 mr-2 text-2xl text-center font-medium rounded-lg text-electric-violet-900 inline-flex items-center"
                >
                  <svg
                    role="status"
                    className="inline mr-2 w-20 h-20 text-electric-violet-900 animate-spin dark:text-electric-violet-900"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                  Loading ...
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      <footer className="flex justify-center self-center p-4 text-center ">
        <p>
          Hecho con ❤️ por Rodrigo Montoya. Arequipa 2023.
        </p>
      </footer>
    </div>
  );
}

export default App;
