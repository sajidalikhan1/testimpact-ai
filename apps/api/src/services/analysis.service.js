const mapTests = require("../analyzer/mapTests");
const calculateRisk = require("../analyzer/calculateRisk");
const explainRisk = require("../analyzer/explainRisk");

function analyzeChanges({ changedFiles, testFiles }) {
  const testResults = mapTests(changedFiles, testFiles);

  const risk = calculateRisk(changedFiles, testResults);

  const explanation = explainRisk(risk, testResults);

  return {
    summary: {
      message: "Code change analysis completed successfully.",
      riskScore: risk.score,
      riskLevel: risk.level,
    },

    metrics: {
      totalChangedFiles: risk.totalChangedFiles,
      totalTestFiles: testFiles.length,
      affectedTestCount: risk.affectedTestCount,
      unmatchedFileCount: risk.unmatchedFileCount,
    },

    changedFiles,

    testResults,

    explanation,
  };
}

module.exports = { analyzeChanges };