const fs = require("fs");
const xml2js = require("xml2js");
const { sortArray } = require("./utils/myUtils");
const { xmlFile } = require("./config");
const xml = fs.readFileSync(xmlFile);
(async () => {
  try {
    const result = await xml2js.parseStringPromise(xml, { mergeAttrs: true });
    const json = result.EntityType.Property;
    const name = result.EntityType.Name[0];

    const arr = [];
    json.forEach((val) => arr.push(val.Name[0]));
    arr.sort(sortArray);

    fs.writeFileSync(`./json/${name}.json`, JSON.stringify(arr));
  } catch (error) {
    console.log(error);
  }
})();
