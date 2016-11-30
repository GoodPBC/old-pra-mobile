# Build Instructions

## IOS:

- Make sure env points to the staging / prod API:
  * Set `BASE_URL` in `.env`
- Bundle the JS: `npm run ios:bundle`
- Bump the version numbers in `Info.plist`
- Archive a build in Xcode
- Upload to iTunes

## Android:
- Make sure env points to the staging API (see above)
- Set up your signing keys:
  - get a copy of the existing keystore, it's called `dhs-pra.keystore` and copy to `android/app/dhs-pra.keystore`
  - add the following config to your `~/.gradle/gradle.properties` file:
    ```
    DHS_PRA_RELEASE_STORE_FILE=dhs-pra.keystore
    DHS_PRA_RELEASE_KEY_ALIAS=dha-pra
    DHS_PRA_RELEASE_STORE_PASSWORD=*****
    DHS_PRA_RELEASE_KEY_PASSWORD=
    ```
  - Fill in the key password that you should also have gotten
- Open Android Studio
- `Build -> Generate Signed APK`
- Fill out the prompts
- The APK is generated in `android/app/app-release.apk`

## Troubleshooting

- *App running slowly on the emulator*, make sure JS Debugging is turned off.
- *Android Studio build appears to not be updating the JS*, make sure the `Preferences -> Build, Execution, Deployment -> Compile -> Configure on Demand` config is turned off.
- *Command line Android build not working*, I couldn't get the Android build to work via the command line, so in that case use Android Studio.
- *APK not installing on the emulator / device*, make sure USB debugging is enabled on the device. Uninstall and reinstall the app on the device.