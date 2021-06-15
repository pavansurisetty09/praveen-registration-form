import React, { Component } from "react";
import Form from "./Form";
import Table from "./Table";
import Modalpop from "./Modalpop";
import MyVerticallyCenteredModal from "./MyVerticallyCenteredModal";
import axios from "axios";

class Register extends Component {
  state = {
    users: [],
    person: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
    },
    errors: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
    },
    current: null,
    show: false,
  };

  //get request

  componentDidMount = async () => {
    await axios
      .get("/persons")
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        this.setState({ users: data });
      });
  };

  addPerson = () => {
    this.setState({ show: true });
    axios
      .post("/persons")
      .then((res) => res.data)
      .then((data) => {
        this.setState({ person: data });
      });
  };

  edit = (id) => {
    this.setState({ show: true });
    axios
      .get(`/persons/${id}`)
      .then((res) => res.data)
      .then((data) => {
        this.setState({ current: data });
        this.setState({ person: this.state.current });
      });
  };

  updatePerson = () => {
    axios
      .put(`/persons`)
      .then((res) => res.data)
      .then((data) => {
        this.setState([...this.state.users, { users: data }]);
      });
  };

  deletePerson = (id) => {
    axios
      .delete(`/persons/${id}`)
      .then((res) => res.data)
      .then((data) => {
        const deleteData = this.state.users.filter((user) => user._id !== data);
        this.setState({ users: deleteData });
      });
  };

  onChange = (field, value) => {
    this.setState({
      person: { ...this.state.person, [field]: value },
      errors: {
        ...this.state.errors,
        [field]: this.state.person.name == null || "" ? true : false,
      },
    });
  };

  validate = () => {
    this.setState({
      errors: {
        firstName: this.state.person.firstName == "",
        lastName: this.state.person.lastName == "",
        age: this.state.person.age == "",
        gender: this.state.person.gender == "",
      },
    });
    return (
      this.state.person.firstName == "" ||
      this.state.person.lastName == "" ||
      this.state.person.age == "" ||
      this.state.person.gender == ""
    );
  };

  submitData = (e) => {
    e.preventDefault();
    if (this.validate()) return;
    if (this.state.current == null) {
      this.addPerson();
    } else {
      this.updatePerson();
    }
  };

  clearFields = (e) => {
    e.preventDefault();
    this.setState({
      person: { firstName: "", lastName: "", age: "", gender: "" },
    });
  };

  showModel = () => {
    this.setState({ show: true });
  };

  closeModel = () => {
    this.setState({
      person: { firstName: "", lastName: "", age: "", gender: "" },
    });
    this.setState({ current: null });
    this.setState({ show: false });
  };

  render() {
    return (
      <div>
        <MyVerticallyCenteredModal
          show={this.state.show}
          showModel={this.showModel}
          closeModel={this.closeModel}
          submitData={this.submitData}
          change={this.onChange}
          person={this.state.person}
          errors={this.state.errors}
          current={this.state.current}
          clearFields={this.clearFields}
          onSubmit={this.onSubmit}
        />
        {/* <Form /> */}
        <Table
          users={this.state.users}
          edit={this.edit}
          delete={this.deletePerson}
        />
      </div>
    );
  }
}

export default Register;
