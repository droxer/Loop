#import <Foundation/Foundation.h>

// ReactAppDependencyProvider compatibility shim for Expo SDK 53
// In React Native 0.76, this functionality is integrated into React-RCTAppDelegate
// This is a stub implementation to satisfy Expo's dependency requirements

NS_ASSUME_NONNULL_BEGIN

/**
 * RCTAppDependencyProvider is a compatibility shim for Expo SDK 53.
 * In React Native 0.76, the dependency provider functionality is part of React-RCTAppDelegate.
 * This class exists to satisfy Expo's pod dependency requirements.
 */
@interface RCTAppDependencyProvider : NSObject

- (instancetype)init;

@end

NS_ASSUME_NONNULL_END

