import fs from "fs";
import { convertPathStringToJson } from "./convertPathsToJson"
export function outputPathFiles(inputPath: string, outputPath: string) {
    let fileString: string = fs.readFileSync(inputPath, "utf8")
    let pathsArray: string[] = fileString.split("<path")
    pathsArray.shift()
    pathsArray.pop()

    for (let pathIndex in pathsArray)
        fs.writeFileSync(outputPath + `path_${pathIndex}.svg`, `<path ${pathsArray[pathIndex]}`)

    for (let pathIndex in pathsArray)
        fs.writeFileSync(outputPath + `path_${pathIndex}.json`, convertPathStringToJson(pathsArray[pathIndex]))

}