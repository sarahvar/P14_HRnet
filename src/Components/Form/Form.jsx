import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { addEmployee } from "../../Redux/Slice/employeeSlice";
import DatePicker from "./DatePicker/MyDatePicker";
import dataStates from "../../data/dataStates";
import dataDepartments from "../../data/dataDepartments";
import Dropdown from "./Dropdown/Dropdowns";
import Input from "./Input/Input";
import Modal from 'react-modal-sarahvar';
import 'react-modal-sarahvar/dist/index.css';

import "./Form.css";
import { selectEmployeeDetails } from "../../Redux/Selectors/selectors";

const Form = () => {
  const location = useLocation(); // Hook pour obtenir l'emplacement actuel
  const [
    firstNameToAdd,
    lastNameToAdd,
    startDateToAdd,
    departmentToAdd,
    birthDateToAdd,
    streetToAdd,
    cityToAdd,
    stateToAdd,
    zipCodeToAdd,
  ] = useSelector(selectEmployeeDetails);

  const [firstName, setFirstName] = useState(firstNameToAdd || "");
  const [lastName, setLastName] = useState(lastNameToAdd || "");
  const [birthDate, setBirthDate] = useState(birthDateToAdd || "");
  const [startDate, setStartDate] = useState(startDateToAdd || "");
  const [street, setStreet] = useState(streetToAdd || "");
  const [city, setCity] = useState(cityToAdd || "");
  const [state, setState] = useState(stateToAdd || "");
  const [zipCode, setZipCode] = useState(zipCodeToAdd || "");
  const [department, setDepartment] = useState(departmentToAdd || "");

  const [valueBirthDate, setValueBirthDate] = useState(null);
  const [valueStartDate, setValueStartDate] = useState(null);

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  // Fonction pour réinitialiser les champs
  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setBirthDate("");
    setStartDate("");
    setStreet("");
    setCity("");
    setState("");
    setZipCode("");
    setDepartment("");
    setValueBirthDate(null);
    setValueStartDate(null);
  };

  // Fonction pour fermer la modal et réinitialiser le formulaire
  const onCloseModal = () => {
    setOpenModal(false);
    resetForm(); // Réinitialiser les champs du formulaire lorsque la modal se ferme
  };

  // Fonction de validation des champs
  const validateForm = () => {
    return (
      firstName &&
      lastName &&
      birthDate &&
      startDate &&
      street &&
      city &&
      state &&
      zipCode &&
      department
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
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

      dispatch(addEmployee(employee));
      setOpenModal(true); // Ouvrir la modal après l'envoi
    } else {
      alert("Please fill in all fields."); // Alerte si les champs ne sont pas tous remplis
    }
  };

  const dateForTable = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getUTCFullYear();
    return `${month}/${day}/${year}`;
  };

  // Réinitialiser les données lorsque la localisation change
  useEffect(() => {
    resetForm();
  }, [location]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-description">Create Employee</div>
        <Input
          type="text"
          id="firstname"
          name="firstname"
          labelTitle="First Name"
          value={firstName}
          setInput={setFirstName}
        />
        <Input
          type="text"
          id="lastname"
          name="lastname"
          labelTitle="Last Name"
          value={lastName}
          setInput={setLastName}
        />
        <DatePicker
          id="birthdate"
          labelTitle="Date of Birth"
          selected={valueBirthDate}
          setValueDate={setValueBirthDate}
          setDate={setBirthDate}
          placeholder="MM/DD/YYYY"
        />
        <DatePicker
          id="startdate"
          labelTitle="Start Date"
          selected={valueStartDate}
          setValueDate={setValueStartDate}
          setDate={setStartDate}
          placeholder="MM/DD/YYYY"
        />
        <div className="address">
          <label htmlFor="street" className="address-label">Address</label>
          <Input
            type="text"
            id="street"
            name="street"
            labelTitle="Street:"
            value={street}
            setInput={setStreet}
          />
          <Input
            type="text"
            id="city"
            name="city"
            labelTitle="City:"
            value={city}
            setInput={setCity}
          />
        <Dropdown
        id="state"
        name="state"
        labelTitle="State:"
        value={state}
        setDrop={setState}
        datas={dataStates}
        placeholder="Select State"
      />
          <Input
            type="number"
            id="zipcode"
            name="zipcode"
            labelTitle="Zipcode:"
            value={zipCode}
            setInput={setZipCode}
          />
        </div>
        <Dropdown
        id="department"
        name="department"
        labelTitle="Department:"
        value={department}
        setDrop={setDepartment}
        datas={dataDepartments}
        placeholder="Select Department"
      />
        <Input
          type="submit"
          id="submit"
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
