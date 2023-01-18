import React from "react";
import { hangjungdong } from "./hangjungdong";

const SelectBox = () => {
  const [selected, setSelected] = useState({});
  const { postLocation1, postLocation2 } = hangjungdong;
  const [initial, setInitial] = useState(true);

  const HandleChange = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
    console.log(name, value);

    setInitial(false);
  };

  return (
    <>
      <div>
        <select name="postLocation1" onChange={HandleChange}>
          <option value="">시,도 선택</option>
          {postLocation1.map((el) => (
            <option key={el.postLocation1} value={el.postLocation1}>
              {el.codeNm}
            </option>
          ))}
        </select>
        <select name="postLocation2" onChange={HandleChange}>
          <option value="">구,군 선택</option>
          {postLocation2
            .filter((el) => el.postLocation1 === selected.postLocation1)
            .map((el) => (
              <option key={el.postLocation2} value={el.codeNm}>
                {el.codeNm}
              </option>
            ))}
        </select>
      </div>
    </>
  );
};

export default SelectBox;
