This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Predicate Builder by Trevor Storey

## To run the app

### Clone this repo onto your machine with this command in your terminal:
```
git clone git@github.com:thetrevlore/predicate-builder.git
```

### To run the front-end dev server at [http://localhost:3000](http://localhost:3000) - in your terminal, navigate to the client/ directory and run:
```
yarn && npm run start
```
That will run the front-end at [http://localhost:3000](http://localhost:3000)

### To run the back-end dev server at [http://localhost:5000](http://localhost:5000) - in a different terminal window, navigate to the server/ directory and run 
```
npm i && npm run start
```

### To try out the app, navigate to [http://localhost:3000](http://localhost:3000) in your browser


## Caveats
If I was to put more time into this, one thing I would do is make the select dropdowns more accessible(a11y). Either by implementing those features myself or by using a prebuilt React select like https://www.npmjs.com/package/react-select or https://www.npmjs.com/package/rc-select. I chose not to use those because they are 1.41mb and 279kb respectively and it seemed like overkill for a project this small and when I don't really know how important a11y is to the project.

I ended up using a self-modified version of https://github.com/dbilgili/Custom-ReactJS-Dropdown-Components for the selects. Which I also mention at the top of Dropdown.js and dropdown.css.