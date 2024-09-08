// This file contains utility functions used in MainPage and main_left_bar.tsx

import { CommonalityList, ColorLabelsDict, CourseTree } from "./interfaces";
import styled, { IStyledComponent } from 'styled-components';

// MainPage Color labelling function for commonality groups for the tree and MainLeftBar display

const tailwindColors = [
    'bg-red-300', 'bg-green-300', 'bg-blue-300', 'bg-yellow-300', 'bg-purple-300',
    'bg-pink-300', 'bg-indigo-300', 'bg-teal-300', 'bg-orange-300', 'bg-gray-300'
];

function convertStringToArray(str: string): string[] {
    // Replace single quotes with double quotes
    const jsonString = str.replace(/'/g, '"');
    // Parse the JSON string to an array
    return JSON.parse(jsonString);
}

/**
 * Creates a dictionary for the MainLeftBar commonality legend (intersection of courses -> common courses list), and a dictionary for the MainPage course coloring (course string -> color string)
 * @param commonality_list - A dictionary with keys as lists (in string form) of courses that have common prerequisites, the values are lists of those common prerequisites
 * @returns course_to_color: { [key: string]: string } - A dictionary for the MainPage course coloring (course string -> color string)
 * @returns group_to_color: { [key: string]: any } - A dictionary for the MainLeftBar commonality legend (intersection of courses -> common courses list)
 */
export function createColorLabels(commonality_list: CommonalityList): ColorLabelsDict {
    let course_to_color: { [key: string]: string } = {};
    let group_to_color: { [key: string]: any } = {};

    let taken_colors: Set<string> = new Set()

    for (const [key, value] of Object.entries(commonality_list)) {

        // strat here is to get a index of color using of the length of the key array
        // if the color is already taken, incremenet index until the color is not taken
        // assign that color as random color

        // Convert key to array
        const keyArray = convertStringToArray(key)
        // console.log("KEY ARRAY", keyArray)

        // Length of the key array
        let index = keyArray.length
        let tempColor = tailwindColors[index]
        while (taken_colors.has(tempColor)) {
            index += 1
            tempColor = tailwindColors[index]

            if (index > tailwindColors.length - 1) {
                index = 0
            }
        }
        taken_colors.add(tempColor)

        const randomColor = tempColor

        for (const course of value) {
            course_to_color[course] = randomColor
        }
        // console.log("Course to Color", course_to_color)

        group_to_color[key] = {
            "color": randomColor,
            "array": keyArray,
            "common_values": value
        }
    }

    return { course_to_color, group_to_color }
}

// MainPage Convert to Tree JSX funcionality 

/**
 * Determines the style of the node based on the node's completion, read_to_take, and marked status (for both course nodes and AND OR nodes)
 * @param node - The node to determine the style for
 * @param showCompleted - A boolean state variable to determine if completed courses should be shown
 * @returns StyledNode: any - The styled node
 * @returns JunctionNode: any - The styled junction node
 */
export function determineStyle(node: CourseTree, showCompleted: boolean): {StyledNode: any, JunctionNode: any} {
    let StyledNode = styled.div`
        padding: 5px;
        border-radius: 5px;
        display: inline-block;
        ${showCompleted ? "border: 3px solid #FF9696;" : "border: 3px solid green;"}
        cursor: pointer;
      `;

    let JunctionNode = styled.div`
    padding: 5px;
    display: inline-block;
    ${showCompleted ? "border: 3px solid #FF9696;" : "border: 3px solid green;"}
    cursor: pointer;
    `

      if (node.completed) {
        StyledNode = styled.div`
          padding: 5px;
          border-radius: 5px;
          display: inline-block;
          ${showCompleted ? "border: 3px solid #047857;" : "border: 3px solid green;"}
          cursor: pointer;
        `;
        JunctionNode = styled.div`
          padding: 5px;
          display: inline-block;
          ${showCompleted ? "border: 3px solid #047857;" : "border: 3px solid green;"}
          cursor: pointer;
        `;
      } else if (node.ready_to_take && !node.completed) {
        StyledNode = styled.div`
          padding: 5px;
          border-radius: 5px;
          display: inline-block;
          ${showCompleted ? "border: 3px solid #ECC94B;" : "border: 3px solid green;"}
          cursor: pointer;
        `;

      } 
      if (node.marked) {
        StyledNode = styled.div`
          padding: 5px;
          border-radius: 5px;
          display: inline-block;
          ${showCompleted && "border: 3px solid green;"}
          cursor: pointer;
        `;
      }

      return {StyledNode: StyledNode, JunctionNode: JunctionNode}
}