deploy: 
	make deploy-css
	make deploy-js
	make deploy-fonts
	make clean

## Run this using Docker: docker run -v "$(PWD)":/data cboettig/boostrap:3.1.1 
css: less/bootstrap.less
	grunt dist

## Deploy outside of Docker since involves `..` (make deploy)

deploy-css: dist/css/bootstrap.min.css
	cp dist/css/bootstrap.min.css ../css/

deploy-js: dist/js/bootstrap.min.js
	cp dist/js/bootstrap.min.js ../js/

deploy-fonts:
	cp -r dist/fonts ..

	
clean:
	rm -rf docs/ dist/
