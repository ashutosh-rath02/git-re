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

interface LeaderboardProp {
  avatar_url: string;
  username: string;
  rating: number;
}

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardProp[]>([]);

  useEffect(() => {
    getLeaderboard({}).then((data) => setLeaderboard(data));
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Leaderboard</h1>
      <Table>
        <TableCaption>A list of users of git-re.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Rank</TableHead>
            <TableHead className="w-[100px]">Avatar</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboard.map((user, index) => (
            <TableRow key={user.username}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">
                <Link href={`${process.env.NEXT_PUBLIC_URL}${user.username}`}>
                  {user.username}
                </Link>
              </TableCell>
              <TableCell>{user.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
