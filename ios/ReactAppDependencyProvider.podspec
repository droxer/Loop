require "json"

package = JSON.parse(File.read(File.join(__dir__, "..", "node_modules", ".pnpm", "react-native@0.76.1_@babel+core@7.28.5_@babel+preset-env@7.28.5_@babel+core@7.28.5__@types+react@18.3.10_react@18.3.1", "node_modules", "react-native", "package.json")))
version = package['version']

source = { :git => 'https://github.com/facebook/react-native.git' }
if version == '1000.0.0'
  source[:commit] = `git rev-parse HEAD`.strip if system("git rev-parse --git-dir > /dev/null 2>&1")
else
  source[:tag] = "v#{version}"
end

Pod::Spec.new do |s|
  s.name                   = "ReactAppDependencyProvider"
  s.version                = version
  s.summary                = "React App Dependency Provider"
  s.homepage               = "https://reactnative.dev/"
  s.license                = package["license"]
  s.author                 = "Meta Platforms, Inc. and its affiliates"
  s.platforms              = { :ios => "15.1" }
  s.source                 = source
  
  # This pod is essentially an alias for React-RCTAppDelegate
  # ReactAppDependencyProvider is part of React-RCTAppDelegate in React Native 0.76
  s.dependency             "React-RCTAppDelegate"
  
  # Source files - the actual implementation is in React-RCTAppDelegate
  s.source_files           = "dummy.{h,m}"
  s.public_header_files    = "dummy.h"
  
  s.pod_target_xcconfig = {
    "HEADER_SEARCH_PATHS" => "$(PODS_ROOT)/Headers/Public/React-RCTAppDelegate $(PODS_ROOT)/Headers/Private/React-RCTAppDelegate",
    "CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES" => "YES",
    "DEFINES_MODULE" => "YES"
  }
  
  # Ensure this pod can be imported as a module
  s.module_name = "ReactAppDependencyProvider"
end

