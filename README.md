# Smart Home IoT

### Overview
Smart Home project using Django REST Framework and React to control device statuses and monitor total home energy consumption.

## Installation
### Clone repository

    git clone https://github.com/Saraabbr/Smart-Home-IoT.git

### Backend Instructions
1. Create a virtual environment

    `virtualenv venv`

    Or

    `python -m venv venv`

2. Activate it

    `source venv/bin/activate`

3. Navigate to the backend directory

    `cd SmartHome`

4. Install dependencies

    `pip install -r requirements.txt`

5. Migrate Django's migrations to database

    `python manage.py migrate`

6. Load example data

    `python manage.py load_example_data`

#### Run Django's development server

     python manage.py runserver

### Frontend Instructions
1. Install dependencies :
   
     `npm install`

#### Run React's development server

    npm start

Then in your browser, visit `http://localhost:3000`.

## Demo

https://github.com/Saraabbr/Smart-Home-IoT/assets/93367539/deb30353-9a77-49f1-ad4f-39912d286e22
