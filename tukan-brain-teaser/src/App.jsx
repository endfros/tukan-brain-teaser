import axios from "axios";

function App() {
  axios.get("https://5i8qcjp333.execute-api.us-east-1.amazonaws.com/dev/series/?page=2&pageSize=50", {
    headers: {
      Authorization: "01f04831044f073702d9244604d41c055e7c14bb96218e169926482fb5699788"
    }
  })
  .then(res=> console.log(res.data.data))
  .catch(err => console.log(err))

  return (
    <div className="p-0 bg-electric-violet-100 h-screen">
      <h1 className="text-2xl font-bold text-electric-violet-900 text-center p-4">
        Banxico Data Grapher
      </h1>
      <div className="card grid grid-cols-12 m-0 p-0 h-5/6">
        <ul className="col-span-3 text-center bg-electric-violet-500 rounded-lg m-2 text-electric-violet-100 overflow-auto">
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
          <li className="py-4 font-medium rounded-lg hover:underline hover:cursor-pointer hover:bg-electric-violet-800 hover:rounded-lg transition">
            holi
          </li>
        </ul>
        <div className="col-span-9 rounded m-2 overflow-auto bg-electric-violet-300">
          <p>
            Aqui va el grafico :D
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
