
![myflix](https://user-images.githubusercontent.com/82524635/126139307-165eb069-d79e-4ba2-8d1c-fdc0a05e5a23.jpg)


# myFlix Client-Side: React app
In this project using React, build the client-side for an application called myFlix based on its existing server-side code (REST API and database).
It will be build using React and orginized using Parcel.

# Tools
Dependencies:
- Parcel
- React
- ReactDOM

## Design Criteria

Essential Views and Features

Main view

- Returns a list of ALL movies to the user (each listed item with an image, title, and
description)
- Sorting and filtering
- Ability to select a movie for more details
Single movie view
- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites
Login view
- Allows users to log in with a username and password
Registration view
- Allows new users to register (username, password, email, birthday)
Genre view
- Returns data about a genre, with a name and description
- Displays example movies

Director view

- Returns data about a director (name, bio, birth year, death year)
- Displays example movies
Profile view
- Allows users to update their user info (username, password, email, date of birth)
- Allows existing users to deregister
- Displays favorite movies
- Allows users to remove a movie from their list of favorites

Optional Views and Features

Single movie view and all movies views

- Allow users to see which actors star in which movies
- Allow users to view more information about different movies, such as the release date
and the movie rating

Actors view

- Allows users to view information about different actors
Profile view, single movie view, and all movies view
- Allow users to create a “To Watch” list in addition to their “Favorite Movies” list
