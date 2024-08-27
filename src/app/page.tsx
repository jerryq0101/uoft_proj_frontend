"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import MainLeftBar from "./main_left_bar";
import BottomBar from "./bottom_bar"; // Add this import
import { Tree, TreeNode } from 'react-organizational-chart';

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [treeData, setTreeData] = useState<{course_trees: []}>();

  // Hold all the data here
  // Process data

  useEffect(() => {
    console.log("RECEIVED DATA!", treeData)
  }, [treeData])

  function convert_data_to_jsx(data: { course_trees: [] }) {
    const arr = data.course_trees

    function process_node(node: { 
      label: string,
      marked: false,
      completed: false,
      code: string,
      full_name: null,
      children: []
    }) {


      let label: any

      if (node.label == "Course") {
        const code = node.code
        label = <div>{code}</div>
      } 
      else {
        label = <div>{node.label}</div>
      }
      
      // Add children and recurse
      let children = []
      if (Array.isArray(node.children)) { // Check if children is an array
        for (const child of node.children) {
          children.push(process_node(child))
        }
      }
      return <TreeNode label={label}>
        {children}
      </TreeNode>
    }


    let list_of_elements = []
    for (const node of arr) {
      list_of_elements.push(process_node(node))
    }
    return list_of_elements

  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MainLeftBar setTreeData={setTreeData}/>
      <div>

        {treeData?.course_trees && 
          <Tree
            lineWidth={'2px'}
            lineColor={'green'}
            lineBorderRadius={'10px'}
            label={<div>Root</div>}
          >
              {convert_data_to_jsx(treeData)}
          </Tree>
        }
        
        <BottomBar /> {/* Add this line */}
      </div>
    </main>

  );
}
