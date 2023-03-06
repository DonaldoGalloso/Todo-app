export const DeleteTodos = async(id) => {
    const result = fetch(`https://dummyjson.com/todos/${id}`, {
        method: 'DELETE',
    })
    .then(res => res.json())
     return result;
} 