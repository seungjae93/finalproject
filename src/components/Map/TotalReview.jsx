import React from "react";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import axios from "axios";

const TotalReview = ({ estateId }) => {
  const { isLoading, isError, data, error } = useQuery(
    ["todos", estateId],
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API_MAP_SERVER}/review/items/${estateId}`,
        { estateId: estateId }
      );
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  return (
    <>
      <StModalContainer>x</StModalContainer>
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
