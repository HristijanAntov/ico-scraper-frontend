# ico-scraper-frontend

![alt frontend screenshot](https://image.ibb.co/dCfwZx/frontend.png "Frontend Screenshot")

### The frontend is build using **React** version **^16.2.0**, scaffolded with [create-react-app](https://github.com/facebook/create-react-app).
### In order to run the frontend, the following commands should be executed:

 (Note: *you should have [**yarn**](https://github.com/yarnpkg/yarn) installed globally*)
   * **yarn install**
   * **yarn start**
   
### For loading performance, the workflow of the frontend goes like this:
 * When the page is started and the ico-table component is mounted, we fetch the initial category (**ongoing**) from the api endpoint:
  ```
    {apiUrl}/icos/:category
  ```
That gives us an array of each ico’s payload from the corresponding
category. 

In a single ico’s payload the fullDescription is **EXCLUDED**

The **fullDescription** is only fetched when the user clicks on the info
icon using the following endpoint:
  ```
  {apiUrl}/icos/:id/description
  ```

I have implemented an endpoint for the api:
```
{apiUrl}/stats
```

That returns:
```javascript
{
 "ongoing": 37,
 "upcoming": 19,
 "past": 327,
 "total": 383
 }
```

This serves us in order to provide caching at the frontend.

**For example**:
*If a user clicks on a category from the tabs, I fetch the stats, compare it with
the local stats payload (previously fetched) and if the count for the corresponding
category is not changed, we don’t do a category fetch because there isn’t anything
new.*

