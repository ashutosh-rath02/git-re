/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

interface ContributionGraphProps {
  username: string;
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ username }) => {
  const graphUrl = `https://ghchart.rshah.org/${username}`;

  return (
    <div className="box border p-4 rounded-lg shadow-md bg-dark-500  flex flex-col mt-4 text-[#F8FAFC]">
      <h3 className="text-2xl font-semibold mb-4 text-left underline">
        Contribution Graph
      </h3>
      <Image
        width={100}
        height={100}
        src={graphUrl}
        alt="Contribution Graph"
        style={{ width: "100%", alignItems: "center", wordSpacing: "1rem" }}
      />
    </div>
  );
};

export default ContributionGraph;
