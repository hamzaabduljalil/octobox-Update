const fs = require("fs");
const path = require("path");
const { modelName, fields } = require("./modelConfig"); // Import modelName and fields

function generateModel(modelName, fields) {
  const className = modelName.charAt(0).toUpperCase() + modelName.slice(1);

  // Standard imports
  const imports = `
import BaseModel from "./BaseObject";
import File from "./File";
import { MultiLangs } from "./Interfaces/MultiLangs";
`;

  // Private fields
  const privateFields = fields.map(
    (field) => `  private _${field.name}: ${field.type} = ${field.default};`
  );

  // Getters and Setters
  const gettersAndSetters = fields.map(
    (field) => `
  get ${field.name}(): ${field.type} {
    return this._${field.name};
  }
  set ${field.name}(value: ${field.type}) {
    this._${field.name} = value;
  }`
  );

  // toPlainObject Method
  const toPlainObjectMethod = `
  override toPlainObject(): any {
    return {
      ...super.toPlainObject(),
${fields
  .map((field) => {
    if (field.type === "Date") {
      return `      ${field.name}: this._${field.name},`;
    }
    return field.isNested
      ? `      ${field.name}: this._${field.name}?.toPlainObject(),`
      : `      ${field.name}: this._${field.name},`;
  })
  .join("\n")}
    };
  }`;

  // fromJSON Method
  const fromJSONMethod = `
  static override fromJSON(json: any): ${className} {
    const obj = super.fromJSON(json) as ${className};
${fields
  .map((field) => {
    if (field.type === "Date") {
      return `    obj._${field.name} = json.${field.name} ? new Date(json?.${field.name}?.iso || json.${field.name}) : new Date();`;
    }
    if (field.type.startsWith("File")) {
      return `    obj._${field.name} = json.${field.name} ? File.fromJSON(json.${field.name}) : new File();`;
    }
    if (field.type === "object" || field.isNested) {
      return `    obj._${field.name} = typeof json.${field.name} === "object" && json.${field.name} !== null 
      ? JSON.parse(JSON.stringify(json.${field.name})) 
      : json.${field.name} || {};`;
    }
    return `    obj._${field.name} = json.${field.name} || ${field.default};`;
  })
  .join("\n")}
    return obj;
  }`;

  // Combine everything
  return `${imports}

export default class ${className} extends BaseModel {
${privateFields.join("\n")}

${gettersAndSetters.join("\n")}

${toPlainObjectMethod}

${fromJSONMethod}
}`;
}

function saveModelToFile(modelName, modelCode, outputDir) {
  const filePath = path.join(outputDir, `${modelName}.ts`);

  // Check if the file already exists
  if (fs.existsSync(filePath)) {
    const backupPath = path.join(
      outputDir,
      `${modelName}_backup_${Date.now()}.ts`
    );
    fs.copyFileSync(filePath, backupPath); // Create a backup
    console.log(`Backup created: ${backupPath}`);
  }

  // Write the file (overwrite or create new)
  fs.writeFileSync(filePath, modelCode, "utf-8");
  console.log(`Model "${modelName}" has been generated at ${filePath}`);
}

// Define the output directory
const outputDir = "./src/app/models"; // Ensure this directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate and save the model
const modelCode = generateModel(modelName, fields);
saveModelToFile(modelName, modelCode, outputDir);
