# Rollback


## Project Description

"RollBack" is a mobile responsive Web App which allows a user to automatically track the return window on a purchased item of clothing, using the Google Calendar API. Each item entered is captured and sent to the app API to create a Google Calendar Event reminder.

## Group roles and planning

A _Trello_ group and project board was set up immediately for all to record a 'To Do' list of tasks, app functions to create, and all group actions to perform.
In concert with a Slack group conversation, task roles and day to day completions were communicated to each other. 
Trello was useful in providing an 'at-a-glance' overview to what the group are working on, our progression and what remains. This oversight allowed decisions be made as to features that should be cut, features to prioritise and where group members may help each other. 


The group was able to clearly define and agree on the desired app functions early in the project, allowing wireframes be created for everyone to see and work with in mind. 
Online wireframe service _'moqups.com'_ was used to create pages/views for the app:

_Hosted here:_
https://app.moqups.com/matt.aitken@gmail.com/FrNNiWyAwx/view/page/ad64222d5

## Technologies Used

Bootstrap elements were utilised in creating the front-end and Google's Calendar API with OAUTH 2.0 identifies users and creates a calendar event and notification on the day before the return window is set to cease. 
A custom Nokogiri/Mechanize web crawler scraped a list of Melbourne clothing stores and their respective websites to find return policies, which was used to build up our API. The Easy Autocomplete library was used to allow users to easily access our API.

## Challenges

Aside from Git conflicts and Ubuntu failures we ran into numerous problems:

The date as rendered by Javascript is incompatible with the Google Calendar API. Some string manipulation was needed to make the dates compatible.

Lots of tinkering was neccesary in regards to web crawling - the original plan was to allow the user to search and the crawler would  automatically retreive the return date. In practice the crawler was very slow (taking roughly 10 seconds per request) and we decided to create a static API.


## Lessons Learned

Don't create your webscraper before creating the actual app - scrapers take a lot of time and tinkering!

Test each line of any code you've taken to interact with a Google API - there's lots going on there and lots of points for failure.

## Unresolved Issues

At present users can not track their previous items as we have yet to implement a user system.

The original idea was to allow users to keep records of their receipts too, this will be included in a future build.
