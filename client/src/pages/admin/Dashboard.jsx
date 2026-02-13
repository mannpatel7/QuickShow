import {
  ChartLineIcon,
  LucideIndianRupee,
  PlayCircleIcon,
  StarIcon,
  UsersIcon
} from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import Loading from "../../components/Loading";
import Title from "../../components/admin/title";
import BlurCircle from "../../components/BlurCircle";
import { dateFormat } from "../../lib/dateformat";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios, getToken, user } = useAppContext();
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    {
      title: "Total Bookings",
      value: dashboardData.totalBookings ?? 0,
      icon: ChartLineIcon
    },
    {
      title: "Total Revenue",
      value: `${currency}${Number(
        dashboardData.totalRevenue ?? 0
      ).toLocaleString()}`,
      icon: LucideIndianRupee
    },
    {
      title: "Active Movies",
      value: dashboardData.activeShows
        ? new Set(
            dashboardData.activeShows.map((show) => show.movie?._id)
          ).size
        : 0,
      icon: PlayCircleIcon
    },
    {
      title: "Total Users",
      value: dashboardData.totalUser ?? 0,
      icon: UsersIcon
    }
  ];

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${await getToken()}` }
      });

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error fetching dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const uniqueActiveShows = useMemo(() => {
    if (!dashboardData.activeShows) return [];
    const map = new Map();
    dashboardData.activeShows.forEach((show) => {
      if (show.movie && !map.has(show.movie._id)) {
        map.set(show.movie._id, show);
      }
    });
    return Array.from(map.values());
  }, [dashboardData.activeShows]);

  if (loading) return <Loading />;

  return (
    <>
      <Title text1="Admin" text2="Dashboard" />

      <div className="relative mt-6">
        <BlurCircle top="-100px" left="0" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-5 py-4 bg-primary/10 border border-primary/20 rounded-lg hover:-translate-y-1 transition duration-300"
            >
              <div>
                <h1 className="text-sm text-gray-400">{card.title}</h1>
                <p className="text-2xl font-semibold mt-1">
                  {card.value}
                </p>
              </div>
              <card.icon className="w-7 h-7 text-primary" />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-12 text-lg font-semibold">Active Movies</p>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <BlurCircle top="100px" left="-10%" />

        {uniqueActiveShows.length > 0 ? (
          uniqueActiveShows.map((show) => (
            <div
              key={show.movie._id}
              className="rounded-xl overflow-hidden bg-gray-900 border border-primary/20 hover:-translate-y-2 transition duration-300 shadow-lg"
            >
              <img
                src={show.movie?.poster_path}
                alt={show.movie?.title}
                className="h-60 w-full object-cover"
              />

              <div className="p-4 space-y-2">
                <p className="font-semibold truncate">
                  {show.movie?.title}
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-lg font-semibold">
                    {currency}{show.showPrice}
                  </p>

                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <StarIcon className="w-4 h-4 text-primary fill-primary" />
                    {show.movie?.vote_average
                      ? show.movie.vote_average.toFixed(1)
                      : "N/A"}
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  {dateFormat(show.showDateTime)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            No active movies available
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
