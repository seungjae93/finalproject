import React from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import axios from "axios";

const TotalReview = ({ estateIdData }) => {
  const { isLoading, isError, data, error } = useQuery(
    ["showReview", estateIdData],
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_MAP_SERVER}/review/items/${estateIdData.estateId}`
      );
      const { data } = response.data;
      return data;
    }
  );
  console.log(data);

  return (
    <>
      <StModalContainer>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </StModalContainer>
    </>
  );
};

export default TotalReview;

const StModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
