import * as React from "react"
import {Component} from "react"
import {observer} from "mobx-react"
import {Node} from "./Node"
import {treeStore} from "./TreeStore"

interface TreeNodeProps {
  node: Node
}

@observer
export class TreeNode extends Component<TreeNodeProps, {}> {

  onSelect(e): void {
    e.stopPropagation()
    treeStore.onSelect(this.props.node)
  }

  onToggleChildren(e): void {
    e.stopPropagation()
    treeStore.toggleChildren(this.props.node)
  }

  get showChildren(): boolean {
    return treeStore.hasVisibleChildren(this.props.node)
  }

  get classes(): string {
    return [
      this.props.node.children ? "has-children" : "",
      this.showChildren ? "open" : "closed",
      treeStore.isSelected(this.props.node) ? "selected" : ""
    ].join(" ")
  }

  get renderChildren() {
    return this.props.node.children.map(child =>
      <TreeNode key={child.id} node={child}/>)
  }

  render() {
    const {node: {name}} = this.props
    const onToggleChildren = this.onToggleChildren.bind(this)
    const onSelect = this.onSelect.bind(this)

    return (
      <li className={this.classes} onClick={onToggleChildren}>
        <span onClick={onSelect}>
          {name}
        </span>
        {this.showChildren && <ul>{this.renderChildren}</ul>}
      </li>
    )
  }

}