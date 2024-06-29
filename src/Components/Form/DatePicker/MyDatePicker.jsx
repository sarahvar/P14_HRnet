import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRef, useCallback, useEffect } from "react";

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
    const todayButton = document.querySelector(".react-datepicker__today-button");
    if (todayButton) {
      todayButton.innerHTML = '<i class="fa fa-house"></i> Today';
    }
  }, []);

  return (
    <label className="label" onClick={onClickLabel} style={{ display: "block", marginBottom: "1rem" }}>
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
        className="custom-datepicker"
      />
    </label>
  );
}
