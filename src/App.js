import React, { useState } from "react";
import "./styles/Global.scss";
import "./App.scss";

const App = () => {
  const [list, setList] = useState([]);

  const [message, setMessage] = useState({
    text: "",
    id: "",
  });

  const [searchInput, setSearchInput] = useState("");

  const changeMessage = (event) => {
    setMessage((prev) => ({
      ...prev,
      text: event.target.value,
    }));
  };

  const handelSubmit = (event) => {
    event.preventDefault();
    let newTodo = {
      text: message.text,
      id: new Date().getTime().toString(),
      isComplete: false,
    };
    setList([...list, newTodo]);
    setMessage({
      text: "",
      id: "",
    });
  };

  const handelDelete = (id) => {
    let newTodos = list.filter((eachItem) => {
      return eachItem.id !== id;
    });
    setList(newTodos);
  };

  console.log(list);

  const getList = () => {
    const _list = list.filter((_item) => {
      return _item.text.toLowerCase().includes(searchInput.toLowerCase());
    });
    return _list;
  };

  return (
    <div className="App">
      <div className="container">
        <div className="searchItem">
          <input
            placeholder="search here..."
            className="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <form>
          <input
            type="text"
            placeholder="enter event here..."
            value={message.text}
            onChange={changeMessage}
          />
          <button onClick={handelSubmit} type="submit">
            Add
          </button>
        </form>
        <div className="todosList">
          {getList().length === 0 && <p className="noItem">no items..</p>}
          <ul>
            {getList().map((item) => (
              <li key={item.id}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}>
                  <input
                    type="checkbox"
                    style={{ marginRight: "4px" }}
                    onChange={(event) => {
                      const checked = event.target.checked;
                      setList((prev) => {
                        let list = prev.map((_item) => {
                          if (_item.id === item.id) {
                            return {
                              ...item,
                              isComplete: checked,
                            };
                          }
                          return _item;
                        });
                        return list;
                      });
                    }}
                  />
                  <span
                    style={
                      item.isComplete ? { textDecoration: "line-through" } : {}
                    }>
                    {item.text}
                  </span>
                </div>

                <div className="btn">
                  <button
                    className="delete"
                    onClick={() => handelDelete(item.id)}>
                    <i class="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
