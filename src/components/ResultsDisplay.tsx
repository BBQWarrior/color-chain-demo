interface ResultsDisplayProps {
  results: string[];
}

export const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  return (
    <div>
      <h2>Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            Step {index + 1}: {result} {result}
          </li>
        ))}
      </ul>
    </div>
  );
};
