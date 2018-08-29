# Community Connect
"Community Connect" is a mobile health application that aims to consolidate resources available in communities in order to promote healthy lifestyle choices. We are working in conjunction with Massachusetts General Hospital's [Center for Community Health Improvement](https://www.massgeneral.org/cchi/) and Revere CARES Coalition to create a database of resources that include substance abuse counseling, affordable healthy food options, child care, and more.

## How this works
Resources are stored in a google spreadsheet. https://docs.google.com/spreadsheets/d/108aVfUjdRr_je1Pzx-axkOZTMMtdug7iyVH1m3BsnRw/edit#gid=0

The spreadsheet automatically publishes its contents to a json endpoint that this app consumes. Members of the community can add unvetted resources to the spreadsheet via a google form. Trusted members with access to the spreadsheet will vet submitted
resources &  mark them as vetted. The app will only display vetted resources.

Note that this project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).  Create React App gives us lots of functionality not documented in this readme.

## New Developer Setup Instructions
1) clone the repo
1) install npm (it may be installed already)
1) install dependencies `npm install`
1) start sever `npm start`

## Editor setup
*Syntax highlighting* To configure the syntax highlighting in your favorite text editor, head to the [relevant Babel documentation page](https://babeljs.io/docs/editors) and follow the instructions. Some of the most popular editors are covered.

*Ignore generated files* Your editor will search all the files in the project - including large generated ones & dependancies unless you tell it not to. Look into how your editor can ignore `node_modules/*` and `build/*`
