/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

interface ContributionGraphProps {
  username: string;
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ username }) => {
  const graphUrl = `https://ghchart.rshah.org/${username}`;

  return (
    <div className="box border p-4 rounded-lg shadow-md bg-dark-500 text-white flex flex-col mt-4">
      <h3 className="text-lg font-semibold mb-4 text-center">
        Contribution Graph
      </h3>
      <img
        src={graphUrl}
        alt="Contribution Graph"
        style={{ width: "100%", alignItems: "center", wordSpacing: "1rem" }}
      />
    </div>
  );
};

export default ContributionGraph;
