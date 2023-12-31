
# FTS Repair Ticket App

An App for a tyre company Field Tyre Services. A system that helps them to view and control the repairs done for thier customers. 


## System Architecture
Used MERN stack for developing the application. Using React for the frontend to create UI and get required information for the backend server. Express is used for the backend to use CRUD on the database which is MangoDB. Will be using custom css styling and Bootstrap in some. Want to create a unique and easy to use app for the users to log new repairs, edit repairs, close repairs and view all repairs. Using the MERN stack will enable me to do all of it.
##  System Requirements
#### How will it work?
User will log in to their profile and they will see all the repair tickets which is assign to employees that needs to be completed. Repair tickets will be create by a user with Customer contact details. When they are done with a repair they will mark the ticket as complete and the database will be update. And so managers will be see status of all repairs that comes through the shop. Admin will only have access to user details. They will be able to add delete and edit details.
#### Functional Requirements
•	Ticket creation: Users should be able to create new tickets by entering a title, description, and selecting a due date.
•	Tickets assignment: Users should be able to assign repair ticket to themselves or other users.
•	Ticket completion: Users should be able to mark tickets as complete when they have finished working on them.
•	Ticket editing: Users should be able to edit ticket details after they have been created.

#### Non-Functional Requirements
•	Functionality: The application should be responsive and work on all major browsers. The application should provide users with reports on their tickets, including completed tickets, overdue tickets, and ticket that are upcoming.
•	Usability: The user interface should be intuitive and easy to use, with clear navigation and minimal clutter. The application should be accessible to users with disabilities, including support for screen readers and other assistive technologies.
•	Reliability: The application should be able to handle a large number of users and tickets without crashing or slowing down. The application should be available to users 24/7 with minimal downtime for maintenance or updates.
•	Performance: The application should be fast and responsive, with minimal downtime.
•	Security: The application should ensure that user data is protected and secure
## User Stories

1. Add a public facing page with basic contact info 
2. Add an employee login to the app 
3. Provide easy navigation
4. Display current user and assigned role 
5. Provide a logout option 
6. Provide a way to remove employee access asap if needed 
7. Ticket are either OPEN or COMPLETED 
8. Tickets can only be deleted by Admins 
9. Anyone can create a ticket (when customer checks-in)
10. Only Admins can access User Settings 
## Installation

To start server:

Ensure Express is installed Open your terminal.

```bash
cd backend
npm start
```

To start React:
```bash
cd frontend
npm start
```    
## API Reference

No Third party api have been used.
Use Helmet middleware on the Backend Express server.
## Running Tests

To run tests, run the following command

```bash
  npm test
```


## Login/Sign up
Sign up as an Admin to see full features

## 🔗 Links
App has been Deploy using Render.
Frontend and backend has been deployed separate

[FTS Repair App](https://fts-repairs.onrender.com/)

[Github - Frontend](https://github.com/QuinSey26/ftsRepair-frontend.git)

[Github - Backend](https://github.com/QuinSey26/ftsRepair-backend.git)

