function calculateRisk(changedFiles, testResults) {
  const totalChangedFiles = changedFiles.length;

  const affectedTests = testResults.filter(
    (test) => test.isAffected
  );

  const unmatchedFiles = changedFiles.filter((changedFile) => {
    return !affectedTests.some((test) =>
      test.matchedFiles.includes(changedFile)
    );
  });

  let score = 20;

  score += totalChangedFiles * 10;
  score += unmatchedFiles.length * 15;

  if (affectedTests.length === 0) {
    score += 20;
  }

  score = Math.min(score, 100);

  let level = "Low";

  if (score >= 70) {
    level = "High";
  } else if (score >= 40) {
    level = "Medium";
  }

  return {
    score,
    level,
    totalChangedFiles,
    affectedTestCount: affectedTests.length,
    unmatchedFileCount: unmatchedFiles.length,
  };
}

module.exports = calculateRisk;