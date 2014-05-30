SOY=java -jar ~/Downloads/closure-templates-for-javascript-latest/SoyToJsSrcCompiler.jar

price.soy.js : price.soy
	$(SOY) --outputPathFormat '{INPUT_FILE_NAME_NO_EXT}.soy.js' \
	       --srcs $(shell echo $^ | tr ' ' ,)
