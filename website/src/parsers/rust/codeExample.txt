const TIPS: &[&str] = &[
    "Click on any AST node with a '+' to expand it",

    "Hovering over a node highlights the \
    corresponding location in the source code",

    "Shift click on an AST node to expand the whole subtree",
];

pub fn print_tips() {
    for (i, tip) in TIPS.iter().enumerate() {
        println!("Tip {}: {}.", i, tip);
    }
}
