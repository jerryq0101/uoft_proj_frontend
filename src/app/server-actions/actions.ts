"use server"


// export function UserProfile({ userId }: { userId: string }) {
//     const updateUserWithId = updateUser.bind(null, userId)

export async function get_tree_data(completed_courses: string[], desired_courses: string[]) {
    console.log(completed_courses)
    console.log(desired_courses)
    
    const res = await fetch("http://127.0.0.1:5000/course/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "completed_courses": completed_courses,
            "desired_courses": desired_courses
        }),
    })

    console.log(res)

    return res.json()
}