<?php

$tips = [
    "Click on any AST node with a '+' to expand it",

    "Hovering over a node highlights the \
    corresponding location in the source code",

    "Shift click on an AST node to expand the whole subtree"
];

function printTips() {
    global $tips;
    foreach($tips as $i => $tip) {
        echo "Tip $i: " . $tip;
    }
}
