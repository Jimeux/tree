import * as React from "react"
import {TreeNode} from "./TreeNode"
import {treeStore} from "./TreeStore"
import {observer} from "mobx-react"

export const CategoryTree = observer(() =>
  <div>
    <ul className="category-tree">
      <TreeNode node={treeStore.rootNode}/>
    </ul>
    {treeStore.selected && <CategoryPanel node={treeStore.selected}/>}
  </div>
)

const CategoryPanel = ({node}) =>
  <div>
    <ul>
      <li>ID: {node.id}</li>
      <li>Name: {node.name}</li>
      <li>Children: {node.children ? node.children.length : 0}</li>
    </ul>
  </div>