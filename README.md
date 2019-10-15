# SMG-Vertretungsplan App

Teacher substitution schedule app for the Sebastian-Münster-Gymnasium from Ingelheim.
This app is an open source alternative to the DSB2 mobile app with the ability to parse Untis timetables and features such as class and subject filtering.

## Disclaimer
This project is not affiliated with the heinkingmedia GmbH. 

Here you can find the official DSB Mobile App: 

- [Android](https://play.google.com/store/apps/details?id=de.heinekingmedia.dsbmobile)
- [iOS](https://apps.apple.com/de/app/dsbmobile/id461741785)

## Getting Started

These instructions will get you this rect native app up and running on your local machine for development and testing purposes.

You can also download the latest Android release from the [Play Store](https://play.google.com/store/apps/details?id=io.gres.smg_vertretungsplan) (closed alpha).

### Prerequisites

- [Install NodeJS](https://nodejs.org/en/) on your computer.

- [Install CocoaPods](https://cocoapods.org/) on your computer
> This is only for iOS builds.

- Install react-native-cli globally on your computer

### Installing Dependencies

- Launch ``` npm install ``` command in a terminal opened in the project folder.
> This command will look into the *package.json* file and install all the dependencies listed here.

- Launch ``` pod install ``` command in a terminal opened in the project's ios folder.
> This command will look into the *Podfile* file and install all the dependencies listed here.

### Running on device

#### iOS

Open *ios/SMG_Vertretungsplan.xcworkspace* in xCode.

#### Andoird

Launch ``` react-native run-android ``` command in a terminal opened in the project folder.

### Building for production

#### iOS

- Select *Release* scheme in Product → Scheme → Edit Scheme.

- Remove *localhost* entry from the *NSExceptionDomains* dictionary in the *Info.plist*.
> ATS is disabled for *localhost* by default in React Native projects in order to make development easier.

#### Android

- Run ``` cd android && ./gradlew bundleRelease ``` in the project folder.

- The generated AAB can be found under *android/app/build/outputs/bundle/release/app.aab*.

## Troubleshooting

### Android Hermes release build error
https://github.com/facebook/react-native/issues/25599#issuecomment-524537342

## Built With

- [React Native](https://facebook.github.io/react-native/) - JavaScript app framework
- [Redux](https://redux.js.org/) - State container for JavaScript apps
- [React Native Paper](https://reactnativepaper.com/) - Material Design UI library 
