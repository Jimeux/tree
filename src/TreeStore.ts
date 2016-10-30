import {observable, action, ObservableMap, asMap} from "mobx"
import {Node} from "./Node"
import {data} from "./data"

export class TreeStore {

  private nodes: Node = data

  @observable selected: Node | null = null
  @observable visibleChildren = <ObservableMap<boolean>> asMap({})

  @action
  onSelect(node: Node) {
    this.selected = (this.selected === node) ? null : node
  }

  get rootNode() {
    return this.nodes
  }

  @action
  toggleChildren(node: Node): void {
    if (!node.children)
      return

    if (this.hasVisibleChildren(node)) {
      this.visibleChildren.delete(node.id.toString())
      if (node.children.find(c => c === this.selected))
        this.selected = null
    } else
      this.visibleChildren.set(node.id.toString(), true)
  }

  @action
  openChildren() {
    const directPath = [1, 2, 3]
    const parents = directPath.slice(0, directPath.length - 1)

    this.visibleChildren.clear()
    parents.forEach(id =>
      this.visibleChildren.set(id.toString(), true))
    //this.onSelect(directPath[directPath.length-1])
  }

  isSelected(node: Node) {
    return this.selected && this.selected.id === node.id
  }

  hasVisibleChildren(node: Node) {
    return this.visibleChildren.has(node.id.toString())
  }

}

const treeStore = new TreeStore()

export {treeStore}