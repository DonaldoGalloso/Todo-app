import { useContext, useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { AddTodoByUser } from "../helpers/AddTodoByUser";
import { v4 as uuidv4 } from 'uuid';
import { TodosContext } from "../App";

const Form = () =>{
    // state para el nombte y la descripción
    const [NewTodo, setNewTodo] = useState({
        name:"",
        description:""
    });
    const {Todos,setTodos,IsEditTodo,EditTodo,setIsEditTodo} = useContext(TodosContext);

    useEffect(() => {
      setNewTodo({
        name: EditTodo.name,
        description: EditTodo.description
      })
    }, [EditTodo])

    const CancelEdit = () => {
        setNewTodo({
            name:"",
            description:""
        })
        setIsEditTodo(false)
    }
    
    //handler para obtener y guardar el resultado del nombre y la descripción
    const TodoNameHandler = (e) =>{
        setNewTodo({
            name:e.target.value,
            description: NewTodo.description
    });
    }
    
    const TodoDescriptHandler = (e) =>{
        setNewTodo({
          name: NewTodo.name,
          description: e.target.value
        });
    }

    //funcion para agregar un todo
    const addTodo = async(e) =>{
        //validación al nombre del todo
        if(NewTodo.name === "" || NewTodo.name.length<3){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text:"El Nombre de la Tarea es muy Corto"
              })
              return
        }
        const {id} = await AddTodoByUser(NewTodo.name);
        // agregar el todo al arreglo principal
       setTodos(
        [
            {
                name:NewTodo.name,
                description:NewTodo.description,
                status:false,
                id: uuidv4()
            }
        ,...Todos]);
        
        if(IsEditTodo){
            setTodos((current) =>
            current.filter((todo) => todo.id !== EditTodo.id)
            );
        }

        
        setNewTodo({
            name:"",
            description:""
        })

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `La Tarea ha sido ${IsEditTodo? "Editada":"Creada"} Correctamente con el id ${id}`,
            showConfirmButton: false,
            timer: 2000
          })

          setIsEditTodo(false);
    }

    return(
        <div className="px-5 mb-10  grid  place-content-center">
            <div className=" -mx-3 mb-6">
                <div className="w-96 w-2/3 px-3 mb-6 md:mb-0">
                <label className="uppercase tracking-wide text-gray-700 text-white text-xs font-bold mb-5">
                    Nombre de la Tarea
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight my-3" type="text" onChange={TodoNameHandler} value={NewTodo.name || ""}/>
                </div>
                <div className="w-96 w-2/3 px-3">
                <label className="uppercase tracking-wide text-white text-gray-700 text-xs font-bold ">
                    Descripción (opcional)
                </label>
                <textarea className="appearance-none h-32 block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 my-3 leading-tight" type="text" onChange={TodoDescriptHandler} value={NewTodo.description || ""} />
                </div>
            </div>
            <div className="lg:flex lg:justify-between">
                {IsEditTodo? 
                    <button className="w-full mx-2 mb-2  block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-800 rounded"
                        onClick={addTodo}>
                        Guardar
                    </button>
                : 
                    <button className="w-full mb-2 block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2  border border-blue-700 rounded"
                        onClick={addTodo}>
                        Agregar
                    </button>
                }
                {IsEditTodo?
                    <button className="w-full mx-2 mb-2 block bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 border border-rose-700 rounded"
                        onClick={CancelEdit}>
                        Cancelar
                    </button>
                :
                    null
                }
                    
            </div>
            

            
        </div>
        
    );
}

export default Form;