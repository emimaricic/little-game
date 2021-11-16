import React, { useState, useContext, useRef } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { MyContext } from "../context";

function Stage1() {
  const textInput = useRef();
  const context = useContext(MyContext);
  const [error, setError] = useState([false, ""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = textInput.current.value;
    const validate = validateInput(value);
    if (validate) {
      setError([false, ""]);
      context.addPlayer(value);
      textInput.current.value = "";
    }
  };

  const validateInput = (value) => {
    if (value === "") {
      setError(true, "Please add something");
      return false;
    }
    if (value.length <= 2) {
      setError(true, "Please enter valid name");
      return false;
    }
    return true;
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className="">
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Add player name"
            name="player"
            ref={textInput}
          />
        </Form.Group>

        {error[0] ? <Alert variant="danger">{error[1]}</Alert> : null}

        <Button className="miami" variant="primary" type="submit">
          Add player
        </Button>

        {context.state.players && context.state.players.length > 0 ? (
          <>
            <hr />
            <div>
              <ul className="list-group">
                {context.state.players.map((item, idx) => (
                  <li
                    key={idx}
                    className="list-group-item d-flex justify-content-between align-items-center list-group-item-action"
                  >
                    {" "}
                    {item}
                    <span
                      className="badge badge-danger"
                      onClick={() => context.removePlayer(idx)}
                    >
                      x
                    </span>
                  </li>
                ))}
              </ul>
              <div className="action_button" onClick={() => context.next()}>
                NEXT
              </div>
            </div>
          </>
        ) : null}
      </Form>
    </div>
  );
}
export default Stage1;
