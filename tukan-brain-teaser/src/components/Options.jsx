import axios from "axios";
import { SliderPicker } from "react-color";
import round from "../utils/round";
import changeDateFormat from "../utils/changeDateFormat";
import handleDecimals from "../utils/handleDecimals";
import { AnimatePresence, motion } from "framer-motion";



export const Options = (props) => {

  return (
    <AnimatePresence>
      {!props.list && (
        <div className="flex">
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
              className={`h-5/6 z-10 absolute left-0 right-0 ml-auto mr-auto w-11/12 md:left-1/4 md:w-3/6 bg-electric-violet-500 rounded-lg md:m-2 p-2 text-electric-violet-100 overflow-auto`}
            >
              {/* Modal header and close button */}
              <div className="flex items-center justify-between px-4 py-2">
                <p className="text-electric-violet-100 font-extrabold text-xl">
                  Options:
                </p>
                <button
                  onClick={(e) => {
                    props.setList(!props.list);
                  }}
                  className="bg-electric-violet-900 self-end hover:bg-red-800 hover:transition-colors transition-colors text-electric-violet-100 px-4 py-2 m-2 rounded-full"
                >
                  x
                </button>
              </div>
              <div className="bg-electric-violet-600 rounded-lg mx-2 p-2">
                {/* Modal title input */}
                <div className="px-4 flex flex-col items-center md:flex-row md:items-center md:justify-between md:my-3">
                  <p className="text-electric-violet-100 font-extrabold md:text-xl ">
                    Choose your preferred title:
                  </p>
                  <input
                    value={props.title}
                    onChange={(e) => props.setTitle(e.target.value)}
                    className="rounded px-4 py-2 m-2 md:w-full text-electric-violet-900"
                    type="text"
                  />
                </div>
                {/* Modal language input */}
                <div className="px-4 flex flex-col items-center md:flex-row md:items-center md:justify-between md:my-3">
                  <p className="text-electric-violet-100 font-extrabold md:text-xl">
                    Choose your preferred laguage:
                  </p>
                  <section className="p-2">
                    <button
                      className={`${
                        !props.english
                          ? "bg-electric-violet-900 transition"
                          : "transition"
                      } p-4 rounded-xl`}
                      onClick={(e) => {
                        props.setEnglish(false);
                      }}
                    >
                      Spanish
                    </button>
                    <button
                      className={`${
                        props.english
                          ? "bg-electric-violet-900 transition"
                          : "transition"
                      } p-4 rounded-xl`}
                      onClick={(e) => {
                        props.setEnglish(true);
                      }}
                    >
                      English
                    </button>
                  </section>
                </div>
                {/* Modal data presentation */}
                <div className="px-4 flex flex-col items-center md:flex-row md:items-center md:justify-between md:my-3">
                  <p className="text-electric-violet-100 font-extrabold md:text-xl">
                    Choose how you want to visualize the data:
                  </p>
                  <section className="p-2">
                    <button
                      className={`${
                        !props.chart
                          ? "bg-electric-violet-900 transition"
                          : "transition"
                      } p-4 rounded-xl`}
                      onClick={(e) => {
                        props.setChart(false);
                      }}
                    >
                      Graph
                    </button>
                    <button
                      className={`${
                        props.chart
                          ? "bg-electric-violet-900 transition"
                          : "transition"
                      } p-4 rounded-xl`}
                      onClick={(e) => {
                        props.setChart(true);
                        props.setDisplay("chart");
                      }}
                    >
                      Chart
                    </button>
                  </section>
                </div>
                <div className="px-4 md:my-3">
                  <p className="text-electric-violet-100 font-extrabold md:text-xl ">
                    Choose the start and end date range for the data
                  </p>
                  <section className="flex justify-around py-4">
                    <div>
                      <p className="text-electric-violet-100 ">Start date:</p>
                      <input
                        defaultValue={"1999-10-29"}
                        onChange={(e) => {
                          props.date[0] = e.target.value;
                        }}
                        className="rounded px-4 py-2 text-electric-violet-900"
                        type="date"
                      />
                    </div>
                    <div>
                      <p className="text-electric-violet-100 ">End date:</p>
                      <input
                        defaultValue={"2022-10-29"}
                        onChange={(e) => {
                          props.date[1] = e.target.value;
                        }}
                        className="rounded px-4 py-2 text-electric-violet-900"
                        type="date"
                      />
                    </div>
                  </section>
                </div>
                {/* Modal options depending if you want to show a table or a
                  graph */}
                {!props.chart ? (
                  <div>
                    <div className="flex items-center justify-between px-4 py-2 ">
                      <p className="text-electric-violet-100 font-extrabold md:text-xl">
                        Choose the graph type:
                      </p>
                      <button
                        className={`${
                          props.bar
                            ? "bg-electric-violet-900 transition"
                            : "transition"
                        } p-4 rounded-xl`}
                        onClick={(e) => {
                          props.setBar(true);
                          props.setDisplay("bar");
                        }}
                      >
                        Bar
                      </button>
                      <button
                        className={`${
                          !props.bar
                            ? "bg-electric-violet-900 transition"
                            : "transition"
                        } p-4 rounded-xl`}
                        onClick={(e) => {
                          props.setBar(false);
                          props.setDisplay("line");
                        }}
                      >
                        Line
                      </button>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-between px-4 my-4">
                      <p className="text-electric-violet-100 font-extrabold md:text-xl">
                        Choose the color:
                      </p>
                      <button
                        className={`w-12 h-6 static border-solid m-4 lg:m-0 border-electric-violet-50 border-4`}
                        onClick={(e) => {
                          props.setOpenPicker(!props.openPicker);
                        }}
                        style={{
                          backgroundColor: `${props.blockPickerColor}`,
                        }}
                      ></button>
                      <div className="w-48">
                        <SliderPicker
                          color={props.blockPickerColor}
                          onChange={(color) => {
                            props.setBlockPickerColor(color.hex);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex flex-col md:flex-row items-center justify-between px-4">
                      <p className="text-electric-violet-100 font-extrabold md:text-xl">
                        Choose the number of decimals data will have:
                      </p>
                      <input
                        value={props.decimals}
                        min="0"
                        onChange={(e) => {
                          handleDecimals(e.target.value);
                        }}
                        type="number"
                        className="rounded px-4 py-2 my-2 text-electric-violet-900"
                      />
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between px-4 my-2">
                      <p className="text-electric-violet-100 font-extrabold md:text-xl">
                        Choose date format:
                      </p>
                      <section className="flex flex-wrap xl:flex-nowrap my-2 justify-center">
                        <button
                          className={`${
                            props.dateFormat === "DMY"
                              ? "bg-electric-violet-900 transition"
                              : "transition"
                          } p-4 rounded-xl`}
                          onClick={(e) => {
                            props.setDateFormat("DMY");
                          }}
                        >
                          DD/MM/YYYY
                        </button>
                        <button
                          className={`${
                            props.dateFormat === "YMD"
                              ? "bg-electric-violet-900 transition"
                              : "transition"
                          } p-4 rounded-xl`}
                          onClick={(e) => {
                            props.setDateFormat("YMD");
                          }}
                        >
                          YYYY/MM/DD
                        </button>
                        <button
                          className={`${
                            props.dateFormat === "MDY"
                              ? "bg-electric-violet-900 transition"
                              : "transition"
                          } p-4 rounded-xl`}
                          onClick={(e) => {
                            props.setDateFormat("MDY");
                          }}
                        >
                          MM/DD/YYYY
                        </button>
                      </section>
                    </div>
                  </div>
                )}
              </div>
              <p className="text-electric-violet-100 mx-2 p-2 pt-6 font-extrabold text-xl">
                Choose the data you want to display:
              </p>
              <ul className={``}>
                {props.values && props.values.length > 0 ? (
                  props.values.map((index) => {
                    return (
                      <li
                        onClick={() => {
                          axios
                            .get(
                              `https://5i8qcjp333.execute-api.us-east-1.amazonaws.com/dev/series/${index.variable}/${props.date[0]}/${props.date[1]}?token=b24da979c4e5787e082743e930717c9251ec16cb569f2b3b4b404739f9f030d6`,
                              {
                                headers: {
                                  Authorization:
                                    "01f04831044f073702d9244604d41c055e7c14bb96218e169926482fb5699788",
                                },
                              }
                            )
                            .then((res) => {
                              props.setVariable((variable) => [
                                ...variable,
                                {
                                  variable: index.variable,
                                  graphTitle: res.data.bmx.series,
                                  customTitle: props.title,
                                  values: res.data.bmx.series[0].datos,
                                  numbers: res.data.bmx.series[0].datos.map(
                                    (a) =>
                                      round(
                                        a.dato.replace(/\,/g, ""),
                                        props.decimals
                                      )
                                  ),
                                  labels: res.data.bmx.series[0].datos.map(
                                    (a) =>
                                      changeDateFormat(
                                        a.fecha,
                                        props.dateFormat
                                      )
                                  ),
                                  chart: props.chart,
                                  displayType: props.display,
                                  graphType: props.bar,
                                  graphColor: props.blockPickerColor,
                                },
                              ]);
                              props.setList(!props.list);
                              props.setBar(true);
                              props.setChart(false);
                              props.setDisplay("bar");
                              props.setDateFormat("DMY");
                            })
                            .catch((err) => console.log(err));
                        }}
                        key={index.variable}
                        className="py-4 px-2 m-2 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition"
                      >
                        <p className="font-bold">{index.variable}</p>
                        {props.english ? (
                          <p className="text-sm">{index.display_name_en}</p>
                        ) : (
                          <p className="text-sm">{index.display_name}</p>
                        )}

                        <p className="font-bold">{index.unit_id}</p>
                      </li>
                    );
                  })
                ) : (
                  <p></p>
                )}
              </ul>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
