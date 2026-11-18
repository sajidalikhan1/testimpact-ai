const { analyzeChanges } = require("../services/analysis.service");

function runAnalysis(req, res, next) {
  try {
    const result = analyzeChanges(req.body);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { runAnalysis };