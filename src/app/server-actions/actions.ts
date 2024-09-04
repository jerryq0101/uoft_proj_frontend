"use server"

import { config } from "dotenv"
config();

/**
 * This function is used to get the tree data for the entire prerequisite tree
 */
export async function get_full_tree_data(completed_courses: string[], desired_courses: string[]) {
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
 * This function is used to get the tree data for first level (as in direct) prerequisites
 */
export async function get_simple_tree_data(completed_courses: string[], desired_courses: string[]) {
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