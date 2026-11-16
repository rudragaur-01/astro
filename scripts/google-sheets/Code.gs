/**
 * Divine Trinetra website content — Google Apps Script for the content sheet.
 *
 * Install: Extensions → Apps Script, paste this file, then in
 * Project Settings → Script properties add:
 *   CMS_SECRET  the same value as CMS_SECRET on the website
 * Reload the sheet to see the "Website" menu.
 *
 * Everyday tabs: Consultations, Shop, Home page, Reviews & FAQs.
 * Occasional: Contact & brand, Images, Website settings.
*/

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Website")
    .addItem("Publish changes", "publishChanges")
    .addSeparator()
    .addItem("Set up tabs (website team)", "setUpTabs")
    .addItem("Refresh tabs, keeping published content (website team)", "refreshAllTabs")
    .addItem("Rebuild all tabs from website code (website team)", "rebuildAllTabs")
    .addToUi();
}

function getConfig_() {
  const props = PropertiesService.getScriptProperties();
  const siteUrl = props.getProperty("SITE_URL");
  const secret = props.getProperty("CMS_SECRET");
  if (!siteUrl || !secret) {
    throw new Error("Add SITE_URL and CMS_SECRET in Extensions → Apps Script → Project Settings → Script properties.");
  }
  return { siteUrl: siteUrl.replace(/\/$/, ""), secret: secret };
}

// ngrok's free tier needs this header; it has no effect on other hosts.
function requestHeaders_(config) {
  return { "x-cms-secret": config.secret, "ngrok-skip-browser-warning": "true" };
}

function publishChanges() {
  const ui = SpreadsheetApp.getUi();
  const config = getConfig_();
  const res = UrlFetchApp.fetch(config.siteUrl + "/api/cms/publish", {
    method: "post",
    headers: requestHeaders_(config),
    muteHttpExceptions: true,
  });
  const code = res.getResponseCode();
  if (code !== 200) {
    ui.alert(
      "Not published",
      "The website did not accept the update (code " + code + "). Check SITE_URL in Script properties, or contact the website team.",
      ui.ButtonSet.OK
    );
    return;
  }

  var warnings = [];
  try {
    var body = JSON.parse(res.getContentText());
    if (body.warnings && body.warnings.length) warnings = body.warnings;
  } catch (e) {}

  if (warnings.length) {
    ui.alert(
      "Published, with notes",
      "Your other changes will appear within a minute.\n\nThese rows were skipped:\n• " + warnings.join("\n• "),
      ui.ButtonSet.OK
    );
  } else {
    ui.alert("Published", "Your changes will appear on the website within a minute.", ui.ButtonSet.OK);
  }
}

function fetchTemplate_(query) {
  const config = getConfig_();
  const res = UrlFetchApp.fetch(config.siteUrl + "/api/cms/template" + (query || ""), {
    headers: requestHeaders_(config),
    muteHttpExceptions: true,
  });
  if (res.getResponseCode() !== 200) {
    SpreadsheetApp.getUi().alert("The website returned code " + res.getResponseCode() + ".");
    return null;
  }
  return JSON.parse(res.getContentText()).tabs;
}

function refreshAllTabs() {
  replaceAllTabs_(
    "Refresh all tabs?",
    "Every website tab will be rewritten with the content currently published on the website. Publish first: unpublished edits will be lost.",
    ""
  );
}

function rebuildAllTabs() {
  replaceAllTabs_(
    "Rebuild all tabs?",
    "Every website tab will be replaced with the simplified layout from the website code. Edits made in this sheet will be lost.",
    "?from=code"
  );
}

function replaceAllTabs_(title, message, query) {
  const ui = SpreadsheetApp.getUi();
  if (ui.alert(title, message, ui.ButtonSet.OK_CANCEL) !== ui.Button.OK) return;

  const tabs = fetchTemplate_(query);
  if (!tabs) return;

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const keepTitles = {};
  tabs.forEach(function (tab) {
    keepTitles[tab.title] = true;
  });

  tabs.forEach(function (tab, index) {
    let sheet = spreadsheet.getSheetByName(tab.title);
    if (sheet) {
      resetTab_(sheet);
    } else {
      sheet = spreadsheet.insertSheet(tab.title);
    }
    writeTab_(sheet, tab);
    spreadsheet.setActiveSheet(sheet);
    spreadsheet.moveActiveSheet(index + 1);
  });

  // Remove old numbered tabs (1. Brand…, 5a. Service List, etc.) left behind.
  spreadsheet.getSheets().forEach(function (sheet) {
    if (!keepTitles[sheet.getName()] && spreadsheet.getSheets().length > 1) {
      spreadsheet.deleteSheet(sheet);
    }
  });

  ui.alert(
    "Done",
    "Updated " + tabs.length + " tabs.\n\nEveryday: Consultations, Shop, Home page, Reviews & FAQs.\nThen click Website → Publish changes.",
    ui.ButtonSet.OK
  );
}

function resetTab_(sheet) {
  sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(function (p) {
    p.remove();
  });
  sheet.showColumns(1, sheet.getMaxColumns());
  sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).clearDataValidations();
  sheet.clear();
}

function setUpTabs() {
  const ui = SpreadsheetApp.getUi();
  const tabs = fetchTemplate_();
  if (!tabs) return;

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const created = [];
  const skipped = [];

  tabs.forEach(function (tab) {
    const existing = spreadsheet.getSheetByName(tab.title);
    if (existing && existing.getLastRow() > 0) {
      skipped.push(tab.title);
      return;
    }
    const sheet = existing || spreadsheet.insertSheet(tab.title);
    writeTab_(sheet, tab);
    created.push(tab.title);
  });

  ui.alert(
    "Set up complete",
    "Created: " + (created.join(", ") || "none") + "\nLeft unchanged: " + (skipped.join(", ") || "none"),
    ui.ButtonSet.OK
  );
}

function writeTab_(sheet, tab) {
  const rows = tab.rows;
  const width = rows[0].length;
  const range = sheet.getRange(1, 1, rows.length, width);

  range.setNumberFormat("@").setValues(rows).setWrap(true).setVerticalAlignment("top");
  sheet.getRange(1, 2, 1, 1).setFontSize(14).setFontWeight("bold");
  sheet.getRange(1, 1, 2, width).setWrap(true);
  sheet.setColumnWidths(2, width - 1, 260);
  sheet.setRowHeight(2, 60);

  tab.headerRows.forEach(function (row) {
    sheet.getRange(row, 1, 1, width).setFontWeight("bold").setBackground("#efe6d8");
    sheet.getRange(row - 1, 2).setFontWeight("bold").setFontSize(12);
  });

  tab.validations.forEach(function (v) {
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(v.values, true)
      .setAllowInvalid(Boolean(v.allowOther))
      .setHelpText(v.allowOther ? "Pick a picture, or paste a direct https:// image link." : "Pick a value from the list.")
      .build();
    sheet.getRange(v.row, v.column).setDataValidation(rule);
  });

  sheet.hideColumns(1);
  const protection = sheet.getRange(1, 1, rows.length, 1).protect();
  protection.setDescription("Website keys — leave this column alone.");
  protection.setWarningOnly(true);
}
