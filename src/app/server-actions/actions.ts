"use server"

/**
 * This function is used to get the tree data for the entire prerequisite tree
 */
export async function get_full_tree_data(completed_courses: string[], desired_courses: string[]) {
    console.log(completed_courses)
    console.log(desired_courses)

    const res = await fetch("http://127.0.0.1:5000/course/", {
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

    console.log(res)

    return res.json()
}
/**
 * This function is used to get the tree data for first level (as in direct) prerequisites
 */
export async function get_simple_tree_data(completed_courses: string[], desired_courses: string[]) {
    console.log(completed_courses)
    console.log(desired_courses)

    // MAKE A SEPARATE ENDPOINT !!!!!
    const res = await fetch("http://127.0.0.1:5000/course/", {
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

    console.log(res)

    return res.json()
}