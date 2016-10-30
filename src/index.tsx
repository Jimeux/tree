import * as React from 'react'
import {render} from 'react-dom'
import {useStrict} from "mobx"
import {Node} from "./Node"
import {CategoryTree} from './CategoryTree'

useStrict(true)

render(
  <CategoryTree/>,
  document.getElementById("mount")
)
