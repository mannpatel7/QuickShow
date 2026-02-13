import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/title";
import { dateFormat } from "../../lib/dateformat";
import { useAppContext } from "../../context/AppContext";

const ListShows = () => {

  const {axios,getToken,user}=useAppContext();

  const currency = import.meta.env.VITE_CURRENCY;

  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllShows = async () => {
    try {
      const {data}=await axios.get("/api/admin/all-shows",{
        headers: {Authorization: `Bearer ${await getToken()}`}
      })
      setShows(data.shows)
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
   if(user) {
    getAllShows();
  }
  }, [user]);
  


  return !loading ?(
    <>
      <Title text1="List" text2="Shows" />
      <div className="mt-6 overflow-x-auto">
      <table className="w-full border-collapse rounded-md overflow-hidden text-nowrap">
        <thead>
          <tr className="bg-primary/20 text-left text-white">
            <th className="p-2 font-medium pl-5">Movie Name</th>
            <th className="p-2 font-medium">Show Time</th>
            <th className="p-2 font-medium">Total Bookings</th>
            <th className="p-2 font-medium">Earnings</th>
          </tr>
        </thead>
<tbody className="text-sm font-light">
  {shows.map((show) => (
    <tr key={show._id} className="border-b border-primary/10 bg-primary/5 even:bg-primary/10">
      <td className="p-2 min-w-45 pl-5">
        {show.movie?.title}
      </td>

      <td className="p-2">
        {dateFormat(show.showDateTime)}
      </td>

      <td className="p-2">
        {show.totalBookings ?? 0}
      </td>

      <td className="p-2">
        {currency}{show.totalEarnings ?? 0}
      </td>
    </tr>
  ))}
</tbody>
</table>
      
      </div>

    </>
  ):<Loading />
}
export default ListShows