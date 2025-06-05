# Survey Application

This is a full-stack survey application built with a **.NET 7 backend** and a **React frontend**. It allows users to complete a survey and view aggregated survey results.

## Technologies Used

- **Frontend**: React
- **Backend**: ASP.NET Core Web API (.NET 7)
- **Database**: Microsoft SQL Server (local)
- **Styling**: CSS Modules

## How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/survey-app.git
cd survey-app
2. Start the Backend (.NET API)
Make sure you have the .NET SDK installed.

bash
Copy
Edit
cd backend  # Navigate to the backend project folder
dotnet watch run
Once the API is running, open your browser and go to:

bash
Copy
Edit
http://localhost:5000/swagger/index.html
This Swagger page shows the available API endpoints for interacting with the survey system.

3. Start the Frontend (React)
In a separate terminal:

bash
Copy
Edit
cd frontend  # Navigate to the frontend project folder
npm install  # Run this only the first time
npm run
Then open:

arduino
Copy
Edit
http://localhost:3000
This will load the frontend where you can fill in the survey form.

Testing & Validation
Enter details in the survey form fields.

Input validation is included — required fields must be filled in correctly before submission.

After submitting, click the “View Survey” link to view a summary of all submitted surveys.

Note: The database used is a local Microsoft SQL Server instance. You will need to configure your own connection string in appsettings.json if you want to run the full backend functionality.

A demo video will demonstrate how the survey submission and results display work.

License
This project is for educational and demonstration purposes only.

yaml
Copy
Edit

---

You can now copy and paste this directly into your `README.md` file. Let me know if you want to add ex
