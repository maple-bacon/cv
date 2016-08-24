# CV

Jason Taylor's online portfolio.


### Requirements

* [Git](https://git-scm.com/downloads)
* [Node.js](https://nodejs.org/en/)
* [Heroku Toolbelt](https://devcenter.heroku.com/articles/heroku-command-line)



## Getting Started

Clone the repository

```
git clone https://github.com/maple-bacon/cv.git
```

Install package dependencies

```
cd cv && npm install
```



## Deploying

##### Install the Heroku Toolbelt

Download and install the [Heroku Toolbelt](https://toolbelt.heroku.com/) or learn more about the [Heroku Command Line Interface](https://devcenter.heroku.com/categories/command-line).

If you haven't already, log in to your Heroku account and follow the prompts to create a new SSH public key.

```
$ heroku login
```

##### Configure the repository

Use Git to configure heroku with your app's source.

```
$ heroku git:remote -a jasontaylor
```

##### Before you deploy

Ensure that all environment variables have been set.

```
$ heroku config:set MY_CUSTOM_VALUE=foobar
```

See `.env` for environment variables that need to be set.

##### Deploy your changes

Make some changes to the code you just cloned and deploy them to Heroku using Git.

```
$ git add .
$ git commit -am "make it better"
$ git push heroku master
```


## Git Cheatsheet

* View changed files:
  ```
  git status
  ```
* Sage all changes:
  ```
  git add .
  ```
* Stage a single file:
  ```
  git add path/to/some/file
  ```
* Commit your changes:
  ```
  git commit -m "Enter your commit message"
  ```
* Push your changes:
  ```
  git push
  ```
