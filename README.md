# Home Page

Website: [https://react-movie-lab.netlify.app](https://react-movie-lab.netlify.app/)



## Appbar

I change the siteHeader into the Appbar through the API below

But you should input the exact movie name to search

> **GET** /search/company

On the left of the search bar are three links that navigate to different pages.

![image-20221110133646594](README.assets/image-20221110133646594.png)



## Carousel

At the top, I use a Carousel to show what is movies on trending through the API below

> **GET** /trending/{media_type}/{time_window}

![image-20221110133326021](README.assets/image-20221110133326021.png)



## Filter Card

Filter card have the same functions in the lab

![image-20221110133836309](README.assets/image-20221110133836309.png)



![image-20221110140038022](README.assets/image-20221110140038022.png)



## Pagination

When you scroll down to the bottom of the page, the web will request the second page of movie information through API and render them

![image-20221110133939639](README.assets/image-20221110133939639.png)



![image-20221110134137158](README.assets/image-20221110134137158.png)





# Movie detail

## Movie's details

At the top is the movie's backdrops 

![image-20221110134318626](README.assets/image-20221110134318626.png)



Show the movie's details through the API below

> **GET** /movie/{movie_id}

![image-20221110134450388](README.assets/image-20221110134450388.png)





## Movie's cast

Get the credits of movie through the API below

Display the cast of movie

> **GET** /movie/{movie_id}/credits

![image-20221110134651935](README.assets/image-20221110134651935.png)





## Movie's keywords

Get the movie's keywords through the API below

Display all the keywords on the right

> **GET** /movie/{movie_id}/keywords

![image-20221110134651935](README.assets/image-20221110134651935.png)



## Comments

Get reviews through the API below

This component displays the avatar, rate, date of the comment, review, and the user name

> **GET** /movie/{movie_id}/reviews

![image-20221110135051039](README.assets/image-20221110135051039.png)



# Actor details



## Actor information

Click the "Learn more" button below the actor card and this will navigate to the actor details page

![image-20221110135302952](README.assets/image-20221110135302952.png)



Notice that the URL has the actor's id in order to get the actor's details

It is implemented through the API below

This page displays the information and biography of the actor

> **GET** /person/{person_id}

![image-20221110135345220](README.assets/image-20221110135345220.png)



## Known for

This block displays the movies that the actor acted in the past

> **GET** /person/{person_id}/combined_credits

![image-20221110135632329](README.assets/image-20221110135632329.png)



Click the "Learn more" button under the card, it will navigate you to the movie detail page

![image-20221110135910197](README.assets/image-20221110135910197.png)
