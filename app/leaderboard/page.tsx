"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getLeaderboard } from "./action";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import Crown from "@/components/leaderboard/crown";

interface LeaderboardProp {
  avatar_url: string;
  username: string;
  rating: number;
  rank: number;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardProp[]>([]);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getLeaderboard({ page, searchQuery }).then((data) => {
      setMaxPage(data.maxPages);
      const usersWithRanks = data.data.map((user: any) => ({
        ...user,
        rank: user.rank[0].user_rank,
      }));
      setLeaderboard(usersWithRanks);
      setIsLoading(false);
    });
  }, [page, searchQuery]);

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
    setPage(1); // Reset to the first page on search
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
      setIsLoading(true);
    }
  };

  const handleNext = () => {
    if (page < maxPage) {
      setPage(page + 1);
      setIsLoading(true);
    }
  };

  return (
    <>
      <div className="max-w-screen-lg mx-auto px-4 lg:px-8 pt-12">
        <div className="justify-between items-center mb-20 mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <h1 className="text-2xl font-semibold">Leaderboard</h1>
          <div className="flex">
            <input
              type="text"
              placeholder="Search by username..."
              value={searchQuery}
              onChange={handleSearchInputChange}
              className="border border-gray-300 rounded-md py-2 px-4 align-items justify-end w-25 xs:w-50 sm:w-60 bg-gray-300 dark:bg-slate-800"
            />
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
          {isLoading ? (
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
          ) : leaderboard.length > 0 ? (
            <TableBody>
              {leaderboard.map((user) => (
                <TableRow key={user.username}>
                  <TableCell>{user.rank}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={user.avatar_url} />
                      <AvatarFallback>
                        {user.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium flex items-center">
                    <Crown rank={user.rank} />
                    <Link
                      href={`${process.env.NEXT_PUBLIC_URL}/resume/${user.username}`}
                    >
                      {user.username}
                    </Link>
                  </TableCell>
                  <TableCell>{user.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No results found
                </TableCell>
              </TableRow>
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
