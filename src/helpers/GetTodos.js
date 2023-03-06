export const GetTodos = async() =>{
    const url = 'https://dummyjson.com/todos/user/1'
    const {todos} = await (await fetch(url)).json();
    const allTodos = todos.map( todo =>({
      name:todo.todo,
      description: "",
      status: false,
      id: todo.id
    }))
   return allTodos
}