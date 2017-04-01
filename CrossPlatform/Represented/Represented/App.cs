﻿using Plugin.Geolocator;
using Represented.Data;
using Represented.Model;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using Xamarin.Forms;

namespace Represented
{
    public class App : Application
    {
        // Initialization of View elements
        Label enterZipcodePrompt = new Label();
        Entry enterZipcodeEntry = new Entry();
        Button allowLocServices = new Button();
        View zipcodeEntry = new StackLayout();
        ContentPage welcomePage = new ContentPage();
        String urlString = "http://represented506.me:8000/";

        // Initialization of Data elements
        RepresentedItem repItem = new RepresentedItem();
        static RepresentedDatabase db;
        List<RepresentedItem> items = new List<RepresentedItem>();
        String storedZip = "";
        double storedLat = 0.0;
        double storedLong = 0.0;

        // Database constructor
        static RepresentedDatabase Database
        {
            get
            {
                if (db == null)
                {
                    db = new RepresentedDatabase(DependencyService.Get<IFileHelper>().GetLocalFilePath("RepresentedSQLite.db3"));
                }
                return db;
            }
        }

        // Main method
        public App()
        { 
            // Button allows location services
            allowLocServices = new Button {
                Text = "Allow Location Services!",
                FontSize = 18,
                FontAttributes = FontAttributes.Bold,
                BorderWidth = 4,
                Margin = 40, 
                HorizontalOptions = LayoutOptions.Fill,
                VerticalOptions = LayoutOptions.Center
            };

            // Entry accepts 5-digit zip code
            enterZipcodeEntry = new Entry
            {
                Keyboard = Keyboard.Numeric,
                Placeholder = "01234",
                PlaceholderColor = Color.Gray,
                FontSize = 18,
                VerticalOptions = LayoutOptions.Center
            };

            // Text prompts user to enter zip code
            enterZipcodePrompt = new Label
            {
                Text = "OR ENTER ZIP CODE: ",
                TextColor = Color.Black,
                FontAttributes = FontAttributes.Italic,
                FontSize = 18,
                VerticalOptions = LayoutOptions.Center
            };

            // Layout of zip code entry elements
            zipcodeEntry = new StackLayout
            {
                Orientation = StackOrientation.Horizontal,
                HorizontalOptions = LayoutOptions.Center,
                VerticalOptions = LayoutOptions.End,
                Children =
                {
                     enterZipcodePrompt,
                     enterZipcodeEntry
                }
            };

            // Adding event triggers to button and entry
            allowLocServices.Clicked += onButtonClicked;
            enterZipcodeEntry.Completed += onEntryCompleted;

            // Welcome page contains location data prompts.
            // Launches feed page upon completion
            welcomePage = new ContentPage
            {
                Title = "Welcome to Represented!",
                BackgroundColor = Color.FromHex("CCC4C4"),
                Content = new StackLayout
                {
                    VerticalOptions = LayoutOptions.Center,
                    Children =
                    {
                        allowLocServices,
                        zipcodeEntry
                    }
                }
            };

            // Check to see if user has already stored location
            checkStoredLocation();
        }

        // Accesses local database to check for stored location data
        // If no location data stored, load welcome page
        // If location data stored, load feed page with location specific feed
        async void checkStoredLocation()
        {
            List<RepresentedItem> items = await Database.GetItemsAsync();

            // Iterate through database items returned from query
            foreach (RepresentedItem item in items)
            {
                if(item.Zip.Length == 5)
                {
                    storedZip = item.Zip;
                }
                if (item.Lat != 0.0)
                {
                    storedLat = item.Lat;
                }
                if (item.Long != 0.0)
                {
                    storedLong = item.Long;
                }
            }

            // Latitude and Longitude take priority over other location data
            if(storedLong != 0.0 && storedLat != 0.0)
            {
                // Build WebView with lat and long args
                WebView webView = new WebView
                {
                    Source = new UrlWebViewSource
                    {
                        Url = urlString + "lat=" + storedLat + ",long=" + storedLong,
                    },
                    VerticalOptions = LayoutOptions.FillAndExpand
                };

                // Create content page with WebView
                var content = new ContentPage
                {
                    Title = "Represented",
                    Content = new StackLayout
                    {
                        Children = {
                        webView
                    }
                    }
                };

                MainPage = new NavigationPage(content);
            }
            // zip code is less reliable than lat and long
            else if (storedZip.Length == 5)
            {
                // Build WebView with zip code arg
                WebView webView = new WebView
                {
                    Source = new UrlWebViewSource
                    {
                        Url = urlString + "zip=" + storedZip,
                    },
                    VerticalOptions = LayoutOptions.FillAndExpand
                };

                // Create content page with WebView
                var content = new ContentPage
                {
                    Title = "Represented",
                    Content = new StackLayout
                    {
                        Children = {
                        webView
                    }
                    }
                };

                MainPage = new NavigationPage(content);
            }
            // If no location data stored, load welcome page
            else
            {
                MainPage = new NavigationPage(welcomePage);
            }
        }

        // When button is clicked, get and store geolocation
        // Then load feed page with zip code location arg
        async void onButtonClicked(object sender, EventArgs e)
        {

            // Obtain user location data with geolocation
            var locator = CrossGeolocator.Current;
            locator.DesiredAccuracy = 50;
            var position = await locator.GetPositionAsync(timeoutMilliseconds: 10000);
            
            // Set data item fields with location data
            repItem.Zip = "";
            repItem.Lat = position.Latitude;
            repItem.Long = position.Longitude;

            // Store location data in database
            await Database.SaveItemAsync(repItem);

            // Create navigable view element
            Button button = (Button)sender;

            // Build WebView with zip code arg
            WebView webView = new WebView
            {
                Source = new UrlWebViewSource
                {
                    Url = urlString + "lat=" + position.Latitude + ",long=" + position.Longitude,
                },
                VerticalOptions = LayoutOptions.FillAndExpand
            };

            // Create content page with WebView
            var content = new ContentPage
            {
                Title = "Represented",
                Content = new StackLayout
                {
                    Children = {
                        webView
                    }
                }
            };
            
            // Push feed page onto navigation stack
            await button.Navigation.PushAsync(content);
        }

        // When entry is completed, check input and store zip code
        // Then load feed page with zip code location arg
        async void onEntryCompleted(object sender, EventArgs e)
        {
            // Obtain zipcode from entry field and check 5-digit int
            String arg = enterZipcodeEntry.Text;
            if (arg == null || arg.Length != 5) return;
            if (Regex.IsMatch(arg, @"^\d+$") == false) return;

            // Set data item fields with location data
            repItem.Zip = arg;
            repItem.Lat = 0.0;
            repItem.Long = 0.0;

            // Store location data in database
            await Database.SaveItemAsync(repItem);

            // Create navigable view element
            Entry entry = (Entry)sender;

            // Build WebView with lat and long args
            WebView webView = new WebView
            {
                Source = new UrlWebViewSource
                {
                    Url = urlString + "zip=" + arg,
                },
                VerticalOptions = LayoutOptions.FillAndExpand
            };

            // Create content page with WebView
            var content = new ContentPage
            {
                Title = "Represented",
                Content = new StackLayout
                {
                    Children = {
                        webView
                    }
                }
            };

            // Push feed page onto navigation stack
            await entry.Navigation.PushAsync(content);
        }

        protected override void OnStart()
        {
            // Handle when your app starts
        }

        protected override void OnSleep()
        {
            // Handle when your app sleeps
        }

        protected override void OnResume()
        {
            // Handle when your app resumes
        }
    }
}