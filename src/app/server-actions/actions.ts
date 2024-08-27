"use server"

export async function get_tree_data() {
    const res = await fetch("http://127.0.0.1:5000/course/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "completed_courses": ["MAT135H1"],
            "desired_courses": ["MAT309H1"]
        }),
    })

    console.log(res)

    return res.json()
}