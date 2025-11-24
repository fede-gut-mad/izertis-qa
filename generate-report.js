const reporter = require("multiple-cucumber-html-reporter");
const os = require("os");

reporter.generate({
  jsonDir: "reports", // donde está report.json
  reportPath: "reports/html", // carpeta de salida del HTML
  reportName: "Izertis QA - Cucumber Report",
  pageTitle: "Izertis QA Automation Report",
  displayDuration: true,
  hideMetadata: false,
  metadata: {
    browser: {
      name: process.env.BROWSER || "chromium",
      version: "latest",
    },
    device: "Local machine",
    platform: {
      name: os.platform(),
      version: os.release(),
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Izertis QA Technical Test" },
      { label: "Execution Date", value: new Date().toISOString() },
    ],
  },
});
