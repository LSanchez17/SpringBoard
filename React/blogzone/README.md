# App Structure
  A blog based on Redux, React Router, and good ol React. Component Structure as follows:
- HomePage with links. A small section at the bottom for each individual blog
  -  Has routes for blogs, and adding a new blog
- Blogs loads all blogs
  -  Each blog is a component, rendered from parent Blogs
-  Add new Post is a form component, 


- Had to redesign the entire thing as I went from basic state, to redux and backend 
- Seemed a bit pointless to design an application without those in mind, and then try and plug them in

# App Layout
- Four parts
 - React router uses the postId part of a post to create new routes for each existing blog.  A homepage for displaying all the blogs, and a page to create new blogs
 - Backend(handles requests from front end, and to database)
 - src/actions
   - Defines the action.type(ADD, DELETE, UPDATE, etc)
 - src/components
   - Main components used
    * App
      * Home
        * TitleList
          * PostDisplay
            * Post
              * CommentList
                * Comment
              * CommentForm
            * PostForm
        * NewPost
 - src/helpers
   * posts
     - Handles API calls to back end from front end forms/button submissions
     - Retrieves stored posts, comments, etc from back end to display on front end 
     - Uses dispatches to also update the current store state for easier access
   * titles
     - Gets the titles of the blog posts
 - src/redux
   * Combined reducers
     * Posts
       - Based on action type, different CRUD operations are performed and state is changed
     * titles
       - Based on action type, different CRUD operations are performed and state is changed


