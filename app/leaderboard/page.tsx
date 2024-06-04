"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { getLeaderboard } from "./action";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface LeaderboardProp {
  avatar_url: string;
  username: string;
  rating: number;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardProp[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getLeaderboard({ page }).then((data) => setLeaderboard(data));
  }, [page]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
      setLeaderboard([]);
    }
  };

  const handleNext = () => {
    setPage(page + 1);
    setLeaderboard([]);
  };

  return (
    <div className="max-w-screen-lg mx-auto px-4 lg:px-0">
      <h1 className="text-2xl font-semibold mb-4 mt-4">Leaderboard</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Rank</TableHead>
            <TableHead className="w-[100px]">Avatar</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Rating</TableHead>
          </TableRow>
        </TableHeader>
        {leaderboard.length > 0 ? (
          <TableBody>
            {leaderboard.map((user, index) => (
              <TableRow key={user.username}>
                <TableCell>{(page - 1) * 20 + index + 1}</TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={user.avatar_url} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">
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
  );
}
