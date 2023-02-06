import styled from "styled-components";

export const Radio = ({ name, onChangeHandler, values, id }) => {
  return (
    <StRadioBtnWrap2>
      {values.map((value, index) => (
        <div className="radioBtn" key={`review-radio-${index}`}>
          <input
            id={`radio-${id[values.indexOf(value)]}`}
            type="radio"
            name={name}
            value={value}
            onChange={onChangeHandler}
          />
          <label htmlFor={`radio-${id[values.indexOf(value)]}`}>{value}</label>
        </div>
      ))}
    </StRadioBtnWrap2>
  );
};

const StRadioBtnWrap2 = styled.div`
  margin-left: 45px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 400px;

  .radioBtn {
    font-size: 18px;
  }
  .radioBtn input[type="radio"] {
    display: none;
  }
  .radioBtn label {
    display: block;
    border-radius: 15px;
    margin: 0 auto;
    text-align: center;
    width: 30px;
    height: 30px;
    line-height: 35px;
    cursor: pointer;
  }
  /* hover */
  .radioBtn input[type="radio"]:hover + label {
    background: #c2de0d;
    color: #fff;
  }
  /* Checked */
  .radioBtn input[type="radio"]:checked + label {
    background: #c2de0d;
    color: #fff;
  }
  /* Disabled */
  .radioBtn input[type="radio"] + label {
    border: 2px solid #c4cbcd;
    color: black;
  }
`;
