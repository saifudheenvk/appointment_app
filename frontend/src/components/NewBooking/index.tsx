import React, { FC, useState } from "react";
import styled from "styled-components";
import { getSlots } from "../Slot";
import { ToastContainer, toast } from "react-toastify";
import { toastStyle } from "../Login";
import BookingCalls from "../../actions/Booking/BookingAction";

const ItemContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Container = styled.div`
  display: flex;
  margin-top: 136px;
`;

const ExtraContent = styled.div`
  flex: 1;
`;
const ExtraContent2 = styled.div`
  flex: 0.2;
`;

const Title = styled.p`
  font-weight: bold;
  flex: 0.5;
  margin-top: 6px;
`;

const Content = styled.form`
  flex: 1;
`;

const Select = styled.select`
  background: #FFFFFF;
  border: 1px solid #47DDCB;
  1px solid #47DDCB;
  border-radius: 4px;
  -moz-appearance: none;
  flex: 0.8;
  height:35px;
`;

const DatePicker = styled.input`
background: #FFFFFF;
border: 1px solid #47DDCB;
1px solid #47DDCB;
border-radius: 4px;
height:35px;
-moz-appearance: none;
flex: 0.8;
padding-left:6px;
`;

const Availability = styled.p`
  background-color: #fff;
  width: 183px;
  padding: 5px 0px;
  border-radius: 8px;
  color: #47ddcb;
  border: 1px solid #47ddcb;
  text-align: center;
  margin: 10% 13%;
  font-weight: bold;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
`;
const Button = styled.p`
  background-color: #47ddcb;
  width: 80px;
  padding: 5px 20px;
  border-radius: 8px;
  color: #ffff;
  font-weight: bold;
  text-align: center;
  margin: 0px 0px 0px 20%;
  cursor: pointer;
`;

const NewBooking: FC = () => {
  const [date, setDate] = useState<string>("");
  const [time, setTimes] = useState<any>(getSlots()[0]);

  const isCorrectFormat = () => {
    const selectedDate = new Date(date);
    const dateParts = date.split("-");
    if (
      Object.prototype.toString.call(selectedDate) === "[object Date]" &&
      dateParts[0].length === 4 &&
      dateParts[1].length === 2 &&
      dateParts[2].length === 2
    ) {
      selectedDate.setMinutes(0);
      if (time) selectedDate.setHours(new Date(time).getHours());
      else selectedDate.setHours(10);
      return { selectedDate, correctFormat: true };
    }
    return { selectedDate, correctFormat: false };
  };
  return (
    <Container>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ExtraContent />{" "}
      <Content>
        <ItemContainer>
          <Title>Select Date :</Title>
          <DatePicker
            onChange={(e) => {
              setDate(e.target.value);
            }}
            type="text"
            required
            name="input"
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            title="Enter a date in this format YYYY-MM-DD"
          />
          <ExtraContent2 />
        </ItemContainer>
        <ItemContainer>
          <Title>Select Time :</Title>
          <Select
            value={time}
            onChange={(e) => {
              setTimes(e.target.value);
            }}
          >
            {getSlots().map((item) => (
              <option value={item} style={{ background: "#fff" }}>
                {new Date(item).getHours() +
                  ":" +
                  new Date(item).getMinutes() +
                  "0 AM"}
              </option>
            ))}
          </Select>
          <ExtraContent2 />
        </ItemContainer>
        <Availability
          onClick={() => {
            const { selectedDate, correctFormat } = isCorrectFormat();
            if (correctFormat) {
              console.log(selectedDate);
              BookingCalls.getTodaysAvailability(selectedDate.getTime()).then(
                (response) => {
                  toast(response.data, toastStyle);
                }
              );
            } else {
              toast("Choose the correct date format", toastStyle);
            }
          }}
        >
          Check Availability
        </Availability>
        <Button
          onClick={() => {
            const { selectedDate, correctFormat } = isCorrectFormat();
            if (correctFormat) {
              BookingCalls.addNewBooking({
                userId: localStorage.getItem("userId"),
                date: selectedDate.getTime(),
              }).then((response) => {
                toast(response.statusText, toastStyle);
              });
            } else {
              toast("Choose the correct date format", toastStyle);
            }
          }}
        >
          Book
        </Button>
      </Content>
      <ExtraContent />
    </Container>
  );
};

export default NewBooking;
