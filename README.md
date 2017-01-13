# Running in Simulator

- For iOS, the default scheme has been renamed to `ProviderResponseApp-Development`,
so run the following command to build on the simulator: `react-native run-ios --scheme=ProviderResponseApp-Development`

# Build Instructions

- Install fastlane: `gem install fastlane`
- Create a `.env` file in `fastlane/` and put the following in it:
  ```
  USERNAME=kristopher@happyfuncorp.com
  CRASHLYTICS_API_TOKEN=***
  CRASHLYTICS_BUILD_SECRET=***
  ```
  - Replace with your Apple developer account email, the real crashlytics token and secret

## iOS:

- Run `fastlane ios beta`
- Once the build completes, commit the changes to the build number.

## Android:

- Set up your signing keys:
  - get a copy of the existing keystore, it's called `dhs-pra.keystore` and copy to `android/app/dhs-pra.keystore`
  - add the following config to your `~/.gradle/gradle.properties` file:
    ```
    DHS_PRA_RELEASE_STORE_FILE=dhs-pra.keystore
    DHS_PRA_RELEASE_KEY_ALIAS=dha-pra
    DHS_PRA_RELEASE_STORE_PASSWORD=dhs_pra_123
    DHS_PRA_RELEASE_KEY_PASSWORD=dhs_pra_123
    ```
- Run `fastlane android beta`
- Commit the change to the build number.

## Troubleshooting

- *App running slowly on the emulator*, make sure JS Debugging is turned off.
- *APK not installing on the emulator / device*, make sure USB debugging is enabled on the device. Uninstall and reinstall the app on the device.
- *Using Crashlytics on iOS build*, this was giving errors so it's currently not linked in the iOS binaries. Add `libSMXCrashlytics.a` back at some point to get this working.