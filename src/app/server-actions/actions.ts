"use server"

import { config } from "dotenv"
config();

import { ApiInput, RawData } from "../interfaces"


/**
 * This function is used to get the tree data for the full tree (all prerequisites)
 * @param {completed_courses, desired_courses}: ApiInput - Input for the Flask API Call, 
 * completed_courses is an array of strings of completed courses, desired_courses is an array of strings of desired courses
 * @returns RawData | { error: string } - The raw data from the Flask API Call, 500 Server error if the API call fails, or an error message if there was all empty lists provided
 */
export async function getFullTreeData({completed_courses, desired_courses}: ApiInput): Promise<RawData | { error: string }> {
    if (completed_courses.length === 0 && desired_courses.length === 0) {
        return {
            "error": "No courses provided"
        }
    }
    const apiUrl = process.env.API_KEY;

    if (!apiUrl) {
        throw new Error("API URL is not defined in environment variables");
    }
 
    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "completed_courses": completed_courses,
            "desired_courses": desired_courses,
            "tree_choice": "full"
        }),
    })

    return res.json()
}


/**
 * This function is used to get the tree data for the simple tree (only the prerequisites for the desired courses)
 * @param {completed_courses, desired_courses}: ApiInput - Input for the Flask API Call, 
 * @returns RawData | { error: string }
 * 
 * Note: Similar behaviour to getFullTreeData, but the tree_choice is "simple" instead of "full"
 */
export async function getSimpleTreeData({completed_courses, desired_courses}: ApiInput): Promise<RawData | { error: string }> {
    if (completed_courses.length === 0 && desired_courses.length === 0) {
        return {
            "error": "No courses provided"
        }
    }

    const apiUrl = process.env.API_KEY;

    if (!apiUrl) {
        throw new Error("API URL is not defined in environment variables");
    }

    const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "completed_courses": completed_courses,
            "desired_courses": desired_courses,
            "tree_choice": "simple"
        }),
    })

    return res.json()
}