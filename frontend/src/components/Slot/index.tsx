import React, { FC } from "react";
import styled from "styled-components";

const ItemContainer = styled.div`
  margin: 136px 100px;
`;

const para: any = styled.p;

const Content = para`
  background-color: #EDEBEB;
  width: 121px;
  padding: 5px 20px;
  border-radius: 8px;
  color: #47ddcb;
  font-weight: bold;
  border: 1px solid #47ddcb;
  text-align: center;
  margin:20px;
`;
const Title = styled.p`
  font-weight: bold;
  margin-bottom: 0px;
`;
const CardsContainer = styled.div`
  display: flex;
`;

export const getSlots = () => {
  var first = new Date();
  first.setHours(10, 0, 0, 0);
  var second = new Date();
  second.setHours(11, 0, 0, 0);
  return [first.getTime(), second.getTime()];
};

const Slot: FC = () => {
  return (
    <ItemContainer>
      <Title>Today’s Slot</Title>
      <CardsContainer>
        {getSlots().map((slot) => (
          <Content>
            {new Date(slot).getHours() +
              ":" +
              new Date(slot).getMinutes() +
              "0 AM"}
          </Content>
        ))}
      </CardsContainer>
    </ItemContainer>
  );
};

export default Slot;
