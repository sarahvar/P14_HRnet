import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../Redux/Slice/employeeSlice";
import DatePicker from "./DatePicker/MyDatePicker";
import dataStates from "../../data/dataStates";
import dataDepartments from "../../data/dataDepartments";
import Dropdown from "./Dropdown/Dropdowns";
import Input from "./Input/Input";
import Modal from "../Modal/Modal";
import "./Form.css";

const Form = () => {
  const [
    firstNameToAdd = "",
    lastNameToAdd = "",
    startDateToAdd = "",
    departmentToAdd = "",
    birthDateToAdd = "",
    streetToAdd = "",
    cityToAdd = "",
    stateToAdd = "",
    zipCodeToAdd = "",
  ] = useSelector((state) => [
    state.firstName,
    state.lastName,
    state.startDate,
    state.department,
    state.birthDate,
    state.street,
    state.city,
    state.state,
    state.zipCode,
  ]);

  const [firstName, setFirstName] = useState(firstNameToAdd);
  const [lastName, setLastName] = useState(lastNameToAdd);
  const [birthDate, setBirthDate] = useState(birthDateToAdd);
  const [startDate, setStartDate] = useState(startDateToAdd);
  const [street, setStreet] = useState(streetToAdd);
  const [city, setCity] = useState(cityToAdd);
  const [state, setState] = useState(stateToAdd);
  const [zipCode, setZipCode] = useState(zipCodeToAdd);
  const [department, setDepartment] = useState(departmentToAdd);

  const [valueBirthDate, setValueBirthDate] = useState(null);
  const [valueStartDate, setValueStartDate] = useState(null);

  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => setOpenModal(false);

  const dateForTable = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getUTCFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Créez l'objet employee
    const employee = {
      firstName,
      lastName,
      startDate: dateForTable(new Date(startDate)),
      department,
      birthDate: dateForTable(new Date(birthDate)),
      street,
      city,
      state,
      zipCode,
    };

    // Dispatch l'action pour ajouter l'employé
    dispatch(add(employee));

    // Réinitialisez les champs du formulaire
    setFirstName("");
    setLastName("");
    setBirthDate(null);
    setStartDate(null);
    setStreet("");
    setCity("");
    setState("");
    setZipCode("");
    setDepartment("");
    setValueBirthDate(null);
    setValueStartDate(null);

    // Fermez la modal
    onOpenModal();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-description">Create Employee</div>
        <Input
          type="text"
          name="firstname"
          labelTitle="First Name"
          value={firstName}
          setInput={setFirstName}
        />
        <Input
          type="text"
          name="lastname"
          labelTitle="Last Name"
          value={lastName}
          setInput={setLastName}
        />
        <DatePicker
          labelTitle="Date of Birth"
          selected={valueBirthDate}
          setValueDate={setValueBirthDate}
          setDate={setBirthDate}
          placeholder="MM/DD/YYYY"
        />
        <DatePicker
          labelTitle="Start Date"
          selected={valueStartDate}
          setValueDate={setValueStartDate}
          setDate={setStartDate}
          placeholder="MM/DD/YYYY"
        />

        <div className="address">
          <label className="address-label">Address</label>
          <Input
            type="text"
            name="street"
            labelTitle="Street:"
            value={street}
            setInput={setStreet}
          />
          <Input
            type="text"
            name="city"
            labelTitle="City:"
            value={city}
            setInput={setCity}
          />
          <Dropdown
            name="state"
            labelTitle="State:"
            value={state}
            setDrop={setState}
            datas={dataStates}
          />
          <Input
            type="number"
            name="zipcode"
            labelTitle="Zipcode:"
            value={zipCode}
            setInput={setZipCode}
          />
        </div>

        <Dropdown
          name="department"
          labelTitle="Department"
          value={department}
          setDrop={setDepartment}
          datas={dataDepartments}
        />
        <Input
          type="submit"
          name="submit"
          className="submit"
          value="Save"
        />
      </form>
      <Modal isOpen={openModal} onClose={onCloseModal}>
        Employee Created!
      </Modal>
    </>
  );
};

export default Form;
