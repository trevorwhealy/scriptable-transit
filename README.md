Scriptable Transit Widget for iOS
=========


<img src="https://user-images.githubusercontent.com/14946478/192045408-d0224bbc-f87b-4dc3-8690-82102f3a768a.png" width="600" />

I wrote this script because I take the [Bart](https://en.wikipedia.org/wiki/Bay_Area_Rapid_Transit) to work every day

I needed to know when the next few trains would arrive at my stops.

With a glance I can see if I should hustle, or, wait for the next one.



## Project Requirements

This widget runs on iOS via the Scriptable ([App Store](https://apps.apple.com/us/app/scriptable/id1405459188)) app.

You'll also need a Google Maps API key.



## Why do I need a Google Maps API key?

Sorry 😖 

I really struggled to make this as plug-and-play as possible for you.

I even wrote two blogs and recorded a Youtube video to demonstrate how to install this.

Ultimately, the whole tutorial became less about the code and more about Google Cloud Console.

That said, I had lots of practice and can now condense all the setup into a few short steps:


## Google API Key Quick Setup

Step 1. Create a new project in Google Cloud Console and title it `Transit Widget`
- This ensures the project `id` is `transit-widget` which will make all links below work.
- https://console.cloud.google.com/projectcreate

Step 2. Visit the below link and click `Enable` to add the `Directions API` to your project
- [https://console.cloud.google.com/marketplace....project=transit-widget](https://console.cloud.google.com/marketplace/product/google/directions-backend.googleapis.com?q=search&referrer=search&project=transit-widget)

Step 3. Visit the below link page and click `+ Create Credentials` at the top
- [https://console.cloud.google.com/credentials...project=transit-widget](https://console.cloud.google.com/google/maps-apis/credentials?project=transit-widget)


**You now have your API key! Save this somewhere**

Step 4. Click on the link to your API, which should take you to the API key dashboard.

Step 5. Under `API restrictions` select **only** the Directions API. Click Save.

Step 6. Visit the below link to enable billing for your project
- https://console.cloud.google.com/billing/enable?project=transit-widget


## Widget comes with Dark and Light Mode

I think the dark mode version looks better in all cases, but I created a light mode variant as well.

It will swap automatically to light mode depending on your iOS configuration. 

<img src="https://user-images.githubusercontent.com/14946478/192008691-20212da0-631c-493e-bbde-8b086f280a19.png" width="600" />


## Special thanks

Special thanks to a few people:

Romo, who asked me to share the setup for my transit widget multiple times. Here you go 😄

[Lillian](https://lilliansamra.com), who dutifully trudged through all the videos and blogs, twice 🙏

[Josh W. Comeau](https://twitter.com/JoshWComeau), who inspires me as a web engineer 🎆

[Simon B. Støvring](https://twitter.com/simonbs), the creator of Scriptable 💡


## License
[MIT](https://github.com/trevorwhealy/scriptable-transit/blob/main/LICENSE.md)
