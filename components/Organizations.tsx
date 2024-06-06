import React, { useEffect, useState } from "react";
import { fetchOrganizations, Organization } from "@/utils/resumeUtils";

interface OrganizationsProps {
  username: string;
  count: number;
  textColor: string;
}

const Organizations: React.FC<OrganizationsProps> = ({ username, count,textColor }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const fetchAndSetOrganizations = async () => {
      try {
        const orgsData = await fetchOrganizations(username);
        setOrganizations(orgsData.slice(0, count));
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
      }
    };

    fetchAndSetOrganizations();
  }, [username, count]);

  return (
    <div className="mt-5" style={{color:textColor}}>
      <h2 className="text-2xl font-bold underline mb-4 text-left ">
        Organizations
      </h2>
      <ul className="list-disc px-6">
        {organizations.map((org, index) => (
          <li key={index} className="mt-4">
            <a
              href={`https://github.com/${org.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-500 hover:underline cursor-pointer"
            >
              {org.name}
            </a>
            <p className="text-gray-400 text-sm">
              If you would like more information about this organization, please
              visit the
              <a
                href={`https://github.com/${org.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline ml-1"
              >
                organization page
              </a>
              &nbsp;on GitHub.
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Organizations;
