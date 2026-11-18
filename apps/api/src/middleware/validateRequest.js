function validateAnalysisRequest(req, res, next) {
  const { changedFiles, testFiles } = req.body || {};

  if (!Array.isArray(changedFiles) || !Array.isArray(testFiles)) {
    return res.status(400).json({
      success: false,
      message: "changedFiles and testFiles must both be arrays.",
    });
  }

  if (changedFiles.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one changed file is required.",
    });
  }

  const allFiles = [...changedFiles, ...testFiles];

  const invalidFile = allFiles.some(
    (file) =>
      typeof file !== "string" ||
      file.trim().length === 0 ||
      file.length > 500
  );

  if (invalidFile) {
    return res.status(400).json({
      success: false,
      message: "File paths must be non-empty strings under 500 characters.",
    });
  }

  if (changedFiles.length > 100 || testFiles.length > 500) {
    return res.status(400).json({
      success: false,
      message: "Too many files submitted for analysis.",
    });
  }

  next();
}

module.exports = { validateAnalysisRequest };