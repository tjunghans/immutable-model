SHELL := /bin/bash

default:
	npm test

install:
	rm -rf node_modules
	npm install