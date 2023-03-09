import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import tukanLogo from "../assets/tukanLogo.png";
import { Table } from "./Table";
import exportAsImage from "../utils/exportAsImage";
import { SliderPicker } from "react-color";
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

export const DataContainer = (props) => {
  const exportRef = useRef([]);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(props.variable);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    props.setVariable(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="mx-4 px-4 "
          >
            {props.variable.map((element, index) => {
              localStorage.setItem("variables", JSON.stringify(props.variable));
              return (
                <div key={element.variable}>
                  <AnimatePresence>
                    {props.edit && (
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
                              Editing item: {props.item.variable}
                            </p>
                            <div className="flex justify-between items-center my-4">
                              <p className="text-electric-violet-100 font-extrabold md:text-xl">
                                Edit your title:
                              </p>
                              <input
                                defaultValue={props.item.customTitle}
                                onChange={(e) => {
                                  props.item.customTitle = e.target.value;
                                }}
                                className="rounded px-4 py-2 text-electric-violet-900"
                                type="text"
                              />
                            </div>
                            {props.item.displayType === "chart" ? (
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
                                      props.setOpenPicker(!props.openPicker);
                                    }}
                                    style={{
                                      backgroundColor: `${props.blockPickerColor}`,
                                    }}
                                  ></button>
                                  <div className="w-48 my-4 self-center">
                                    <SliderPicker
                                      color={props.blockPickerColor}
                                      onChange={(color) => {
                                        props.setBlockPickerColor(color.hex);
                                        props.item.graphColor =
                                          props.blockPickerColor;
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <p className="text-electric-violet-100 font-extrabold md:text-xl">
                                    Edit how you want to visualize the data:
                                  </p>
                                  <section className="flex flex-row justify-center my-4">
                                    <button
                                      className={`${
                                        props.item.displayType &&
                                        props.item.displayType === "bar"
                                          ? `bg-electric-violet-900 transition}`
                                          : "transition"
                                      } p-4 rounded-xl`}
                                      onClick={(e) => {
                                        props.setBar(true);
                                        item.displayType = "bar";
                                      }}
                                    >
                                      Bar
                                    </button>
                                    <button
                                      className={`${
                                        props.item.displayType === "line"
                                          ? `bg-electric-violet-900 transition}`
                                          : "transition"
                                      } p-4 rounded-xl`}
                                      onClick={(e) => {
                                        props.setBar(false);
                                        props.item.displayType = "line";
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
                                props.setEdit(!props.edit);
                                props.setItem(null);
                                props.setBar(true);
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
                        <div
                          ref={(el) => {
                            exportRef.current[index] = el;
                          }}
                        >
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
                                  props.setEdit(!props.edit);
                                  props.setItem(element);
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
                                    exportRef.current[index],
                                    `data${element.customTitle}`
                                  );
                                }}
                                className="bg-electric-violet-900 self-end hover:bg-electric-violet-600 hover:transition-colors transition-colors text-electric-violet-100 px-4 py-2 mx-2 rounded-full"
                              >
                                Download
                              </button>

                              <button
                                onClick={(e) => {
                                  const newList = props.variable.filter(
                                    (item) => item.variable !== element.variable
                                  );
                                  localStorage.setItem(
                                    "variables",
                                    JSON.stringify(newList)
                                  );
                                  props.setVariable(newList);
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
  );
};
