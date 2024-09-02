"use client"

import { useState, useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import Image from "next/image";
import MainLeftBar from "./main_left_bar";
import BottomBar from "./bottom_bar"; // Add this import
import BottomBar2 from "./bottom_bar_2"; // Add this import
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';

interface ChildrenVisibility {
  [key: string]: boolean
}

export default function Home() {
  const [treeData, setTreeData] = useState<{course_trees: any[]}>();
  const [showCompleted, setShowCompleted] = useState(false)

  // This can be set to true when the left bar is open by the component itself
  const [leftBarIsOpen, setLeftBarIsOpen] = useState(false)


  
  const [showChildren, setShowChildren] = useState<ChildrenVisibility>(() => {
    const initialState: ChildrenVisibility = {};
    for (let i = 1; i <= 1000; i++) { // Adjust the number as needed
      initialState[`node-${i}`] = false;
    }
    return initialState;
  })
  let nodeCountRef = 0

  /**
   * For showChildren functionality, we want to toggle the state of the course node that is clicked
   * Track a global index for each course node, and use the global index as the node's id
   *  (Incremented by 1 everytime a course node is added)
   * Once node is clicked, toggle the state of the course node using e in showChildren
   * The StyledNode's onclick function will toggle the state of the course node
   * Use showChildren[id] to set if node is expanded or not 
  */
  
  // Reset the node count everytime there is a reload.
  useEffect(() => {
    nodeCountRef = 0;
  }, [])

  useEffect(() => {
    console.log("RECEIVED DATA!", treeData)
  }, [treeData])


  useEffect(() => {
    console.log("LEFT BAR IS OPEN!", leftBarIsOpen)
  }, [leftBarIsOpen])

  
  const getNextNodeId = (): string => {
    nodeCountRef += 1
    return `node-${nodeCountRef}`
  }

  const toggleNodeExpansion = (id: string) => {
    console.log("TOGGLE NODE EXPANSION", id)
    setShowChildren(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  /**
   * Hypothesis: If marked / completed, then auto hide the children
   * If not completed, then show children, and make the node red
   * 
   * @param data 
   * @returns 
   */
  function convert_data_to_jsx(data: { course_trees: any[] }) {
    const arr = data.course_trees

    let list_of_elements = []
    // to separate out the first node from the rest of the nodes
    if (arr && arr.length > 0 ) {
      for (let i = 0; i < arr.length; i++) {
        const {label, marked, ready_to_take, completed, code, children} = arr[i]
        if (!Array.isArray(children)) {

          const StyledNode = styled.div`
            padding: 5px;
            border-radius: 5px;
            display: inline-block;
            ${showCompleted ? "border: 1px solid #FF9696;" : "border: 1px solid #FFDC83;"}
            cursor: pointer;
          `;
          
            list_of_elements.push(<Tree
                  lineWidth={'2px'}
                  lineColor={'green'}
                  lineBorderRadius={'10px'}
                  label={<StyledNode>{code}</StyledNode>}
                >
                  <TreeNode
                    label={<div>No Prerequisites</div>}
                  />
                </Tree>)
        } else {
          const first_children = children[0]
          
          let StyledNode = styled.div`
            padding: 5px;
            border-radius: 5px;
            display: inline-block;
            ${showCompleted ? "border: 1px solid red;" : "border: 1px solid green;"}
            cursor: pointer;
          `;
          let status = ""
          if (ready_to_take) {
            StyledNode = styled.div`
              padding: 5px;
              border-radius: 5px;
              display: inline-block;
              ${showCompleted ? "border: 1px solid #ECC94B;" : "border: 1px solid #FFDC83;"}
              cursor: pointer;
            `

          } else if (completed) {
            StyledNode = styled.div`
              padding: 5px;
              border-radius: 5px;
              display: inline-block;
              ${showCompleted ? "border: 1px solid #FFDC83;" : "border: 1px solid #FFDC83;"}
              cursor: pointer;
            `
          } else if (marked) {
            StyledNode = styled.div`
              padding: 5px;
              border-radius: 5px;
              display: inline-block;
              ${showCompleted ? "border: 1px solid #FFDC83;" : "border: 1px solid #FFDC83;"}
              cursor: pointer;
            `
          }

          list_of_elements.push(<Tree
            lineWidth={'2px'}
            lineColor={'green'}
            lineBorderRadius={'10px'}
            label={
              <StyledNode>
                {code} {showCompleted && status}
              </StyledNode>
            }
          >
            {process_node(first_children)}
          </Tree>)
        }

      }
      return list_of_elements
      
    } else {
      return []
    }


    function process_node(node: { 
      label: string,
      marked: boolean,
      ready_to_take: boolean,
      completed: false,
      code: string,
      full_name: null,
      children: []
    }) {

      let StyledNode = styled.div`
        padding: 5px;
        border-radius: 5px;
        display: inline-block;
        ${showCompleted ? "border: 1px solid #FF9696;" : "border: 1px solid #047857;"}
        cursor: pointer;
      `;

      let JunctionNode = styled.div`
        padding: 5px;
        display: inline-block;
        ${showCompleted ? "border: 1px solid #FF9696;" : "border: 1px solid #047857;"}
        cursor: pointer;
      `

      let label: any
      if (node.completed) {
        StyledNode = styled.div`
          padding: 5px;
          border-radius: 5px;
          display: inline-block;
          ${showCompleted && "border: 1px solid #047857;"}
          cursor: pointer;
        `;
        JunctionNode = styled.div`
          padding: 5px;
          display: inline-block;
          ${showCompleted && "border: 1px solid #047857;"}
          cursor: pointer;
        `;
      } else if (node.marked) {
        StyledNode = styled.div`
          padding: 5px;
          border-radius: 5px;
          display: inline-block;
          ${showCompleted && "border: 1px solid #ECC94B;"}
          cursor: pointer;
        `;
        JunctionNode = styled.div`
          padding: 5px;
          display: inline-block;
          ${showCompleted && "border: 1px solid #047857;"}
          cursor: pointer;
        `;
      } else if (node.ready_to_take) {
        StyledNode = styled.div`
          padding: 5px;
          border-radius: 5px;
          display: inline-block;
          ${showCompleted && "border: 1px solid #FFDC83;"}
          cursor: pointer;
        `;
      }

      
      const nodeId = getNextNodeId()
      let isExpanded = showChildren[nodeId] ?? false;

      if (node.label == "Course") {
        const code = node.code
        const hasChildren = Array.isArray(node.children)
        // TailwindCSS does not work with TreeNode
        label = <StyledNode id={nodeId} onClick={() => toggleNodeExpansion(nodeId)}>
            {code} {hasChildren ? (isExpanded ? "🔽":"▶️") : ""}
          </StyledNode>
      }
      else {
        const hasChildren = Array.isArray(node.children)
        label = <JunctionNode id={nodeId} onClick={() => toggleNodeExpansion(nodeId)} style={{padding: "3px"}}>
            {node.label} {hasChildren ? (isExpanded ? "🔽":"▶️") : ""}
        </JunctionNode>
      }

      // Add children and recurse
      let children = []
      if (Array.isArray(node.children)) { // Check if children is an array
        for (const child of node.children) {
          children.push(process_node(child))
        }
      }

      return (isExpanded ? <TreeNode label={label}>
        {children}
      </TreeNode> : <TreeNode label={label} />)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-">
      <MainLeftBar setTreeData={setTreeData} setLeftBarIsOpen={setLeftBarIsOpen} showCompleted={showCompleted} setShowCompleted={setShowCompleted}/>
      
      {/* Make this component align from the right of the screen */}
      <div className="w-full flex flex-grow flex-col items-end ">
          <div className={`flex flex-col flex-grow h-full pb-12 ${leftBarIsOpen ? "w-[calc(100%-400px)]" : "w-full"}`}>
              <div className="z-10 pt-5">
                  {treeData && convert_data_to_jsx(treeData)}
              </div>
          <BottomBar isLeftBarOpen={leftBarIsOpen} />
          <BottomBar2 isLeftBarOpen={leftBarIsOpen} />
          </div>
      </div>
    </main>

  );
}
