# Community Connect
"Community Connect" is a health resource web application that aims to consolidate information about businesses and organization available in communities that promote healthy lifestyle choices. A health resource is defined as services or materials that improve the quality of life of others, ranging from affordable child care, substance abuse counseling, domestic violence support, and more. We are working to make this tool more accessible to health clinics and service centers that have databases of information that they would like to easily share with their patient population.

To suggest businesses and/or organizations in the area that are not presently listed, please visit:
https://goo.gl/forms/X2Nou8ZLtrmz0JGe2

  1. Stage 1 - Simple Name Search, Category Filter, Semi-clickable List, Map with Pins.
  2. Stage 2 - Fuzzy search, Mobile Compatibility, organized card with all relevant information about selected resource on Map, import and maintain up-to-date information about resources, unique URL created for specified Org Cards.
  3. Stage 3 - Make improvements based on feedback from Social Workers at the Revere HealthCare Center, make the codebase more transferrable for other projects that use a spreadsheet and website that reflects that data.

## Explanation of Client Views

This app supports two views: the client view and the social worker view. The client view currently just allows people to view the resources provided in the associated Google Sheets spreadsheet, and their associated locations on a map. To access the client view, go to /:resource/ . Currently, we have a few spreadsheets available for use:

* Revere Cares (/revere) - The original database which inspired the project. Displays relevant resources available in the Boston Area. See: https://communityconnect.netlify.com/revere

* Migrant Service Maps (/msm) - An initiative based out of Code for Boston looking to support and strengthen migrant service provisions in the greater Boston area. They allowed us to use their data for testign purposes. For more information about them, click [here] (https://github.com/codeforboston/migrant_service_map).

* Badtown (/badtown) - Testing for error handling regarding loading bad spreadsheets.

* Badtown Path (/dontdothat) - Testing for error handling regarding loading an invalid path.

* Other layout/testing spreadsheets (/hodor, /lucasland, /timtown_1): Other spreadsheets mainly for layout testing. 

## Explanation of Admin Views

The Admin view (the relevant view for the social worker) is tied to each spreadsheet. The admin view allows for resource searching, filtering, and saving a collection of resources to you "saved resources" cart. From there, you can generate a unique URL of your saved resources, and either print it out or share the link with the client. To access the view, navigate to (/:resource/admin). See: https://communityconnect.netlify.com/revere/admin

## How this works
Resources are stored in a google spreadsheet. https://docs.google.com/spreadsheets/d/1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA/edit?usp=sharing

The spreadsheet automatically publishes its contents to a json endpoint that this app consumes. Members of the community can add unvetted resources to the spreadsheet via a google form. Trusted members with access to the spreadsheet will vet submitted
resources &  mark them as vetted. The app will only display vetted resources.

Note that this project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).  Create React App gives us lots of functionality not documented in this readme.

## New Developer Setup Instructions
1) Clone the repo
2) Install yarn (it may be installed already)
3) Install dependencies by running `yarn`
4) Start the development server buy running `yarn start`

## Where to start
Our open issues are listed on the project's [Issues](https://github.com/codeforboston/communityconnect/issues) tab. The best places to start are unassigned issues with the label "[good first issue](https://github.com/codeforboston/communityconnect/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22+no%3Aassignee)".
Those with "bug" and "help wanted" are great too, but may require more experience. Avoid issues labeled "epic" until you're more familiar with the project.

A great first issue to look into doing is the React warnings that can be found in the developer console. To solve a React warning there is no need to create a issue. Just make an announcement in Slack that you are going to work on which ever specific warnings. Then put together a pull request with the code changes.

## Beginner resources
http://freecodecamp.com/

https://www.codecademy.com/

https://github.com/firstcontributions/first-contributions

## Connect with the team
Join our [Code for Boston](https://www.codeforboston.org/) slack channel: [#community-connect](https://cfb-public.slack.com/messages/CC85SAJ0Z/) or look for us at the [CfB Tuesday meet-ups](https://meetup.com/Code-For-Boston).

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
1) Open "src/googlesheetApi.js" in the codebase
1) Replace "revere_key" with a portion of the URL in your clipboard

For Example, if the URL of your Google Spreadsheet is
https://docs.google.com/spreadsheets/d/1FRd8Jw7y4CnnHCKIvkM-pjNjRVFHFHuobVU-ajXre6M/edit?usp=sharing

Set the build-time environment variable REACT_APP_GOOGLE_SHEETS_ID to "1FRd8Jw7y4CnnHCKIvkM-pjNjRVFHFHuobVU-ajXre6M"

Start your server using `npm run start`

### Why would I want my own spreadsheet?

1) Some features may require you to modify the data to validate your code.
1) The production spreadsheet should not be modified for testing purposes.

## Editor setup
*Syntax highlighting* To configure the syntax highlighting in your favorite text editor, head to the [relevant Babel documentation page](https://babeljs.io/docs/editors) and follow the instructions. Some of the most popular editors are covered.

*Ignore generated files* Your editor will search all the files in the project - including large generated ones & dependencies unless you tell it not to. Look into how your editor can ignore `node_modules/*` and `build/*`

## History
The original architectural design for this app was designed proven out by [Bob Breznak](https://github.com/bobbrez) for an organization assisting with the refugee crisis in Greece in 2016, [Prosper](http://prosper.community/). They needed help consolidating, vetting and displaying resources on the web. In May 2018 he re-wrote the frontend in react.js to create an app that assists homeless people [Seeking Shelter](https://makao2.brez.io/) and resources. In August 2018 Code for Boston’s Community Connect project had similar aims and the repo was moved into their org. The data used for this project was initially collected from [Nevil Desai](https://www.linkedin.com/in/nevildesai/) during his internship with Revere CARES, a coalition group under the umbrella of MGH Center for Community Health Improvement.
