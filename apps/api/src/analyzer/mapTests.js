function normalizePath(filePath) {
  return filePath
    .replace(/\\/g, "/")
    .replace(/^\.\/+/, "")
    .toLowerCase();
}

function getFileName(filePath) {
  const parts = normalizePath(filePath).split("/");
  return parts[parts.length - 1];
}

function getFileNameWithoutExtension(filePath) {
  return getFileName(filePath).replace(/\.[^.]+$/, "");
}

function mapTests(changedFiles, testFiles) {
  return testFiles.map((testFile) => {
    const normalizedTest = normalizePath(testFile);
    const testName = getFileNameWithoutExtension(testFile);

    const matchedFiles = changedFiles.filter((changedFile) => {
      const normalizedChanged = normalizePath(changedFile);
      const changedName = getFileNameWithoutExtension(changedFile);

      const sameName =
        changedName === testName ||
        testName === `${changedName}.test` ||
        testName === `${changedName}.spec`;

      const relatedDirectory =
        normalizedTest.includes(
          normalizedChanged.replace(/\.[^.]+$/, "")
        );

      return sameName || relatedDirectory;
    });

    return {
      testFile,
      matchedFiles,
      isAffected: matchedFiles.length > 0,
    };
  });
}

module.exports = mapTests;