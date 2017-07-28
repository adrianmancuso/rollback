# Rollback


## Project Description

A Web App which allows users to automatically track the return window on a piece of clothing using the Google Calendar API. 



## Technologies Used

Bootstrap was utilized for the front-end and Google's Calendar API with OAUTH 2.0 identifies users and creates a calendar event and notification on the day before the return window is set to cease. A custom Nokogiri/Mechanize web crawler scraped a list of Melbourne clothing stores and their respective websites to find return policies, which was used to build up our API. The Easy Autocomplete library was used to allow users to easily access our API.

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

