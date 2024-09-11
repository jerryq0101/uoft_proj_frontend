"use client"

import { useState, useEffect } from 'react';

// All Chakra UI components
import {
    Tag,
    TagLabel,
    TagCloseButton,
  } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Switch } from '@chakra-ui/react'
import {
    AutoComplete,
    AutoCompleteInput,
    AutoCompleteItem,
    AutoCompleteList,
  } from "@choc-ui/chakra-autocomplete";
import { getFullTreeData, getSimpleTreeData } from '@/app/server-actions/actions'
import {
    ApiInput,
    RawData,
    CourseSelected,
    CommonalityLegendInformation
} from './interfaces'


/**
 * @component
 * @description Renders the left sidebar for course selection and tree building options
 *
 * @param {CommonalityLegendInformation} groupToColor - Information for common course groups labelling when showCommonality is true.
 * @param {React.Dispatch<React.SetStateAction<RawData>>} setTreeData - Function to update the tree data state in the MainPage component to display the tree when the user clicks the build tree button
 * @param {boolean} showCompleted - State variable to show completed courses
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setShowCompleted - Function to toggle showing completed courses
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setLeftBarIsOpen - Function to set the left bar's open state
 * @param {boolean} toggleCommonality - State variable to show common courses
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setToggleCommonality - Function to toggle showing common courses
 *
 * @returns {JSX.Element} The left sidebar component with course selection and tree building options
 */
