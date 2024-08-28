"use client"
import Link from "next/link";
import { useState, useEffect } from 'react';

// All Chakra UI components
import { Input } from '@chakra-ui/react'
import {
    Tag,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
    TagCloseButton,
  } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Switch } from '@chakra-ui/react'
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
    AutoCompleteTag,
  } from "@choc-ui/chakra-autocomplete";

import { get_tree_data } from '@/app/server-actions/actions'


/**
 * MainLeftBar component
 * 
 * This component renders a sidebar with course selection functionality.
 * It allows users to add completed and desired courses, and build a course tree.
 * 
 * @param {Function} props.setTreeData - Function to update the tree data in the parent component after fetching it from the server
 * @returns {JSX.Element} The rendered MainLeftBar component
 */

export default function MainLeftBar({setTreeData, showCompleted, setShowCompleted, setLeftBarIsOpen}: {setTreeData: any; showCompleted: any; setShowCompleted: any; setLeftBarIsOpen: any}) {
    const course_list = ["MAT135H1", "MAT136H1", "MAT309H1", "CSC108H1", "CSC311H1", "CSC165H1", "CSC110Y1", "CSC240H1", "CSC236H1", "CSC263H1"]
    const [loading, setLoading] = useState(false);

    const [completed_courses, setCompletedCourses] = useState<{ name: string; color: string }[]>([])
    const [desired_courses, setDesiredCourses] = useState<{ name: string; color: string }[]>([])

    const [completedInputValue, setCompletedInputValue] = useState('');
    const [desiredInputValue, setDesiredInputValue] = useState('');

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(window.innerWidth > 768);
        setLeftBarIsOpen(window.innerWidth > 768);
    }, [])

    useEffect(() => {
        const handleResize = () => {
            const newIsMobile = window.innerWidth <= 768;
            if (newIsMobile) {
                console.log("HANDLE RESIZE TRIGGERED")
                setIsOpen(false);
                setLeftBarIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleSidebar = () => {
        console.log("TOGGLE SIDEBAR TRIGGERED")
        setIsOpen(!isOpen);
        setLeftBarIsOpen(!isOpen);
    };

    

    function add_completed_course(course: string) {
        // Define an array of color words
        const colorWords = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'teal', 'cyan', 'indigo'];
        
        // Generate a random color word for the course
        const randomColor = colorWords[Math.floor(Math.random() * colorWords.length)];
        
        const course_with_color = {
            name: course,
            color: randomColor
        }
        // Add the course with its random color word
        setCompletedCourses([...completed_courses, course_with_color]);
    }

    function add_desired_course(course: string) {
        // Define an array of color words
        const colorWords = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'teal', 'cyan', 'indigo'];
        
        // Generate a random color word for the course
        const randomColor = colorWords[Math.floor(Math.random() * colorWords.length)];
        
        const course_with_color = {
            name: course,
            color: randomColor
        }
        // Add the course with its random color word
        setDesiredCourses([...desired_courses, course_with_color]);
    }

    const handleCompletedCourseSelect = (course: string) => {
        add_completed_course(course);
        setCompletedInputValue('');
    };

    const handleDesiredCourseSelect = (course: string) => {
        add_desired_course(course);
        setDesiredInputValue('');
    };


    // -----–––––––––––------ TREE FETCHING LOGIC -----–––––––––––------
    /**
     * Gets data from the server using the get_tree_data server action
     * @returns { course_trees: [...]}
     */
    async function get_data() {
        const completedCourseNames = completed_courses.map(course => course.name);
        const desiredCourseNames = desired_courses.map(course => course.name);
        console.log("GET Data call")
        const data = await get_tree_data(completedCourseNames, desiredCourseNames);
        return data
    }

    /**
     * Handles the button click event
     * sets course tree data in the parent component for the tree visualization to take place
     * 
     * @returns {void}
     */
    async function handle_btn_click() {
        // Takes in data from the form
        console.log("CLICKED")

        setLoading(true)

        const data = await get_data()
        // const processed_data = convert_data_to_visualization(data)
        console.log(data)
        setTreeData(data)

        setLoading(false)
    }

    return (
        <>
            <button 
                className="fixed top-4 left-4 z-50 p-2 bg-gray-200 rounded"
                onClick={toggleSidebar}
            >
                ☰
            </button>
            <aside className={`z-49 fixed left-0 top-0 w-[400px]  bg-gray-100 h-screen p-4 border-r border-gray-200 overflow-y-auto transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="py-14 px-10 items-center">
                    <div className="flex flex-col h-full gap-10">
                        <h1>Simple (Full) Course Tree Visualizer</h1>
                        {/* Course collection field */}
                        <div className="flex flex-col gap-2">
                            <p>Add Completed Courses</p>
                            <AutoComplete openOnFocus={false} onChange={(option) => handleCompletedCourseSelect(option)}>
                                <AutoCompleteInput value={completedInputValue} onChange={(e) => setCompletedInputValue(e.target.value)} size='sm' placeholder="CSC108H1" />
                                <AutoCompleteList>
                                    {course_list.map((course, cid) => (
                                        <AutoCompleteItem
                                            key={`option-${cid}`}
                                            value={course}
                                            textTransform="capitalize"
                                        >
                                            {course}
                                        </AutoCompleteItem>
                                    ))}
                                </AutoCompleteList>
                            </AutoComplete>
                            <div className="flex flex-row flex-wrap gap-2">
                                {completed_courses.map((course, index) => (
                                    <Tag
                                        size={"md"}
                                        key={index}
                                        variant='solid'
                                        colorScheme={course.color}
                                    >
                                        <TagLabel>{course.name}</TagLabel>
                                        <TagCloseButton onClick={() => {
                                            setCompletedCourses(completed_courses.filter((_, i) => i !== index));
                                        }} />
                                    </Tag>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p>Add Desired Courses</p>
                            <AutoComplete openOnFocus={false} onChange={(option) => handleDesiredCourseSelect(option)}>
                                <AutoCompleteInput value={desiredInputValue} onChange={(e) => setDesiredInputValue(e.target.value)} size='sm' placeholder="MAT309H1" />
                                <AutoCompleteList>
                                    {course_list.map((course, cid) => (
                                        <AutoCompleteItem
                                            key={`option-${cid}`}
                                            value={course}
                                            textTransform="capitalize"
                                        >
                                            {course}
                                        </AutoCompleteItem>
                                    ))}
                                </AutoCompleteList>
                            </AutoComplete>
                            <div className="flex flex-row flex-wrap gap-2">
                                {desired_courses.map((course, index) => (
                                    <Tag
                                        size={"md"}
                                        key={index}
                                        variant='solid'
                                        colorScheme={course.color}
                                    >
                                        <TagLabel>{course.name}</TagLabel>
                                        <TagCloseButton onClick={() => {
                                            setDesiredCourses(desired_courses.filter((_, i) => i !== index));
                                        }} />
                                    </Tag>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-row justify-between">
                            <Button 
                                isLoading={loading} 
                                onClick={() => {
                                    handle_btn_click()
                                }} 
                                loadingText='O(n⁴) poop' 
                                colorScheme='green' 
                                variant='solid'>
                                🌳 Build Tree
                            </Button>
                            <div className="flex flex-col justify-between">
                                {/* IMPLEMENT LOGIC HERE FOR THIS SHIT */}
                                <div className="flex flex-row gap-2">
                                    <Switch size='sm' />
                                    <p>Show Prerequisites</p>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <Switch size='sm' value={showCompleted} onChange={() => setShowCompleted(!showCompleted)} />
                                    <p>Show Completion</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}