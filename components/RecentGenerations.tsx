"use client";
import axios from "axios";
import { HoverEffect } from "./ui/card-hover-effect";
import { useState, useEffect } from "react";
import type { UserData } from "@/types";

const RecentGenerations = () => {
  const [usersData, setUsersData] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get<UserData[]>("/api/users");
        setUsersData(data);
      } catch (error) {
        console.error(`error fetching the data ${error}`);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-8">
      <HoverEffect items={usersData} />
    </div>
  );
};

export default RecentGenerations;