export default function MainLeftBar({groupToColor, setTreeData, showCompleted, setShowCompleted, setLeftBarIsOpen, toggleCommonality, setToggleCommonality}: {groupToColor: CommonalityLegendInformation, setTreeData: React.Dispatch<React.SetStateAction<RawData>>; showCompleted: boolean; setShowCompleted: React.Dispatch<React.SetStateAction<boolean>>; setLeftBarIsOpen: React.Dispatch<React.SetStateAction<boolean>>; toggleCommonality: boolean; setToggleCommonality: React.Dispatch<React.SetStateAction<boolean>>}) {
    const course_list = ['CSC336H1', 'CSC148H1', 'CSC108H1', 'CSC111H1', 'CSC110Y1', 'MAT133Y1', 'MAT135H1', 'MAT136H1', 'MAT137Y1', 'MAT157Y1', 'MAT223H1', 'MAT240H1', 'MAT235Y1', 'MAT237Y1', 'MAT138H1', 'MAT246H1', 'MAT257Y1', 'MAT247H1', 'APM236H1', 'MAT221H1', 'MAT224H1', 'STA238H1', 'STA237H1', 'STA247H1', 'STA257H1', 'STA248H1', 'STA261H1', 'STA302H1', 'STA255H1', 'STA220H1', 'STA221H1', 'STA288H1', 'BIO230H1', 'BIO130H1', 'CHM135H1', 'CHM136H1', 'CHM151Y1', 'PHY131H1', 'PHY132H1', 'PHY151H1', 'PHY152H1', 'BIO255H1', 'PSY201H1', 'PSY100H1', 'COG250Y1', 'GGR270H1', 'EEB225H1', 'BIO120H1', 'ECO220Y1', 'ECO101H1', 'ECO102H1', 'ECO105Y1', 'ECO227Y1', 'ECO210H1', 'STA347H1', 'CSC401H1', 'CSC207H1', 'CSC209H1', 'CSC485H1', 'CSC320H1', 'CSC263H1', 'CSC236H1', 'CSC165H1', 'CSC240H1', 'CSC265H1', 'MAT377H1', 'CSC420H1', 'MAT194H1', 'MAT195H1', 'CSC311H1', 'CSC413H1', 'STA314H1', 'CSC412H1', 'STA414H1', 'CSC304H1', 'CSC384H1', 'CSC486H1', 'CSC324H1', 'PSY270H1', 'PHL232H1', 'PHL342H1', 'CSC318H1', 'LIN101H1', 'LIN200H1', 'CSC309H1', 'CSC428H1', 'CSC343H1', 'CSC367H1', 'CSC258H1', 'CSC369H1', 'CSC457H1', 'CSC373H1', 'CSC458H1', 'CSC368H1', 'CSC385H1', 'CSC443H1', 'CSC469H1', 'CSC488H1', 'CSC301H1', 'CSC410H1', 'CSC417H1', 'CSC317H1', 'CSC419H1', 'APM462H1', 'PHY385H1', 'PHY250H1', 'PHY224H1', 'PHY231H1', 'PHY252H1', 'PHY254H1', 'PHY256H1', 'PSL440Y1', 'PSL300H1', 'PSY290H1', 'PSY280H1', 'CSC300H1', 'CSC404H1', 'CSC303H1', 'MUS300H1', 'CIN212H1', 'CIN432H1', 'CIN105Y1', 'CIN201Y1', 'CIN301Y1', 'ENG235H1', 'ECO326H1', 'ECO200Y1', 'ECO204Y1', 'ECO206Y1', 'RSM482H1', 'SOC204H1', 'SOC100H1', 'SOC150H1', 'CSC302H1', 'CSC316H1', 'CSC454H1', 'STA313H1', 'ENV281H1', 'ENV381H1', 'IRE260H1', 'COG260H1', 'COG341H1', 'COG343H1', 'COG344H1', 'LIN232H1', 'LIN102H1', 'LIN241H1', 'JLP315H1', 'JLP374H1', 'LIN228H1', 'LIN229H1', 'PSY260H1', 'CSC436H1', 'CSC446H1', 'APM346H1', 'MAT244H1', 'MAT267H1', 'MAT351Y1', 'CSC456H1', 'CSC466H1', 'MAT334H1', 'MAT354H1', 'MAT337H1', 'MAT357H1', 'CSC308H1', 'CSC490H1', 'CSC491H1', 'CSC494H1', 'CSC495H1', 'CSC494Y1', 'CSC463H1', 'CSC310H1', 'CSC438H1', 'MAT309H1', 'CSC448H1', 'CSC473H1', 'MAT332H1', 'MAT344H1']
    const [loading, setLoading] = useState(false);

    const [completed_courses, setCompletedCourses] = useState<Array<CourseSelected>>([])
    const [desiredCourses, setDesiredCourses] = useState<Array<CourseSelected>>([])

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
                setIsOpen(false);
                setLeftBarIsOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        setLeftBarIsOpen(!isOpen);
    };

    /**
     * Adds a completed course to the completed courses state to display on the LeftBar
     * @param course - The course code to add
     */
    function addCompletedCourse(course: string): void {
        // Define an array of color words
        const colorWords = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'teal', 'cyan'];
        
        // Generate a random color word for the course
        const randomColor = colorWords[Math.floor(Math.random() * colorWords.length)];
        
        const course_with_color = {
            name: course,
            color: randomColor
        }
        // Add the course with its random color word
        setCompletedCourses([...completed_courses, course_with_color]);
    }
    
    /**
     * Adds a desired course to the desired courses state to display on the LeftBar
     * @param course - The course code to add
     */
    function addDesiredCourse(course: string): void {
        // Define an array of color words
        const colorWords = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'teal', 'cyan'];
        
        // Generate a random color word for the course
        const randomColor = colorWords[Math.floor(Math.random() * colorWords.length)];
        
        const course_with_color = {
            name: course,
            color: randomColor
        }
        // Add the course with its random color word
        setDesiredCourses([...desiredCourses, course_with_color]);
    }


    const handleCompletedCourseSelect = (course: string) => {
        addCompletedCourse(course);
        setCompletedInputValue('');
    };


    const handleDesiredCourseSelect = (course: string) => {
        addDesiredCourse(course);
        setDesiredInputValue('');
    };


    // -----–––––––––––------ TREE FETCHING LOGIC -----–––––––––––------
    /**
     * Gets data from the Flask API for the full tree
     * @returns the data (RawData) if successful, otherwise an error message
     */
    async function getData(): Promise<RawData | { error: string }> {
        const completedCourseNames = completed_courses.map(course => course.name);
        const desiredCourseNames = desiredCourses.map(course => course.name);
        const data = await getFullTreeData({completed_courses: completedCourseNames, desired_courses: desiredCourseNames});
        return data
    }

    /**
     * Gets data from the Flask API for the direct prerequisite tree
     * @returns the data (RawData) if successful, otherwise an error message
     */
    async function getSimpleData(): Promise<RawData | { error: string }> {
        const completedCourseNames = completed_courses.map(course => course.name);
        const desiredCourseNames = desiredCourses.map(course => course.name);
        const data = await getSimpleTreeData({completed_courses: completedCourseNames, desired_courses: desiredCourseNames});
        return data
    }

    /**
     * Handles the button click event
     * sets course tree data in the parent (MainPage) component for the tree visualization to occur.
     * @returns void
     */
    async function handleFullTreeBtnClick(): Promise<void> {
        // Takes in data from the form

        setLoading(true)

        const data: RawData | { error: string } = await getData()
        // const processed_data = convert_data_to_visualization(data)
        if ("error" in data) {
            setLoading(false)
        } else {
            setTreeData(data)
        }
        setLoading(false)
    }
    console.log("groupToColor", groupToColor)
    console

    /**
     * Handles the simple tree button click event
     * sets course tree data in the parent (MainPage) component for the tree visualization to occur.
     * @returns void
     */
    async function handleSimpleTreeBtnClick(): Promise<void> {
        setLoading(true)

        const data: RawData | { error: string } = await getSimpleData()
        
        if ("error" in data) {
            setLoading(false)
        } else {
            setTreeData(data)
        }

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
            <aside className={`z-40 fixed left-0 top-0 w-[400px]  bg-gray-100 h-screen p-4 border-r border-gray-200 overflow-y-auto transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="py-14 px-10 items-center">
                    <div className="flex flex-col h-full gap-10">
                        <div className="flex flex-col gap-3">
                            <h1>Prerequisite Tree Visualizer (UofT)</h1>
                            <div className="flex flex-col gap-2">
                                <p>&quot;Build Tree&quot; builds the direct prerequisite tree of a course(s). 
                                    &quot;Build Full Tree&quot; builds the entire prerequisite tree of a course(s).
                                </p>
                                <p>Here's a demo</p>
                            </div>
                        </div>
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
                                        <TagCloseButton isDisabled={loading} onClick={() => {
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
                                {desiredCourses.map((course, index) => (
                                    <Tag
                                        size={"md"}
                                        key={index}
                                        variant='solid'
                                        colorScheme={course.color}
                                    >
                                        <TagLabel>{course.name}</TagLabel>
                                        <TagCloseButton onClick={() => {
                                            setDesiredCourses(desiredCourses.filter((_, i) => i !== index));
                                        }} />
                                    </Tag>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-2">
                                    <Switch size='sm' checked={toggleCommonality} onChange={() => setToggleCommonality(!toggleCommonality)} />
                                    <p>Show Common Courses</p>
                                </div>

                                <div className="flex flex-row gap-2">
                                    <Switch size='sm' checked={showCompleted} onChange={() => setShowCompleted(!showCompleted)} />
                                    <p>Show Completion</p>
                                </div>
                            </div>

                            <Button 
                                isLoading={loading} 
                                onClick={() => {
                                    handleSimpleTreeBtnClick()
                                }} 
                                loadingText='Building Tree' 
                                colorScheme='green' 
                                variant='solid'
                                className="px-5 mr-auto"
                            >
                                🌳 Build Tree
                            </Button>

                            <Button 
                                isLoading={loading}
                                onClick={() => {
                                    handleFullTreeBtnClick()
                                }} 
                                loadingText='Building Tree' 
                                colorScheme='green' 
                                variant='solid'
                                className="px-5 mr-auto"
                            >
                                🌲 Build Full Tree
                            </Button>
                        </div>
                        
                        {showCompleted && 
                        <div>
                            <p>
                            Completion Legend
                            </p>
                            <div>
                                <span className="bg-red-300">Red</span> = Not Completed
                                <br></br>
                                <span className="bg-green-300">Green</span> = Branch/Course Completed
                                <br></br>
                                <span className="bg-yellow-300">Yellow</span> = Course Ready to take given your completed courses
                            </div>
                        </div>
                        }
                        

                        {toggleCommonality && 
                            <div>
                                {groupToColor && <div>
                                    <p>Commonality Pair(s) Legend</p>
                                    <div className="flex flex-col gap-3">
                                        {Object.keys(groupToColor).map((group, index) => (
                                            <div key={index}
                                            >  
                                                {
                                                    // Loop through courses groupToColor["array"] till the second last index
                                                    // for each course print course and ∩ symbol
                                                    // then print the last course
                                                    groupToColor[group]["array"].map((course: string, index: any) => (
                                                        <span key={course}>
                                                            {course}
                                                            {index < groupToColor[group]["array"].length - 1 && ' ∩ '}
                                                        </span>
                                                    ))
                                                }
    
                                                <span> = </span> 
                                                <span className={`${groupToColor[group].color}`}>
                                                    {groupToColor[group]["common_values"].map((c: string, i: number) => {
                                                        if (i === groupToColor[group]["common_values"].length - 1) {
                                                            return <span key={i}>{c}</span>
                                                        } else {
                                                            return <span key={i}>{c}, </span>
                                                        }
                                                    })}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>}
                            </div>
                        }
                    </div>
                </div>
            </aside>
        </>
    )
}