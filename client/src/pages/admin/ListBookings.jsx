import React, { useEffect, useState } from "react";
import { dummyBookingData } from "../../assets/assets";
import Loading from "../../components/Loading";
import Title from "../../components/admin/title";
import { dateFormat } from "../../lib/dateformat";
import { useAppContext } from "../../context/AppContext";

const ListBookings = () => {

const {axios,getToken,user}=useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const getALLBookings=async ()=>{
    try {
      const {data}=await axios.get("/api/admin/all-bookings",{
        headers: {Authorization: `Bearer ${await getToken()}`}
      })
      setBookings(data.bookings)
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  useEffect(() => {
    if(user){
      getALLBookings();
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <>
    
      <Title text1="List" text2="Bookings" />

      <div className="w-full mt-6 overflow-x-auto">
        <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
          {/* TABLE HEADER */}
          <thead>
            <tr className="bg-[color:var(--color-primary)/0.2] text-left text-white">
              <th className="p-3 pl-5 font-medium">User Id</th>
              <th className="p-3 font-medium">Movie Name</th>
              <th className="p-3 font-medium">Show Time</th>
              <th className="p-3 font-medium">Seats</th>
              <th className="p-3 font-medium">Amount</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody className="text-sm font-light text-white">
            {bookings.map((item) => (
              <tr
                key={item._id}
                className="
                  border-b border-[color:var(--color-primary)/0.2]
                  bg-[color:var(--color-primary)/0.05]
                  even:bg-[color:var(--color-primary)/0.1]
                "
              >
                <td className="p-3 pl-5">
                  {item.user}
                </td>

                <td className="p-3">
                  {item.show.movie.title}
                </td>

                <td className="p-3">
                  {dateFormat(item.show.showDateTime)}
                </td>

                <td className="p-3">
                  {item.bookedSeats.join(", ")}
                </td>

                <td className="p-3">
                  {currency} {item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListBookings;
