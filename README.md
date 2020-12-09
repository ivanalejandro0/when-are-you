# when-are-you
An application that lives on your tray and shows you 'when' people is.

## Run app

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


## Build app

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
yarn run pkg  # use this on Mac
yarn run pkg-linux  # use this on Linux

```
