$(OUT_DIR)/%: index.js .updated package.json Makefile
	$(BIN_DIR)/browserify -p tinyify --ignore fs --ignore constants "$<" --standalone parser > "$@"
	$(SCRIPTS_DIR)/link "$@"
