import React from "react";
import DaumPostcode from "react-daum-postcode";

const PostCode = ({ setAddress, setJibunAddress }) => {
  const handle = {
    selectAddress: (data) => {
      setAddress(data.address + data.buildingName);
      setJibunAddress(inputValue(data));
    },
  };
  const inputValue = (data) => {
    if (data.jibunAddress === "") {
      return data.autoJibunAddress + data.buildingName;
    } else {
      return data.jibunAddress + data.buildingName;
    }
  };

  const postCodeStyle = {
    width: "400px",
    height: "300px",
  };

  return (
    <div>
      <DaumPostcode
        style={postCodeStyle}
        onComplete={handle.selectAddress}
        autoClose={false}
        defaultQuery=""
      />
    </div>
  );
};
export default PostCode;
