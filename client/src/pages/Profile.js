import React, { useState } from "react";
import Modal from "react-modal";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_PROFILE } from "../utils/queries";
import { NEW_PLAYER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Button, Form, Row } from "react-bootstrap";
import ProfilePlayers from "../components/ProfilePlayers";
Modal.setAppElement("#root");

export default function Profile() {
  // Modal Logic
  const [open, setOpen] = useState(false);
  // const [position, setPosition] = useState([]);

  function openModal(clear) {
    setOpen(!open);
    // if(clear) {
    //   setPosition([])
    //   console.log(position)
    // }
  }

  // New Player Form Logic
  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    number: null,
    position: [],
    handedness: "",
  });


  const [newPlayer, { playerError, playerData }] = useMutation(NEW_PLAYER);
  const handleChange = (event) => {
    const { name, value } = event.target;

    let newValue = value;

    if (name === "number") {
      newValue = parseInt(value);
    }

    // if (name === "position") {
    //   setPosition(positions => [...positions, value])
    //   newValue = position
    //   console.log(newValue)
    // }

    setFormState({
      ...formState,
      [name]: newValue,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await newPlayer({
          variables: { ...formState },
        });
    } catch (e) {
        console.error(e);
    }
};

// Get Profile Data Logic
const { loading, error, data } = useQuery(QUERY_PROFILE);
if (error) {
    console.log(error);
}

// Modal style

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '30rem'
  },
};

if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return (
      <div>
        <h4>
          You need to be logged in to see this. Use the navigation links above
          to sign up or log in!
        </h4>
      </div>
    );
  }
  const user = data.user;
  const useLogout = () => {
    Auth.logout();
  };



  return (
    <main>
      <div>
        <h3 className="display-4 d-flex justify-content-center m-4">Welcome, {user.first_name}!</h3>
        <div className="d-flex justify-content-center">
        <button className="btn btn-primary btn-lg  mb-4" onClick={() => openModal()}>Create a new player</button>
        {/* <button className="btn btn-primary btn-lg m-1" onClick={useLogout}>Logout</button> */}
        </div>
        <Modal
          isOpen={open}
          onRequestClose={() => openModal(false)}
          contentLabel="New Player"
          style={modalStyle}
        >      
        <div>
        {" "}
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="first_name"
              type="text"
              placeholder="Enter First Name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="last_name"
              type="text"
              placeholder="Enter Last Name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Number</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="number"
              type="number"
              placeholder="Enter Player Number"
            />

          </Form.Group>
          {/* <Form.Group className="mb-3">
          <Form.Label>Position</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="position"
              type="position"
              placeholder="Enter position"
            />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Handedness</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="handedness"
              type="handedness"
              placeholder="Enter Handedness"
            />
          </Form.Group> */}
          <Form.Label>Position</Form.Label>
          <div key={`position`} className="mb-3">
            <Form.Check
              onChange={handleChange}
              label="Catcher"
              name="position"
              type={"radio"}
              id={`C`}
              value='C'
            />
            <Form.Check
              label="First Base"
              onChange={handleChange}
              name="position"
              type={"radio"}
              id={`1B`}
              value='1B'
            />
            <Form.Check
              label="Second Base"
              onChange={handleChange}
              name="position"
              type={"radio"}
              id={`2B`}
              value='2B'
            />
            <Form.Check
              label="Third Base"
              onChange={handleChange}
              name="position"
              type={"radio"}
              id={`3B`}
              value='3B'
            />
            <Form.Check
              label="Shortstop"
              onChange={handleChange}
              name="position"
              type={"radio"}
              id={`SS`}
              value='SS'
            />
            <Form.Check
              label="Outfield"
              onChange={handleChange}
              name="position"
              type={"radio"}
              id={`OF`}
              value='OF'
            />
            <Form.Check
              label="Pitcher"
              onChange={handleChange}
              name="position"
              type={"radio"}
              id={`P`}
              value='P'
            />
            <Form.Check
              label="Designated Hitter"
              onChange={handleChange}
              name="position"
              type={"radio"}
              id={`DH`}
              value='DH'
            />
          </div>
          <Form.Label>Handedness</Form.Label>
          <div key={`handedness`} className="mb-3">
            <Form.Check
              label="Right"
              onChange={handleChange}
              name="handedness"
              type={"radio"}
              id={`R`}
              value='R'
            />
            <Form.Check
              label="Left"
              onChange={handleChange}
              name="handedness"
              type={"radio"}
              id={`L`}
              value='L'
            />
            <Form.Check
              label="Switch"
              onChange={handleChange}
              name="handedness"
              type={"radio"}
              id={`S`}
              value='S'
            />
          </div>
          {/* <Form.Label>Fielding Handedness</Form.Label>
          <div key={`field`} className="mb-3">
            <Form.Check
              inline
              label="Right"
              name="field"
              type={"radio"}
              id={`BR`}
              value='R'
            />
            <Form.Check
              label="Left"
              name="field"
              type={"radio"}
              id={`1B`}
              value='1B'
            />
            <Form.Check
              label="Switch"
              name="field"
              type={"radio"}
              id={`2B`}
              value='2B'
            />
          </div> */}
          <Row className="justify-content-center">
            <Button className='mr-2' variant="primary" onClick={() => openModal(true)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" onClick={() => window.location.reload()}>
              Submit
            </Button>
          </Row>
        </Form>
        <Row className="justify-content-center">
        </Row>
      </div>
    </Modal>
      <div className="d-flex flex-column">
          <ProfilePlayers/>
      </div>
      </div>
    </main>
  );
}
