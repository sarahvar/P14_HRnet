import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { addEmployeeAction } from "../../core/redux/employee";
import { states, departments } from "../../utils/statesAndDepartments";
import "./styles.css";

/**
 * Render Home Page
 *
 * @category Pages
 * @component
 * @returns { React.Component } A React component
 */
function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  // Regex to validate inputs
  const nameRegex = "^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{1,128}$";
  const dateRegex = "^(0[1-9]|1[0-2])/(0[1-9]|[1-2][0-9]|3[0-1])/(19|20)\\d{2}$";
  const dateRegexOnChange = "^[\\d\\/]{0,10}$";
  const addressRegex = "^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]{1,128}$";
  const zipRegex = "^\\d{4}$|^\\d{5}$";
  const zipRegexOnChange = "^\\d{0,5}$";

  useEffect(() => {
    document.title = "Create Employee - HRnet";
  }, []);

  const {
    handleSubmit, // handles form submission
    handleChange, // handles input changes
    handleValidation, // handles input validation
    data, // access to the form data
    errors, // includes the errors to show
  } = useForm({
    validations: {
      firstName: {
        required: {
          value: true,
          message: "First Name is required",
        },
        pattern: {
          value: nameRegex,
          message: "First Name must contain only letters, spaces and some special characters",
        },
      },
      lastName: {
        required: {
          value: true,
          message: "Last Name is required",
        },
        pattern: {
          value: nameRegex,
          message: "Last Name must contain only letters, spaces and some special characters",
        },
      },
      dateOfBirth: {
        required: {
          value: true,
          message: "Date of Birth is required",
        },
        pattern: {
          value: dateRegex,
          message: "Date of Birth isn't in the format MM/DD/YYYY",
        },
      },
      startDate: {
        required: {
          value: true,
          message: "Start Date is required",
        },
        pattern: {
          value: dateRegex,
          message: "Start Date isn't in the format MM/DD/YYYY",
        },
      },
      street: {
        required: {
          value: true,
          message: "Street is required",
        },
        pattern: {
          value: addressRegex,
          message: "Street must contain only letters, numbers, spaces and some special characters",
        },
      },
      city: {
        required: {
          value: true,
          message: "City is required",
        },
        pattern: {
          value: addressRegex,
          message: "City must contain only letters, numbers, spaces and some special characters",
        },
      },
      state: {
        required: {
          value: true,
          message: "State is required",
        },
        custom: {
          isValid: (value) => states.some((state) => state.value === value),
          message: "Your selection is not valid",
        },
      },
      zip: {
        required: {
          value: true,
          message: "Zip is required",
        },
        pattern: {
          value: zipRegex,
          message: "Zip must be 4 or 5 digits",
        },
      },
      department: {
        required: {
          value: true,
          message: "Department is required",
        },
        custom: {
          isValid: (value) => departments.includes(value),
          message: "Your selection is not valid",
        },
      },
    },
    onSubmit: () => {
      const employee = {
        firstName: sanitizerOnSubmit(data.firstName),
        lastName: sanitizerOnSubmit(data.lastName),
        dateOfBirth: sanitizerOnSubmit(data.dateOfBirth),
        startDate: sanitizerOnSubmit(data.startDate),
        department: sanitizerOnSubmit(data.department),
        street: sanitizerOnSubmit(data.street),
        city: sanitizerOnSubmit(data.city),
        state: sanitizerOnSubmit(data.state),
        zipCode: sanitizerOnSubmit(data.zip),
      };
      dispatch(addEmployeeAction(employee));
      setShowConfirmationModal(true);
    },
    initialValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      startDate: "",
      department: departments[0],
      street: "",
      city: "",
      state: states[0].value,
      zip: "",
    },
  });

  /**
   * When the form is submitted, trim the value.
   * @returns The value of the input field with the whitespace trimmed.
   */
  const sanitizerOnSubmit = (value) => {
    return value.trim();
  };

  /**
   * It takes an event/value and a regex as parameters
   * @returns The value with the first letter capitalized and with all characters that don't match the regex removed
   */
  const sanitizerOnChange = (event, regex) => {
    const value = event.target ? event.target.value : event;
    let valueWithFirstLetterUpperCase = value.charAt(0).toUpperCase() + value.slice(1);

    // check if first letter is a letter or a number, if not, remove it
    let regexFirstLetter = new RegExp("^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð]");
    if (!regexFirstLetter.test(valueWithFirstLetterUpperCase.charAt(0))) {
      valueWithFirstLetterUpperCase = valueWithFirstLetterUpperCase.slice(1);
    }

    // remove last character if not in the regex
    if (!RegExp(regex).test(valueWithFirstLetterUpperCase)) {
      valueWithFirstLetterUpperCase = valueWithFirstLetterUpperCase.slice(0, -1);
    }

    return valueWithFirstLetterUpperCase;
  };

  return (
    <main>
      <div className="container home-page">
        <div className="title">
          <h1>HRnet</h1>
        </div>
        <button className="button" onClick={() => navigate("/employee-list")} aria-label="Navigate to employee list page">
          Employee List
        </button>
        <h2>Create Employee</h2>

        <form
          id="create-employee"
          onSubmit={handleSubmit}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
            }
          }}
        >
          <label htmlFor="first-name">First Name</label>
          <input
            id="first-name"
            name="firstName"
            value={data.firstName}
            onChange={(e) => handleChange(e, sanitizerOnChange(e, nameRegex))}
            onBlur={handleValidation}
            required
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}

          <label htmlFor="last-name">Last Name</label>
          <input
            id="last-name"
            name="lastName"
            value={data.lastName}
            onChange={(e) => handleChange(e, sanitizerOnChange(e, nameRegex))}
            onBlur={handleValidation}
            required
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}

          <label htmlFor="date-of-birth">Date of Birth</label>
          <input
            id="date-of-birth"
            name="dateOfBirth"
            value={data.dateOfBirth}
            onChange={(e) => handleChange(e, sanitizerOnChange(e, dateRegexOnChange))}
            onBlur={handleValidation}
            required
          />
          {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}

          <label htmlFor="start-date">Start Date</label>
          <input
            id="start-date"
            name="startDate"
            value={data.startDate}
            onChange={(e) => handleChange(e, sanitizerOnChange(e, dateRegexOnChange))}
            onBlur={handleValidation}
            required
          />
          {errors.startDate && <span className="error">{errors.startDate}</span>}

          <label htmlFor="street">Street</label>
          <input
            id="street"
            name="street"
            value={data.street}
            onChange={(e) => handleChange(e, sanitizerOnChange(e, addressRegex))}
            onBlur={handleValidation}
            required
          />
          {errors.street && <span className="error">{errors.street}</span>}

          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            value={data.city}
            onChange={(e) => handleChange(e, sanitizerOnChange(e, addressRegex))}
            onBlur={handleValidation}
            required
          />
          {errors.city && <span className="error">{errors.city}</span>}

          <label htmlFor="state">State</label>
          <select
            id="state"
            name="state"
            value={data.state}
            onChange={handleChange}
            onBlur={handleValidation}
            required
          >
            {states.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
          {errors.state && <span className="error">{errors.state}</span>}

          <label htmlFor="zip">Zip</label>
          <input
            id="zip"
            name="zip"
            value={data.zip}
            onChange={(e) => handleChange(e, sanitizerOnChange(e, zipRegexOnChange))}
            onBlur={handleValidation}
            required
          />
          {errors.zip && <span className="error">{errors.zip}</span>}

          <label htmlFor="department">Department</label>
          <select
            id="department"
            name="department"
            value={data.department}
            onChange={handleChange}
            onBlur={handleValidation}
            required
          >
            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>
          {errors.department && <span className="error">{errors.department}</span>}

          <button type="submit">Save</button>
        </form>
        {showConfirmationModal && (
          <div className="modal">
            <p>Employee created successfully!</p>
            <button onClick={() => setShowConfirmationModal(false)}>Close</button>
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;
