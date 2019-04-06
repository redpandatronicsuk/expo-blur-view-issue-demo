# Demo for expo issue #3935
Demo for issue blur-view not working in bare Expo projects.

## Update

Also demonstrating `staysActiveInBackground` `expo-av` bug on iOS.

### Set up for AV bug demo
You need to apply a workaround to prevent `expo-av` from crashing. Open up `ios/blurexample/AppDlegate.m` and change ~line 36
```
NSArray<id<RCTBridgeModule>> *extraModules = [_moduleRegistryAdapter extraModulesForBridge:bridge andExperience:nil];
```
to
```
NSArray<id<RCTBridgeModule>> *extraModules = [_moduleRegistryAdapter extraModulesForBridge:bridge andExperience:@"FOO"];
```
And add
```
<key>UIBackgroundModes</key>
<array>
    <string>audio</string>
</array>
```
to `<dict>` section in `Info.plist`.