# Community Connect
"Community Connect" is a mobile health application that aims to consolidate resources available in communities in order to promote healthy lifestyle choices. We are working in conjunction with Massachusetts General Hospital's [Center for Community Health Improvement](https://www.massgeneral.org/cchi/) and Revere CARES Coalition to create a database of resources that include substance abuse counseling, affordable healthy food options, child care, and more.

## How this works
Resources are stored in a google spreadsheet. https://docs.google.com/spreadsheets/d/1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA/edit?usp=sharing

The spreadsheet automatically publishes its contents to a json endpoint that this app consumes. Members of the community can add unvetted resources to the spreadsheet via a google form. Trusted members with access to the spreadsheet will vet submitted
resources &  mark them as vetted. The app will only display vetted resources.

Note that this project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).  Create React App gives us lots of functionality not documented in this readme.

## New Developer Setup Instructions
1) clone the repo
1) install npm (it may be installed already)
1) install dependencies `npm install`
1) start server `npm start`

## Editor setup
*Syntax highlighting* To configure the syntax highlighting in your favorite text editor, head to the [relevant Babel documentation page](https://babeljs.io/docs/editors) and follow the instructions. Some of the most popular editors are covered.

*Ignore generated files* Your editor will search all the files in the project - including large generated ones & dependencies unless you tell it not to. Look into how your editor can ignore `node_modules/*` and `build/*`

## History
The original architectural design for this app was designed proven out by [Bob Breznak](https://github.com/bobbrez) for an organization assisting with the refugee crisis in Greece in 2016, [Prosper](http://prosper.community/). They needed help consolidating, vetting and displaying resources on the web. In May 2018 he re-wrote the frontend in react.js to create an app that assists homeless people [Seeking Shelter](https://makao2.brez.io/) and resources. In August 2018 Code for Boston’s Community Connect project had similar aims and the repo was moved into their org.
