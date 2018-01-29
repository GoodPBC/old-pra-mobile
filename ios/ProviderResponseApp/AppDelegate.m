/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <CodePush/CodePush.h>
#import <Fabric/Fabric.h>
#import <Crashlytics/Crashlytics.h>

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@import GoogleMaps;

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  [Fabric with:@[[Crashlytics class]]];

  [GMSServices provideAPIKey:@"AIzaSyBmAQB7WxkU9ZTJl1jfhzNLpRnyiqu9nUQ"];

#ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
    jsCodeLocation = [CodePush bundleURL];
#endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"ProviderResponseApp"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:0.18f green:0.55f blue:0.83f alpha:1.0];

  UIView* loadingView = [UIView new];
  loadingView.backgroundColor = [[UIColor alloc] initWithRed:0.18f green:0.55f blue:0.83f alpha:1.0];

  rootView.loadingView = loadingView;

  NSArray *allPngImageNames = [[NSBundle mainBundle] pathsForResourcesOfType:@"png" inDirectory:nil];
  for (NSString *imgName in allPngImageNames){
    if ([imgName containsString:@"LaunchImage"]){
      UIImage *img = [UIImage imageNamed:imgName];

      if (img.scale == [UIScreen mainScreen].scale && CGSizeEqualToSize(img.size, [UIScreen mainScreen].bounds.size)) {
        rootView.backgroundColor = [UIColor colorWithPatternImage:img];
      }
    }
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

@end
