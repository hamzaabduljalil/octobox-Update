// modelConfig.js

const modelName = "CourseProgram"; // Adjust as needed
const fields = [
  { name: "name", type: "MultiLangs", default: "{}", isNested: false },
  // { name: "brief", type: "MultiLangs", default: "{}", isNested: false },

  { name: "createdBy", type: "User", default: "new User()", isNested: true },
  // // { name: "birthDate", type: "Date", default: "new Date()", isNested: false },
  // { name: "viewMobile", type: "boolean", default: "false", isNested: false },
  { name: "code", type: "string", default: "''", isNested: false },

  // { name: "viewWeb", type: "boolean", default: "false", isNested: false },
  // // { name: "viewMobile", type: "boolean", default: "false", isNested: false },
  // { name: "pdf", type: "File", default: "new File()", isNested: true },
];

module.exports = { modelName, fields };
