# ESG Emissions Management Platform

## Overview

This project is a full-stack ESG emissions management platform built using Django and React.

The main goal of the project was to simulate how ESG-related emissions data from different enterprise systems can be collected, normalized, reviewed, and managed in one place.

The system currently supports:

* SAP fuel/procurement CSV data
* Utility electricity CSV uploads
* Mocked travel API/JSON data

All incoming records are converted into a common emissions format so they can be reviewed consistently by analysts.

---

## Features

### Data Ingestion

* Import SAP fuel data from CSV files
* Import utility electricity usage data
* Import travel-related emissions data from mocked JSON responses

### Data Processing

* Unit normalization
* ESG scope categorization
* Common emissions schema for all data sources

### Record Validation

The platform flags suspicious records such as:

* Negative quantities
* Unknown plant codes
* Unknown employee or meter IDs
* Invalid values

### Analyst Review Workflow

* Pending, Approved, and Rejected statuses
* Search and filtering support
* Record review actions from admin panel

### Frontend Dashboard

The React frontend displays:

* Emission records table
* Status-based filtering
* Highlighted flagged records
* Summary cards for total, pending, and flagged records

---

## Tech Stack

### Backend

* Django
* Django REST Framework
* SQLite
* Pandas

### Frontend

* React.js

---

## Project Flow

Data Sources → Parsing & Validation → Normalized Emission Records → Analyst Review → REST APIs → React Dashboard

---

## API Endpoint

### Fetch all emission records

```txt id="apiend"
/api/emissions/
```

---

## Running The Project

### Backend

```bash id="backendrun"
source venv/bin/activate
python manage.py runserver
```

### Frontend

```bash id="frontendrun"
cd frontend
npm start
```

---

## Possible Improvements

Some improvements that can be added in the future:

* User authentication and role-based access
* More detailed ESG calculations
* PostgreSQL integration
* Better dashboard visualizations
* Deployment on cloud platforms
* More advanced anomaly detection
