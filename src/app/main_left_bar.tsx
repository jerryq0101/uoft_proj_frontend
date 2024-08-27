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

export default function MainLeftBar(){
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsOpen(window.innerWidth > 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <button 
                className="md:hidden fixed top-4 left-4 z-20 p-2 bg-gray-200 rounded"
                onClick={() => setIsOpen(!isOpen)}
            >
                ☰
            </button>
            <aside className={`fixed left-0 top-0 w-[400px] bg-gray-100 h-screen p-4 border-r border-gray-200 overflow-y-auto transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="py-14 px-10 items-center">
                    <div className="flex flex-col h-full gap-14">
                        <h1>Simple (Full) Course Tree Visualizer</h1>
                        {/* Course collection field */}
                        <div className="flex flex-col gap-2">
                            <p>Add Completed Courses</p>
                            <Input placeholder='CSC108H1' size='sm' />
                            {/* Some fucking searching mechanism for the courses and a drop down and people click and then it will be added as a tag below via a list*/}
                            <div>
                                <Tag
                                    size={"md"}
                                    key={"md"}
                                    variant='solid'
                                    // Do a fucking random color generator here
                                    colorScheme='green'
                                    >
                                    <TagLabel>CSC108</TagLabel>
                                    <TagCloseButton />
                                </Tag>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p>Add Desired Courses</p>
                            <Input placeholder='CSC311H1' size='sm' />
                            {/* Some fucking searching mechanism for the courses and a drop down and people click and then it will be added as a tag below via a list*/}
                            <div>
                                <Tag
                                    size={"md"}
                                    key={"md"}
                                    variant='solid'
                                    // Do a fucking random color generator here
                                    colorScheme='yellow'
                                    >
                                    <TagLabel>CSC311H1</TagLabel>
                                    <TagCloseButton />
                                </Tag>
                            </div>
                        </div>

                        <div className="flex flex-row justify-between">
                            <Button isLoading={loading} onClick={() => setLoading(true)} loadingText='O(n⁴) poop' colorScheme='green' variant='solid'>
                                🌳 Build Tree
                            </Button>
                            <div className="flex flex-col justify-between">
                                {/* IMPLEMENT LOGIC HERE FOR THIS SHIT */}
                                <div className="flex flex-row gap-2">
                                    <Switch size='sm' />
                                    <p>Show Prerequisites</p>
                                </div>
                                <div className="flex flex-row gap-2">
                                    <Switch size='sm' />
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