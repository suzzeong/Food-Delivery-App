package com.suz.fooddeliveryapp;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import android.os.Bundle;
// import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "FoodDeliveryApp";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    // SplashScreen.show(this);
    super.onCreate(null);
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        DefaultNewArchitectureEntryPoint.getFabricEnabled(),
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() 
        );
  }
}
