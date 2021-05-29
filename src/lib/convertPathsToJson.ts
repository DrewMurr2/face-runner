import fs from "fs"
import { SVG_C, SVG_L, SVG_Path, SVG_Section } from "src/types/path"

export function convertPathStringToJson(pathString: string): string {
    let getProperty = (propertyName: string) => pathString.split(propertyName + "=").pop().split('"')[1]


    let id = getProperty("id")
    let d = getProperty("d")
    let stroke = getProperty("stroke")
    let fill = getProperty("fill")
    let fillRule = getProperty("fill-rule")
    let sections: SVG_Section[] = []

    let isLetter = new RegExp(/^[A-Z]+$/i);
    let isNumberPattern = new RegExp('^[0-9]$')
    let isNumber = (s: string) => s === "." || isNumberPattern.test(s)
    let currentSection: SVG_Section

    for (let i = 0; i < d.length; i++) {

        //Skips blanks and line breaks ect
        while (i < d.length && !isNumber(d[i]) && !isLetter.test(d[i])) {
            i++
        }


        let getNextNumber = (): number => {
            let newNextNumberString: string = ''
            while (!isNumber(d[i]) && i < d.length)
                i++
            while (isNumber(d[i]) && i < d.length) {
                newNextNumberString += d[i]
                i++
            }
            return +newNextNumberString as number
        }

        if (d[i] === "M") {
            currentSection = {
                M: { x: getNextNumber(), y: getNextNumber() },
                Pieces: []
            }
            sections.push(currentSection)
        } else if (d[i] === "C") {
            let currentC: SVG_C = {
                x1: getNextNumber(),
                y1: getNextNumber(),
                x2: getNextNumber(),
                y2: getNextNumber(),
                x3: getNextNumber(),
                y3: getNextNumber()
            }
            currentSection.Pieces.push({ C: currentC })
        } else if (d[i] === "L") {
            let currentL: SVG_L = {
                segments: []
            }

            let getNextLineSegment = () => {
                currentL.segments.push({
                    x: getNextNumber(),
                    y: getNextNumber()
                })
            }

            getNextLineSegment()
            while (i < d.length && !isNumber(d[i]) && !isLetter.test(d[i])) {
                i++
            }
            while (isNumber(d[i]))
                getNextLineSegment()
            currentSection.Pieces.push({ L: currentL })
        } else {
            console.log("sections.length: " + sections.length)
            console.log("current Section: ", currentSection)
            console.log("current Piece: ", currentSection.Pieces[currentSection.Pieces.length - 1])
            throw new Error("Should have matched something. d[i]:" + d[i] + " i:" + i)
        }
    }


    let newPath: SVG_Path = {
        id,
        // d,
        stroke,
        fill,
        fillRule,
        sections
    }
    var patt = new RegExp(/^[A-Z]+$/i);
    let letters = {

    }

    // for (let letterd of newPath.d)
    //     if (patt.test(letterd)) {
    //         if (letters[letterd])
    //             letters[letterd]++
    //         else
    //             letters[letterd] = 1
    //     }
    // console.log(letters)

    return JSON.stringify(newPath)
}