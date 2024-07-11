"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../components/ui/pagination";

import { getLeaderboard } from "./action";
import { Avatar, AvatarImage, AvatarFallback } from "../../components/ui/avatar";
import Link from "next/link";
import { Skeleton } from "../../components/ui/skeleton";
import Crown from "../../components/leaderboard/crown";


interface LeaderboardProp {
  avatar_url: string;
  username: string;
  rating: number;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardProp[]>([]);
  const [filteredLeaderboard, setFilteredLeaderboard] = useState<
    LeaderboardProp[]
  >([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getLeaderboard({ page }).then((data) => {
      setMaxPage(data.maxPages);
      setLeaderboard(data.data);
      setFilteredLeaderboard(data.data); // Initialize filtered leaderboard with all data
    });
  }, [page]);

  // Function to handle search input change
  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
    filterLeaderboard(event.target.value);
  };

  // Function to filter leaderboard based on search query
  const filterLeaderboard = (query: string) => {
    if (query.trim() === "") {
      setFilteredLeaderboard(leaderboard); // Reset to show all data if query is empty
    } else {
      const filteredData = leaderboard.filter((user) =>
        user.username.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredLeaderboard(filteredData);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
      setLeaderboard([]);
    }
  };

  const handleNext = () => {
    if (page < maxPage) {
      setPage(page + 1);
      setLeaderboard([]);
    }
  };

  return (
    <>
      <div className="max-w-screen-lg mx-auto px-4 lg:px-0">
        <div className="flex justify-between items-center mb-4 mt-4">
          <h1 className="text-2xl font-semibold">Leaderboard</h1>
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by username..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="border border-gray-300 rounded-md py-2 px-4 w-64 max-w-xs bg-gray-300 dark:bg-slate-800"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 cursor-pointer"
                aria-hidden="true"
              >
                <path
                  d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Rank</TableHead>
              <TableHead className="w-[100px]">Avatar</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          {filteredLeaderboard.length > 0 ? (
            <TableBody>
              {filteredLeaderboard.map((user, index) => {
                const overallRank = (page - 1) * 20 + index + 1;
                return (
                  <TableRow key={user.username}>
                    <TableCell>{overallRank}</TableCell>
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback>
                          {user.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium flex items-center">
                      <Crown rank={overallRank} />
                      <Link
                        href={`${process.env.NEXT_PUBLIC_URL}/resume/${user.username}`}
                      >
                        {user.username}
                      </Link>
                    </TableCell>
                    <TableCell>{user.rating}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          ) : (
            <TableBody>
              {Array.from({ length: 5 }, (_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-[100px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[250px]" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-[250px]" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        <Pagination className="mt-5">
          <PaginationPrevious
            onClick={handlePrevious}
            className="cursor-pointer select-none"
          >
            Previous
          </PaginationPrevious>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink>{page}</PaginationLink>
            </PaginationItem>
          </PaginationContent>

          <PaginationNext
            onClick={handleNext}
            className="cursor-pointer select-none"
          >
            Next
          </PaginationNext>
        </Pagination>
      </div>
    </>
  );

}
