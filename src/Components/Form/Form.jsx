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
  const location = useLocation();
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

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    startDate: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "",
  });

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  // Reset form fields
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
    setErrors({
      firstName: "",
      lastName: "",
      birthDate: "",
      startDate: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      department: "",
    });
  };

  // Close the modal and reset the form
  const onCloseModal = () => {
    setOpenModal(false);
    resetForm();
  };

  // Validate form fields
  const validateForm = () => {
    let valid = true;
    let errors = {};

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ '-]{2,}$/; // Regex to validate names
    const streetRegex = /^.*\d+.*$/; // Regex to ensure street contains digits
    const zipCodeRegex = /^\d{5}$/; // Regex to validate zip code (5 digits)

    if (!nameRegex.test(firstName)) {
      errors.firstName = "First name must be at least 2 characters long and contain only letters, spaces, or hyphens.";
      valid = false;
    }
    if (!nameRegex.test(lastName)) {
      errors.lastName = "Last name must be at least 2 characters long and contain only letters, spaces, or hyphens.";
      valid = false;
    }
    if (!isDateOfBirthValid(birthDate)) {
      errors.birthDate = "You must be at least 16 years old.";
      valid = false;
    }
    if (!startDate) {
      errors.startDate = "Start date is required.";
      valid = false;
    } else if (birthDate && new Date(birthDate) >= new Date(startDate)) {
      errors.startDate = "Start date must be after the date of birth.";
      valid = false;
    }
    if (street.length < 2 || !streetRegex.test(street)) {
      errors.street = "Street must be at least 2 characters long and contain at least one digit.";
      valid = false;
    }
    if (city.length < 2) {
      errors.city = "City must be at least 2 characters long.";
      valid = false;
    }
    if (!state) {
      errors.state = "State is required.";
      valid = false;
    }
    if (!zipCodeRegex.test(zipCode)) {
      errors.zipCode = "Zip code must be exactly 5 digits.";
      valid = false;
    }
    if (!department) {
      errors.department = "Department is required.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  // Check if the date of birth is valid (at least 16 years old)
  const isDateOfBirthValid = (birthDate) => {
    const birthDateObj = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    const dayDifference = today.getDate() - birthDateObj.getDate();

    return age > 16 || (age === 16 && (monthDifference > 0 || (monthDifference === 0 && dayDifference >= 0)));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const employee = {
        firstName,
        lastName,
        startDate: formatDateForTable(new Date(startDate)),
        department,
        birthDate: formatDateForTable(new Date(birthDate)),
        street,
        city,
        state,
        zipCode,
      };

      dispatch(addEmployee(employee));
      setOpenModal(true);
    }
  };

  // Format date for table (MM/DD/YYYY)
  const formatDateForTable = (date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getUTCFullYear();
    return `${month}/${day}/${year}`;
  };

  // Reset form when location changes
  useEffect(() => {
    resetForm();
  }, [location]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-description">Create Employee</div>
        <div className="form-group">
          <Input
            type="text"
            id="firstname"
            name="firstname"
            labelTitle="First Name"
            value={firstName}
            setInput={setFirstName}
          />
          {errors.firstName && <div className="error-message">{errors.firstName}</div>}
        </div>
        <div className="form-group">
          <Input
            type="text"
            id="lastname"
            name="lastname"
            labelTitle="Last Name"
            value={lastName}
            setInput={setLastName}
          />
          {errors.lastName && <div className="error-message">{errors.lastName}</div>}
        </div>
        <div className="form-group">
          <DatePicker
            id="birthdate"
            labelTitle="Date of Birth"
            selected={valueBirthDate}
            setValueDate={setValueBirthDate}
            setDate={setBirthDate}
            placeholder="MM/DD/YYYY"
          />
          {errors.birthDate && <div className="error-message">{errors.birthDate}</div>}
        </div>
        <div className="form-group">
          <DatePicker
            id="startdate"
            labelTitle="Start Date"
            selected={valueStartDate}
            setValueDate={setValueStartDate}
            setDate={setStartDate}
            placeholder="MM/DD/YYYY"
          />
          {errors.startDate && <div className="error-message">{errors.startDate}</div>}
        </div>
        <div className="form-group address">
          <label htmlFor="street" className="address-label">Address</label>
          <Input
            type="text"
            id="street"
            name="street"
            labelTitle="Street:"
            value={street}
            setInput={setStreet}
          />
          {errors.street && <div className="error-message">{errors.street}</div>}
          <Input
            type="text"
            id="city"
            name="city"
            labelTitle="City:"
            value={city}
            setInput={setCity}
          />
          {errors.city && <div className="error-message">{errors.city}</div>}
          <Dropdown
            id="state"
            name="state"
            labelTitle="State:"
            value={state}
            setDrop={setState}
            datas={dataStates}
            placeholder="Select State"
          />
          {errors.state && <div className="error-message">{errors.state}</div>}
          <Input
            type="number"
            id="zipcode"
            name="zipcode"
            labelTitle="Zipcode:"
            value={zipCode}
            setInput={setZipCode}
          />
          {errors.zipCode && <div className="error-message">{errors.zipCode}</div>}
        </div>
        <div className="form-group">
          <Dropdown
            id="department"
            name="department"
            labelTitle="Department:"
            value={department}
            setDrop={setDepartment}
            datas={dataDepartments}
            placeholder="Select Department"
          />
          {errors.department && <div className="error-message">{errors.department}</div>}
        </div>
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




