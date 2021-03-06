# When are you?
An application that lives on your tray and shows you 'when' people is.

## Disclaimer

Things may break.

This is a pet project and I've just spent the least amount of time on it to
learn solve my problem and learn some technologies along the way.

I've tried this out on Mac OS Catalina and Kubuntu Linux 20.04.

There are release builds that are not signed on purpose, I didn't want to spend time/money there.

## Get the app

Get your build from the <a href="https://github.com/ivanalejandro0/when-are-you/releases">releases page</a>.


## About the app

### How does it look like?

<img src='./images/ui.jpg' />

### Adding a new person

<img src='./images/add-new-person.jpg' />

### Click the name to edit

<img src='./images/click-to-edit-name.jpg' />

### Click the timezone to edit

<img src='./images/click-to-edit-timezone.jpg' />

### Select a timezone from the dropdown

<img src='./images/timezone-select.jpg' />


## For a developer

Check out the configured Github Actions for a working example on how to build the app.

### Run app from code

```
# build UI
cd ui
yarn
yarn run build

# build electron
cd ../electron
yarn

# copy ui into electron work dir
cp -R ../ui/build dist-ui/

# Run electron
yarn run start
```


### Building the app locally

```
# build UI
cd ui
yarn
yarn run build

# build electron
cd ../electron
yarn
yarn run build

# copy ui into electron work dir
cp -R ../ui/build dist-ui/

# run builder
yarn run pkg:mac  # only works on Mac
yarn run pkg:linux
```
