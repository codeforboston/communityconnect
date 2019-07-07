<p align="center">
  <img src="https://github.com/codeforboston/communityconnect/blob/development/src/components/Header/Images/cc-mini-logo.png?raw=true" width="100px">
  <h2 align="center">Community Connect</h2>

  <a align="center" href="https://communityinviter.com/apps/cfb-public/code-for-boston-slack-invite">
    <img src="https://img.shields.io/badge/slack-codeforboston%20%23communityconnect-lightgrey.svg?logo=slack">
  </a>
  <img src="https://img.shields.io/github/commit-activity/m/codeforboston/communityconnect.svg">
</p>

<h4 align="center">A tool for connecting those in need to services or materials that improve their quality of life.</h4>
<details align="center">
  <summary>Click to read more</summary>
<p align="left">
"Community Connect" is a health resource web application that aims to consolidate information about businesses and organization available in communities that promote healthy lifestyle choices. A health resource is defined as services or materials that improve the quality of life of others, ranging from affordable child care, substance abuse counseling, domestic violence support, and more. We are working in conjunction with Massachusetts General Hospital's [Center for Community Health Improvement](https://www.massgeneral.org/cchi/), MGH Revere HealthCare Center, and Revere CARES Coalition to create an extensive database in our pilot region of Revere, Chelsea, Charlestown, and eventually the Greater Boston Area.
</p>
</details>

---

## Table of Contents 
- [Table of Contents](#Table-of-Contents)
- [Features](#Features)
- [Getting Started](#Getting-Started)
  - [Live Demo](#Live-Demo)
  - [Running Locally](#Running-Locally)
  - [Customizing Google Sheet](#Customizing-Google-Sheet)
- [Contributing](#Contributing)
- [FAQ](#FAQ)
- [Support](#Support)
- [License](#License)
- [History](#History)

---
## Features
- Dynamically updated resources from any Google Sheet
- Save resources for viewing later
- Share a link with your saved resources
- Filter resources by category or search term

---
## Getting Started
### Live Demo
Want to see what Community Connect is all about? Check out our live site for Revere at [ccfor.me/`revere`](http://ccfor.me/revere). To manage resources, enter the 'admin' view by adding `/admin` to the end of the URL, such as [ccfor.me/`revere/admin`](http://ccfor.me/revere/admin).

### Running Locally
1) Clone the repository 
2) Install yarn
3) Install dependencies by running `yarn`
4) Start the development server by running `yarn start`
5) Visit `localhost:3000` in your browser to see it running! 🎉
   
### Customizing Google Sheet
You can use a custom Google Sheet with your local installation of Community Connect. You might want to do this for testing or development purposes.
*Prefer to see a gif of this process instead of reading steps? Click [here](https://imgur.com/a/N6kdSjC*
<details>
  <summary>Click to see instructions for creating 
</details>
1) Visit the [current spreadsheet](https://docs.google.com/spreadsheets/d/1QolGVE4wVWSKdiWeMaprQGVI6MsjuLZXM5XQ6mTtONA/edit#gid=0)
2) Click File and select Make a Copy
3) Click OK
4) When viewing your copy, click SHARE in the upper-right hand corner.
5) Click "Get shareable link" in the upper-right hand corner of the modal.
6) Ensure that "Anyone with the link can view" is selected.
7) Copy link
8) Click done
9) Click File and select "Publish to the web"
10) Click Publish
11) Open "src/googlesheetApi.js" in the codebase
12) Replace "revere_key" with a portion of the URL in your clipboard

For Example, if the URL of your Google Spreadsheet is
https://docs.google.com/spreadsheets/d/1FRd8Jw7y4CnnHCKIvkM-pjNjRVFHFHuobVU-ajXre6M/edit?usp=sharing

Set the build-time environment variable REACT_APP_GOOGLE_SHEETS_ID to "1FRd8Jw7y4CnnHCKIvkM-pjNjRVFHFHuobVU-ajXre6M"

---

## Contributing
Thank you for your willingness to help out! To get started on helping build Community Connect, take a look at [our contribution guide.](/docs/CONTRIBUTING.md)
   
---

## FAQ

---

## Support
Join our [Code for Boston](https://www.codeforboston.org/) Slack channel: [#community-connect](https://communityinviter.com/apps/cfb-public/code-for-boston-slack-invite) or look for us at the [CfB Tuesday meet-ups](https://meetup.com/Code-For-Boston).

---

## License

---

## History
The original architectural design for this app was designed proven out by [Bob Breznak](https://github.com/bobbrez) for an organization assisting with the refugee crisis in Greece in 2016, [Prosper](http://prosper.community/). They needed help consolidating, vetting and displaying resources on the web. In May 2018 he re-wrote the frontend in react.js to create an app that assists homeless people [Seeking Shelter](https://makao2.brez.io/) and resources. In August 2018 Code for Boston’s Community Connect project had similar aims and the repo was moved into their org. The data used for this project was initially collected from [Nevil Desai](https://www.linkedin.com/in/nevildesai/) during his internship with Revere CARES, a coalition group under the umbrella of MGH Center for Community Health Improvement.
