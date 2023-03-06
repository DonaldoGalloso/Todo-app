import { useContext, useEffect, useState } from "react";
import { DeleteTodos } from "../helpers/DeleteTodo";
import { TodosContext } from "../App";
import Swal from 'sweetalert2';
import 'animate.css';


const ListItem = ({name,description,id,status}) => {

    const [Showdescription, setShowtdescripion] = useState(false);
    const {setTodos,setIsEditTodo,setEditTodo,IsEditTodo} = useContext(TodosContext);
    const [TodoCompleted,setTodoCompleted] = useState(false);

    console.log(IsEditTodo);

    if(description===""){
        description = "Esta tarea no tiene una descripción"
    }

    useEffect(() => {
      if(status){
        setEditTodo(true)
      }
    }, [status,setEditTodo])
    

    const showHandler = () => {
        setShowtdescripion(!Showdescription);
    }
    const completedHandler= (e) => {
        setTodoCompleted(!TodoCompleted)
    }

    const editTodoHandler = () => {
        setIsEditTodo(true);
        setEditTodo({
            name,
            description,
            id
        })
    }

    const deleteHandler = async() => {
       const result = await DeleteTodos(id);
       Swal.fire({
        title: '¿Estás seguro de Eliminar esta Tarea?',
        showDenyButton: true,
        confirmButtonText: 'Si, Eliminar',
        denyButtonText: `No Eliminar`,
      }).then((result) => {
        if (result.isConfirmed) {
            setTodos((current) =>
            current.filter((todo) => todo.id !== id)
        );
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `La Tarea ha sido Eliminada Correctamente`,
            showConfirmButton: false,
            timer: 1000
          })

        }
      })
       console.log(result);
    }

    return(
        <div key={name} className="block max-w-sm mx-auto p-6 border border-gray-200 rounded-lg shadow hover:bg-gray-100 bg-gray-600 border-gray-700 hover:bg-gray-500 mb-5" >
            <p className= {` cursor mb-5 text-l lg:text-2xl font-bold ${TodoCompleted? 'line-through text-rose-300' : 'text-white'  } tracking-tight px-2   transition ease-out hover:scale-110  duration-300`} onClick={showHandler} >{name}</p>
            {Showdescription? <p className="font-normal text-lg text-gray-200 animate__bounceIn my-3">{description}</p> : null}
            <div className="flex justify-between">
                    {IsEditTodo?
                    null
                    :
                    <div className="flex items-center" >
                        <input    type="checkbox" onChange={completedHandler} checked={TodoCompleted} className="cursor w-4 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label  className="ml-2 text-xs  font-medium text-gray-300">Finalizar tarea</label>
                    </div>
                    }
                    
                {TodoCompleted || IsEditTodo ? 
                null
                :
                <div className="ml-5">
                    <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 border border-orange-700 rounded" onClick={editTodoHandler}>Editar</button>
                </div>
                }
                {IsEditTodo?
                null
                :
                <div className="ml-5">
                    <button className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 border border-rose-700 rounded" onClick={deleteHandler}>Eliminar</button>
                </div>
                }
                
            </div>
        </div>
    )

}

export default ListItem;