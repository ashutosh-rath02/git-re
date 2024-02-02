import React, { useEffect, useState } from "react";
import { fetchOrganizations, Organization } from "@/utils/resumeUtils";

interface OrganizationsProps {
  username: string;
}

const Organizations: React.FC<OrganizationsProps> = ({ username }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    const fetchAndSetOrganizations = async () => {
      try {
        const orgsData = await fetchOrganizations(username);
        setOrganizations(orgsData);
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
      }
    };

    fetchAndSetOrganizations();
  }, [username]);

  return (
    <div className="mt-5">
      <h2 className="text-2xl mb-4 text-left text-white">Organizations</h2>
      <ul className="list-disc px-4">
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
            <p className="text-white">
              {org.joinedYear}
              <br />
            </p>
            <p className="text-white">
              If you would like more information about this organization, please
              visit the
              <a
                href={`https://github.com/${org.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline ml-1"
              >
                organization page on GitHub.
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Organizations;
