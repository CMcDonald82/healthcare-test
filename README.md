# healthcare-test
Test app for finding diagnoses for symptoms

## Requirements

This project uses Django 2.0 which requires Python 3.4, 3.5, or 3.6
See [this link](https://docs.djangoproject.com/en/2.0/faq/install/#faq-python-version-support) for details.

If you do not have one of those versions of Python 3 installed on your system, I would recommend [pyenv](https://github.com/pyenv/pyenv) and [pyenv-virtualenv](https://github.com/pyenv/pyenv-virtualenv) for managing Python versions and packages.

A recent version of Node is also required for running npm commands. My system has v8.9.4 installed (version 8.x is the latest LTS (stable) release according to the [Node.js Foundation Release Working Group](https://github.com/nodejs/Release) ).

I would recommend [nvm](https://github.com/creationix/nvm) for managing Node versions.


## Usage

* Clone the repo
```
git clone https://github.com/CMcDonald82/healthcare-test.git
```

* Install backend dependencies
```
pip install -r requirements.txt
```

* Install frontend dependencies
```
npm install
```

* Open one terminal window and start the backend dev server
```
python manage.py runserver
```

* Open another terminal window and start the frontend dev server
```
npm start
``` 

* Visit http://localhost:3000/ to access the app


## Running Tests

API tests for the backend are included. To run these:

```
cd backend
python manage.py test api
```

## Creating database

A SQLite database file is included by default. If this file gets removed for any reason and the database needs to be reset, there is a management command to seed the db with the data from the symptoms.txt file. This command can be run after the database is migrated and reset.

To reset and recreate the database:
Delete everything except the __init__.py file from the migration folder in all django apps, then run the following from the backend directory:

```
cd backend
python manage.py makemigrations api
python manage.py migrate
```

To seed the database using the custom management command included in this repo, run the following from the backend directory:

```
cd backend
python manage.py seed_db
```
