# when-are-you
An application that lives on your tray and shows you 'when' people is.

## Disclaimer

Things may break.

This is a pet project and I've just spent the least amount of time on it to
learn solve my problem and learn some technologies along the way.

I've tried this out on Mac OS Catalina and Kubuntu Linux 20.04.

There are release builds that are not signed on purpose, I didn't want to spend time/money there.

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
yarn run pkg:mac  # only works on Mac
yarn run pkg:linux
```
