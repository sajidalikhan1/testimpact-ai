function explainRisk(risk, testResults) {
  const explanations = [];

  explanations.push(
    `${risk.totalChangedFiles} source file(s) were  submitted for analysis.`
  );

  explanations.push(
    `${risk.affectedTestCount} potentially affected test file(s) were identified.`
  );

  if (risk.unmatchedFileCount > 0) {
    explanations.push(
      `${risk.unmatchedFileCount} changed file(s) could not be mapped to a test.`
    );
  }

  if (risk.affectedTestCount === 0) {
    explanations.push(
      "No related tests were identified. Review the test coverage manually."
    );
  }

  if (risk.level === "High") {
    explanations.push(
      "Prioritise reviewing this change and running the recommended tests."
    );
  } else if (risk.level === "Medium") {
    explanations.push(
      "Review the affected areas and run the identified tests."
    );
  } else {
    explanations.push(
      "The initial heuristic indicates lower risk, but tests should still be run."
    );
  }

  const recommendations = testResults
    .filter((test) => test.isAffected)
    .map((test) => test.testFile);

  return {
    explanations,
    recommendations,
  };
}

module.exports = explainRisk;