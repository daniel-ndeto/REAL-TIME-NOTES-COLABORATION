# RealTime Notes

RealTime Notes is a full‑stack real‑time collaborative notes application that allows writers to create, edit, and share notes with others instantly. Built with Node.js, Express, MongoDB, Socket.io, and React, this app enables seamless collaboration among multiple users.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Directory Structure](#directory-structure)
- [Installation](#installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Overview

RealTime Notes is designed for writers and collaborators who need a real‑time, interactive environment to share ideas, edit notes, and work together. The app supports live updates, allowing all users in a session to see changes instantly.

## Features

- **Real‑Time Collaboration:**  
  All notes are updated instantly using Socket.io, allowing multiple users to edit and view changes in real time.
- **User Authentication:**  
  Writers can register, log in, and have their session persist across page reloads.
- **Profile Management:**  
  Users can view and edit their profiles through a sleek, right‑side sliding panel.
- **Notes Management:**  
  Create, edit, and share notes with others. Collaborators can view updates live.
- **Responsive Design:**  
  A modern and attractive UI built with React and styled using both Tailwind CSS and inline CSS.

## Directory Structure

```
real-time-notes/
├── backend/
│   ├── .env               # Environment variables
│   ├── package.json       # Backend dependencies & scripts
│   ├── server.js          # Express server & Socket.io initialization
│   ├── config/
│   │   └── db.js          # Database connection (MongoDB)
│   ├── models/
│   │   ├── User.js        # User schema
│   │   ├── Note.js        # Note schema
│   │   └── ...            # Additional models as needed
│   ├── routes/
│   │   ├── auth.js        # Authentication routes (login/register)
│   │   ├── notes.js       # Notes API routes
│   │   └── ...            # Other API routes
│   └── socket/
│       ├── authSocket.js  # Socket authentication middleware
│       ├── noteSocket.js  # Real-time note update events
│       └── ...            # Additional socket modules
└── frontend/
    ├── package.json       # Frontend dependencies & scripts
    ├── tailwind.config.js # Tailwind CSS configuration
    ├── postcss.config.js  # PostCSS configuration
    ├── public/
    │   └── index.html     # Main HTML file
    └── src/
        ├── App.js         # Main React component & Router
        ├── index.js       # React entry point
        ├── components/
        │   ├── Header.js          # Header with welcome message and profile toggle
        │   ├── Profile.js         # User profile settings panel
        │   ├── NotesList.js       # Display list of notes (or MessageHistory.js if using similar logic)
        │   ├── NoteEditor.js      # Interface to add and edit notes
        │   ├── Notifications.js   # Real-time notifications (toast messages)
        │   └── ...                # Other UI components
        └── styles/
            └── Responsive.scss    # Custom SCSS styles (if any)
```


## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or later)
- [MongoDB](https://www.mongodb.com/) (local installation or a remote cluster)
- [Git](https://git-scm.com/)

### Backend Setup

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd real-time-notes/backend


1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd real-time-notes/backend
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend directory with the following content (update values as needed):
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/realTimeNotes
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```
   *(or `npm start` for production)*

### Frontend Setup

1. Open a separate terminal and navigate to the `frontend` directory:
   ```bash
   cd real-time-notes/frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Ensure Tailwind CSS is configured (the files `tailwind.config.js` and `postcss.config.js` should be present).
4. Start the frontend development server:
   ```bash
   npm start
   ```

## Usage

1. **Access the App:**  
   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

2. **User Authentication:**  
   - Register or log in using the provided authentication form.
   - Upon successful login, your session is persisted.

3. **Collaborate on Notes:**  
   - Create or edit notes from the dashboard.
   - All changes are updated in real time for all collaborators.

4. **Profile Management:**  
   - Click on the "Profile" button in the header to view or edit your profile.
   - The profile panel slides in from the right and allows you to update your username.

5. **Notifications:**  
   - Real-time notifications alert you to updates from collaborators.

## Technologies Used

- **Backend:**  
  - Node.js  
  - Express  
  - MongoDB  
  - Socket.io  
  - JSON Web Tokens (JWT)
- **Frontend:**  
  - React  
  - Tailwind CSS & inline CSS  
  - Axios  
  - Socket.io-client
- **Other Tools:**  
  - Git for version control

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements or bug fixes. For major changes, please open an issue first to discuss your proposed changes.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- Special thanks to all open-source contributors and online resources that inspired this project.
- This project was built as part of a collaborative learning exercise in real-time web development.
```

