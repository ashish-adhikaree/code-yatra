# Voluntier - Volunteering Management System

Voluntier is a platform designed to support *Sustainable Development Goal (SDG) 11: Sustainable Cities and Communities*. Developed for *Code Yatra - 2025*, it connects volunteers with community events, encourages social impact, and rewards engagement.

---

## Features

### 1. **Volunteer Registration & Management**
   - Sign up, create profiles, and track activities.
   - Select interest categories and location for personalized event recommendations.

### 2. **Event Creation & Participation**
   - Organizers create events with details like dates, participation points, event location (lat, long, radius), and category.
   - Volunteers apply, and admins approve/reject applications.

### 3. **Contribution Tracking**
   - Track volunteer hours, attended events, and earned points and badges.

### 4. **LeaderBoard**
   - View rankings based on community hours and points.

### 5. **Gamification**
   - Earn points and badges for attending events, contributing to the community, and reaching milestones.

---

## User Flow

1. **Sign Up & Account Creation**
   - Register, confirm email, and log in.

2. **Organization Creation**
   - Organizers create and get approval for their organization.

3. **Event Creation**
   - Organizers set event details (start/end dates, points, location, category).
   - Event status can be "Open," "Closed," or "Completed."

4. **User Interaction with Events**
   - Users set their preferences (interest categories, location, radius).
   - Apply for events that match their interests.
   - Admin approves or rejects applications.

5. **Event Completion & Status Updates**
   - Organizer marks attendance; users earn points and community hours.

6. **Badges & Recognition**
   - Earn badges for community points and events attended.

7. **LeaderBoard**
   - Track rankings based on engagement.


## Tech Stack
-*Next JS with TypeScript*, *Supabase*, *ShadCN UI*, *TailwindCSS*
## Installation & Setup
To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/ashish-adhikaree/code-yatra.git
   cd code-yatra
   ```
   
2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a .env file in the root directory; use the reference of .env.example in the root directory.

4. Run the development server:
   ```
   npm run dev
   ```
   The project should now be running at http://localhost:3000

## Contribution
Contributions are welcome! If you want to contribute:
- Fork the repository
- Create a new branch (feature-name)
- Commit changes and push to your fork
- Open a pull request

## License
This project is open-source and available under the *MIT License*.