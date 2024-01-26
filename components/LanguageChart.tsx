import React from "react";
import { Language } from "../types";

interface LanguageBarChartProps {
  languages: Language[] | undefined;
}

const LanguageBarChart: React.FC<LanguageBarChartProps> = ({ languages }) => {
  const hasLanguages = Array.isArray(languages) && languages.length > 0;

  return (
    <div className="box border p-4 rounded-lg shadow-md bg-dark-500 text-white">
      <h2 className="text-lg font-bold mb-2">Most Used Languages</h2>
      <div className="space-y-2">
        {hasLanguages ? (
          languages.map((language) => (
            <div key={language.name} className="flex items-center space-x-2">
              <a
                href={language.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between"
                style={{ textDecoration: "none" }}
              >
                <span className="flex-1 truncate">{language.name}</span>
                <div className="bg-gray-700 flex-1 rounded h-4 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-400 to-blue-600 h-full"
                    style={{ width: `${language.percent}%` }}
                  ></div>
                </div>
                <span className="w-20 text-right">
                  {language.percent.toFixed(2)}%
                </span>
              </a>
            </div>
          ))
        ) : (
          <p>No language data available.</p>
        )}
      </div>
    </div>
  );
};

export default LanguageBarChart;
