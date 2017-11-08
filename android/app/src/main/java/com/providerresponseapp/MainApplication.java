package com.providerresponseapp;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.smixx.fabric.FabricPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.microsoft.codepush.react.CodePush;
import com.instabug.reactlibrary.RNInstabugReactnativePackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new FabricPackage(),
            new MapsPackage(),
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new GoogleAnalyticsBridgePackage(),
            new RNDeviceInfo(),
            new ReactNativeConfigPackage(),
            new CodePush(null, getApplicationContext(), BuildConfig.DEBUG),
            		new RNInstabugReactnativePackage.Builder("YOUR_ANDROID_APPLICATION_TOKEN",MainApplication.this)
							.setInvocationEvent("shake")
							.setPrimaryColor("#1D82DC")
							.setFloatingEdge("left")
							.setFloatingButtonOffsetFromTop(250)
							.build()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
