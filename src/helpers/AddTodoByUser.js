export const AddTodoByUser = (todo) =>{
    const result = fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            todo: todo,
            completed: false,
            userId: 1,
        })
        })
    .then(res => res.json())
    
    return result
}