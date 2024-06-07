import { IconCrown } from "@tabler/icons-react";
import React from "react";

export default function Crown({ rank }: { rank: number }) {
  let crownColor;

  switch (rank) {
    case 1:
      crownColor = "text-yellow-400";
      break;
    case 2:
      crownColor = "text-gray-600 dark:text-gray-200";
      break;
    case 3:
      crownColor = "text-yellow-700";
      break;
    default:
      crownColor = "text-transparent"; // hides the crown if the rank is not 1, 2, or 3
  }

  return (
    <div>
      <IconCrown className={`${crownColor} mr-2`} />
    </div>
  );
}
