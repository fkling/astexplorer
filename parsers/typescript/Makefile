$(OUT_DIR)/%: $(CONFIGS_DIR)/rollup.config.js index.js .updated package.json Makefile
	$(BIN_DIR)/rollup --config "$<" --file "$@"
	$(SCRIPTS_DIR)/link "$@"
