import { useState } from "react";

const useInputItem = () => {
  const [input, setInput] = useState({
    residence_type: "",
    transaction_type: "",
    deposit: "",
    monthly_payment: "",
    acreage: "",
    communication: "",
    bug: "",
    smell: "",
    floor_noise: "",
    walls_noise: "",
    town_noise: "",
    mold: "",
    parking: "",
    safe: "",
    good: "",
    bad: "",
    star: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const reset = () => {
    setInput({
      residence_type: "",
      transaction_type: "",
      deposit: "",
      monthly_payment: "",
      acreage: "",
      communication: "",
      bug: "",
      smell: "",
      floor_noise: "",
      walls_noise: "",
      town_noise: "",
      mold: "",
      parking: "",
      safe: "",
      good: "",
      bad: "",
      star: "",
    });
  };
  return { input, setInput, onChangeHandler, reset };
};

export default useInputItem;
