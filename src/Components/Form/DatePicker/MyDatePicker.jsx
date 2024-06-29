import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useCallback, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function MyDatePicker({
  selected,
  setDate,
  setValueDate,
  placeholder,
  labelTitle,
}) {
  const labelContentRef = useRef(null);
  const onClickLabel = useCallback((event) => {
    if (event.nativeEvent.target !== labelContentRef.current) {
      event.preventDefault();
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const todayButton = document.querySelector(".react-datepicker__today-button");
      if (todayButton && !todayButton.querySelector(".fa-house")) {
        const icon = document.createElement("i");
        icon.className = "fa fa-house";
        todayButton.prepend(icon);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <label className="label" onClick={onClickLabel}>
      <p ref={labelContentRef}>{labelTitle}</p>
      <DatePicker
        required
        selected={selected}
        onChange={(date) => {
          setValueDate(date);
          setDate(date);
        }}
        dateFormat="dd/MM/yyyy"
        isClearable
        placeholderText={placeholder}
        fixedHeight
        useShortMonthInDropdown
        showYearDropdown
        dropdownMode="select"
        todayButton="Today"
        className="custom-datepicker" // Ajoutez une classe personnalisée
      />
    </label>
  );
}
