import ExcelJS from 'exceljs';
import path from 'path';

/**
 * Generates an Excel report for a test case.
 * @param {Object} options
 * @param {string} options.module - Module name
 * @param {string} options.tcId - Test case ID
 * @param {string} options.scenario - Test case scenario/description
 * @param {string} options.result - 'PASS' or 'FAIL'
 * @param {string} options.screenshotDir - Directory containing screenshots
 * @param {string} options.errorMsg - Error message (if any)
 * @param {string} [options.outputFile] - Output Excel file path
 */
export async function generateExcelReport({
  module,
  tcId,
  scenario,
  result,
  screenshotDir,
  outputFile = path.resolve(screenshotDir, `${tcId}_TestResult.xlsx`)
}) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Test Results');
  sheet.addRow(['Module', 'TC ID', 'Test Case Scenario', 'Timestamp', 'Result', 'Screenshot']);
  sheet.addRow([
    module,
    tcId,
    scenario,
    new Date().toLocaleString(),
    result,
    screenshotDir
  ]);
  await workbook.xlsx.writeFile(outputFile);
}
