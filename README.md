# Community Connect
"Community Connect" is a mobile health application that aims to consolidate resources available in communities in order to promote healthy lifestyle choices. We are working in conjunction with Massachusetts General Hospital's [Center for Community Health Improvement](https://www.massgeneral.org/cchi/) and Revere CARES Coalition to create a database of resources that include substance abuse counseling, affordable healthy food options, child care, and more.

## How this works
Resources are stored in a google spreadsheet (New). https://docs.google.com/spreadsheets/d/1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA/edit?usp=sharing

The spreadsheet automatically publishes its contents to a json endpoint that this app consumes. Members of the community can add unvetted resources to the spreadsheet via a google form. Trusted members with access to the spreadsheet will vet submitted
resources &  mark them as vetted. The app will only display vetted resources.

Note that this project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).  Create React App gives us lots of functionality not documented in this readme.

## New Developer Setup Instructions
1) clone the repo
1) install npm (it may be installed already)
1) install dependencies `npm install`
1) start server `npm start`

## Want your own spreadsheet?

*Prefer to see a gif of this process instead of reading steps? Click [here](https://imgur.com/a/N6kdSjC)*

1) Visit the [current spreadsheet](https://docs.google.com/spreadsheets/d/1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA/edit#gid=0)
1) Click File and select Make a Copy
1) Click OK
1) When viewing your copy, click SHARE in the upper-right hand corner.
1) Click "Get shareable link" in the upper-right hand corner of the modal.
1) Ensure that "Anyone with the link can view" is selected.
1) Copy link
1) Click done
1) Click File and select "Publish to the web"
1) Click Publish
1) Open "src/App.js" in the codebase
1) Replace "revere_key" with a portion of the URL in your clipboard

Example:
https://docs.google.com/spreadsheets/d/1FRd8Jw7y4CnnHCKIvkM-pjNjRVFHFHuobVU-ajXre6M/edit?usp=sharing

Replace the "revere_key" value with "1FRd8Jw7y4CnnHCKIvkM-pjNjRVFHFHuobVU-ajXre6M"

Start your server using `npm start`

## Why would I want my own spreadsheet?

1) Some features may require you to modify the data to validate your code.
1) The production spreadsheet should not be modified for testing purposes.

## Editor setup
*Syntax highlighting* To configure the syntax highlighting in your favorite text editor, head to the [relevant Babel documentation page](https://babeljs.io/docs/editors) and follow the instructions. Some of the most popular editors are covered.

*Ignore generated files* Your editor will search all the files in the project - including large generated ones & dependencies unless you tell it not to. Look into how your editor can ignore `node_modules/*` and `build/*`

## History
The original architectural design for this app was designed proven out by [Bob Breznak](https://github.com/bobbrez) for an organization assisting with the refugee crisis in Greece in 2016, [Prosper](http://prosper.community/). They needed help consolidating, vetting and displaying resources on the web. In May 2018 he re-wrote the frontend in react.js to create an app that assists homeless people [Seeking Shelter](https://makao2.brez.io/) and resources. In August 2018 Code for Boston’s Community Connect project had similar aims and the repo was moved into their org.
