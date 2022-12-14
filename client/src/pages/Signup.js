import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { Button, Card, Form, Row } from "react-bootstrap";

export default function Signup(props) {
  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div style={{ marginBottom: 30 }}>
        <h2>Signup</h2>
      </div>

      {/* <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor='first_name'>First Name:</label>
                    <input
                        placeholder='First'
                        name='first_name'
                        type='first_name'
                        id='first-name'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='last_name'>Last Name:</label>
                    <input
                        placeholder='Last'
                        name='last_name'
                        type='last_name'
                        id='last-name'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input
                        placeholder='Email'
                        name='email'
                        type='email'
                        id='email'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        placeholder='Password'
                        name='password'
                        type='password'
                        id='password'
                        onChange={handleChange}
                    />
                </div>o
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form> */}
      <Card style={{ padding: 30 }}>
        {" "}
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="first_name"
              type="first_name"
              placeholder="Enter First Name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="last_name"
              type="last_name"
              placeholder="Enter Last Name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Enter Email"
            />

          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="password"
              type="password"
              placeholder="Enter Password"
            />
          </Form.Group>
          <Row className="justify-content-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Row>
        </Form>
        <Row className="justify-content-center">
          <Link style={{ padding: 15 }} to="/login">
            Already have an account? Login!
          </Link>
        </Row>
      </Card>
    </>
  );
}
