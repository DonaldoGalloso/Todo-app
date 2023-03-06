import { createContext, useEffect, useState } from "react";
import Form from "./Components/Form";
import List from "./Components/List";
import { GetTodos } from "./helpers/GetTodos";

export const TodosContext = createContext();

function App() {
  //state para tener un arreglo de todos
  const [Todos, setTodos] = useState([]);
  const [IsEditTodo,setIsEditTodo] = useState(false);
  const [EditTodo,setEditTodo] = useState({
    name:"",
    descripcion:"",
    id: "",
  })

  // función asincrona que hace la llamada a la función que nos permite hacer una petición y obtener todos los todos de un usuario en especifico
  const GetAllTodos = async() =>{
    // esperamos la respuesta el cual es un arreglo de todos
    const newTodos = await GetTodos();
    //agregamos los todos al state
    setTodos(newTodos);
    
  }

  // efecto que se ejecutará cuando se monte el componente
  useEffect(() => {
    GetAllTodos();
  }, [])
  

  return (
    <div className="mt-10">
      <h1 className="text-5xl font-bold text-center text-white" >To-DoApp<span className="text-sm font-bold text-centet text-white"> By Donaldo Galloso</span></h1>
      <div className="mt-20 block lg:flex  justify-evenly items-start ">
      <TodosContext.Provider value={{Todos,setTodos,IsEditTodo,setIsEditTodo,EditTodo,setEditTodo}}>
        <Form/>
        <List/>
      </TodosContext.Provider>
      </div>
    </div>
  );
}

export default App;
