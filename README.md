# Build Instructions

## IOS:

- Make sure env points to the staging / prod API:
  * Set `BASE_URL` in `.env`
- Bundle the JS: `npm run ios:bundle`
- Bump the version numbers in `Info.plist`
- Archive a build in Xcode
- Upload to iTunes
