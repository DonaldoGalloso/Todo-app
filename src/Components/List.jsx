import ListItem from "./ListItem";
import { TodosContext } from "../App";
import { useContext, useState } from "react";
import ReactPaginate from 'react-paginate';

const List = ({itemsPerPage = 3 }) =>{
    const {Todos} = useContext(TodosContext);

    const [itemOffset, setItemOffset] = useState(0);

    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = Todos.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(Todos.length / itemsPerPage);
  
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % Todos.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return(
        <div className="mb-5">
           {currentItems.map(todo =>(
            <ListItem key={todo.id} id={todo.id} name={todo.name} status={todo.status} description={todo.description}/>
           ))}
            <ReactPaginate
            className="paginate text-white text-l uppercase "s
            nextLabel="next>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<previous"
            renderOnZeroPageCount={null}
            />
        </div>
    );
}

export default List;