## Worksy - Job Portal Platform

**Worksy** is a modern, full-stack Job Portal application built using the MERN stack (MongoDB, Express, React, Node.js). Designed to connect job seekers (candidates), recruiters, and administrators, Worksy offers a seamless experience for discovering, applying for, and managing job opportunities. The platform is organized into three main user roles: Admin, Recruiter, and Candidate.

### Key Features:
- **Admin Dashboard**: Manage users (candidates and recruiters), job listings, and applications.
- **Recruiter Dashboard**: Post and manage job listings, view applications, and connect with candidates.
- **Candidate Dashboard**: Browse job listings, apply for jobs, manage profiles, and track application status.
- **User Authentication & Authorization**: Role-based access control with JWT for secure login and user management.
- **Job Search & Filters**: Search for jobs based on criteria like location, salary, experience, and skills.
- **Job Applications**: Apply for jobs and track application statuses.
- **Responsive UI**: A clean, modern user interface built with React, using tools like Redux for state management.

### Technologies Used:
- **Frontend**: React, Redux, React Router, Axios, Bootstrap/Material-UI
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs
- **Authentication**: JSON Web Tokens (JWT) for secure login and authorization
- **File Uploads**: Multer (for resume uploads)
- **Deployment**: Hosted on Heroku (backend) and Netlify/Vercel (frontend)

### Installation Instructions:

1. Clone the repository:
   ```bash
   git clone https://github.com/Code-With-Anthony/Worksy.git
   ```

2. Navigate to the client and server directories and install dependencies:
   ```bash
   cd Worksy
   npm install
   ```

3. Set up environment variables for the backend (e.g., MongoDB URI, JWT secret):
   - Create a `.env` file in the `server` directory and define your variables.
   
4. Run the backend server:
   ```bash
   cd server
   npm start
   ```

5. Run the frontend client:
   ```bash
   cd client
   npm start
   ```

### Future Enhancements:
- **Interview Scheduling**: Integration with calendar APIs for scheduling interviews.
- **Real-time Messaging**: Enable real-time communication between candidates and recruiters.
- **Analytics Dashboard**: Provide detailed analytics for recruiters and admins to track job views, applications, and more.

### Contributing:
We welcome contributions to enhance the platform. Feel free to fork the repo, submit issues, and create pull requests.

### License:
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
