require 'xcodeproj'

# This script removes UIWebView from React project.
# We should remove this script once we upgrade react-native to 0.60.x
react_project = Xcodeproj::Project.open("./node_modules/react-native/React/React.xcodeproj")

react_project.main_group["React/Views"].files.each do |file|
  if file.path.match(/^RCTWebView/)
    file.remove_from_project
  end
end

react_project.save

puts '> ✅ UIWebView removed successfully from React.xcodeproj'
