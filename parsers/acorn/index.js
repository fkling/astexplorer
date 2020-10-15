import {Parser as acorn} from 'acorn'
import {parse as loose} from 'acorn-loose'
import acornjsx from 'acorn-jsx'
import {version} from 'acorn/package.json'

export default {
  acorn,
  loose,
  acornjsx,
  version,
}
