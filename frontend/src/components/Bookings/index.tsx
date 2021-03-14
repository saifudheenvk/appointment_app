import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { IUserDetails } from "../Dashboard";
import { useSelector } from "react-redux";
import BookingCalls from "../../actions/Booking/BookingAction";

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

const Table = styled.table`
  background: #eeeeee;
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
`;

interface THProps {
  border: string;
}

const th: any = styled.th;

const Header = th`
  padding: 8px;
  border-right:${(props: THProps) => props.border}
`;

const td: any = styled.td;

const Data = td`
  max-width:200px;
  border-right:${(props: THProps) => props.border};
  text-align:center;
  border-top:1px solid;
`;

var monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Bookings: FC = () => {
  const [headings, setHeadings] = useState<string[]>([]);
  const [tableContents, setTableContents] = useState([]);
  const user: IUserDetails = useSelector((state: any) => state.userReducer);
  const getAdminContent = () => {
    BookingCalls.getTodaysBookings(new Date().getTime()).then((response) => {
      if (response.data) {
        setTableContents(response.data);
      }
    });
  };
  const getUserContent = () => {
    BookingCalls.getMyBookings(localStorage.getItem("userId")).then(
      (response) => {
        if (response.data) {
          setTableContents(response.data);
        }
      }
    );
  };
  useEffect(() => {
    if (user.userType === "ADMIN") {
      setHeadings(["S. No", "Booking ID", "Name", "Email", "Time"]);
      getAdminContent();
    } else {
      setHeadings(["S. No", "Booking ID", "Date", "Time"]);
      getUserContent();
    }
  }, []);

  useEffect(() => {
    console.log(tableContents);
  }, [tableContents.length]);

  const getTime = (val: Date) => {
    let hour = val.getHours();
    let isAm = true;
    if (hour > 12) {
      hour = hour - 12;
      isAm = false;
    }
    let h = hour.toString();
    let min = val.getMinutes().toString();
    return `${h.length === 1 ? "0" + h : h}:${
      min.length === 1 ? "0" + min : min
    } ${isAm ? "AM" : "PM"}`;
  };
  return (
    <ItemContainer>
      <Title>
        {!window.location.href.includes("admin")
          ? "My Bookings"
          : "Today’s Bookings"}
      </Title>
      <Table>
        <tr>
          {headings.map((h, i) => (
            <Header border={i !== headings.length - 1 ? "1px solid black" : ""}>
              {h}
            </Header>
          ))}
        </tr>
        {tableContents.length
          ? tableContents.map((content: any, i) => {
              const date = new Date(content.date);
              return (
                <tr key={i}>
                  <Data border="1px solid black">{i}</Data>
                  <Data border="1px solid black">{content._id}</Data>
                  {user.userType === "USER" && (
                    <Data border="1px solid black">{`${date.getDate()} ${
                      monthNames[date.getMonth() - 1]
                    } ${date.getFullYear()}`}</Data>
                  )}
                  {user.userType === "ADMIN" && (
                    <>
                      <Data border="1px solid black">{content.name}</Data>
                      <Data border="1px solid black">{content.email}</Data>
                    </>
                  )}
                  <Data border="">{getTime(date)}</Data>
                </tr>
              );
            })
          : null}
      </Table>
    </ItemContainer>
  );
};

export default Bookings;
