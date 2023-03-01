import axios from "axios";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [values, setValues] = useState();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState(false);
  const [variable, setVariable] = useState([]);

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
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-0 bg-electric-violet-100 h-screen">
      <h1 className="text-2xl font-bold text-electric-violet-900 text-center p-4">
        Banxico Data Grapher
      </h1>
      <div className="grid grid-cols-12 m-0 p-0  h-5/6">
        <div
          className={`col-start-5 col-span-4  ${
            list ? "hidden" : "flex flex-col"
          } bg-electric-violet-500 rounded-lg m-2 p-2 text-electric-violet-100 overflow-auto `}
        >
          <div className="flex items-center justify-between px-4">
            <p className="text-electric-violet-100 font-extrabold text-xl">
              Choose an element to graph
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
                              title: res.data.bmx.series,
                              numbers: res.data.bmx.series[0].datos.map(
                                (a) => a.dato
                              ),
                              labels: res.data.bmx.series[0].datos.map(
                                (a) => a.fecha
                              ),
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
                    <p className="text-sm">{index.display_name}</p>
                    <p className="font-bold">{index.unit_id}</p>
                  </li>
                );
              })
            ) : (
              <h2></h2>
            )}
          </ul>
        </div>

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
            {!loading ? (
              variable.map((element) => {
                console.log(element);
                return (
                  <div
                    key={element.variable}
                    className="bg-electric-violet-50 my-4 p-4 rounded-lg"
                  >
                    <h1>{element.variable}</h1>
                    <Bar
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            position: "top",
                          },
                          title: {
                            display: true,
                            text: element.title[0].titulo,
                          },
                        },
                      }}
                      data={{
                        labels: element.labels,
                        datasets: [
                          {
                            label: element.variable,
                            data: element.numbers,
                            backgroundColor: "#48189a",
                          },
                        ],
                      }}
                    />
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
    </div>
  );
}

export default App;
