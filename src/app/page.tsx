"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import MainLeftBar from "./main_left_bar";
import BottomBar from "./bottom_bar"; // Add this import
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';

export default function Home() {
  const [treeData, setTreeData] = useState<{course_trees: []}>();
  const [showCompleted, setShowCompleted] = useState(false)

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
        const StyledNode = styled.div`
          padding: 5px;
          border-radius: 5px;
          display: inline-block;
          border: 1px solid #047857;
        `;
        // TailwindCSS does not work with TreeNode
        label = <StyledNode>
            {code} {showCompleted && node.completed && "✅"}
          </StyledNode>
      } 
      else {
        label = <div style={{padding: "3px"}}>
            {node.label} {showCompleted && node.marked && "👍"}
        </div>
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
      <MainLeftBar setTreeData={setTreeData} showCompleted={showCompleted} setShowCompleted={setShowCompleted}/>
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
