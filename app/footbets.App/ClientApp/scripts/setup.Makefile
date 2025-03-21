APP_NAME ?= ClientApp

chmod:
	chmod +x ./scripts/setup.sh

app:
	make chmod && ./scripts/setup.sh

create:
	pnpm create vite --template react-ts

setup:
	pnpm install

install:
	make setup

tests:
	pnpm add -D @testing-library/react @testing-library/dom @types/react @types/react-dom

e2e:
	pnpm create playwright && mv tests-examples/* src/e2e/

init-env:
	touch .env.local .env.development .env.uat .env.production

scripts:
	node scripts/add-scripts.cjs
