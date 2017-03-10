﻿using Plugin.Geolocator;
using Represented.Data;
using Represented.Model;
using SQLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace Represented
{
    public class App : Application
    {
        static RepresentedDatabase database;

        Label enterZipcodePrompt = new Label();
        Entry enterZipcodeEntry = new Entry();
        Button allowLocServices = new Button();
        ContentPage welcomePage = new ContentPage();
        ContentPage feedPage = new ContentPage();
        WebView webView = new WebView();

        String urlString = "http://138.197.9.140/";

        public App()
        {
             
            allowLocServices = new Button {
                Text = "Allow Location Services!",
                FontSize = 18,
                BorderWidth = 4,
                Margin = 40, 
                HorizontalOptions = LayoutOptions.Fill,
                VerticalOptions = LayoutOptions.Center
            };

            enterZipcodeEntry = new Entry
            {
                Keyboard = Keyboard.Numeric,
                Placeholder = "01234",
                PlaceholderColor = Color.Gray,
                FontSize = 18,
                VerticalOptions = LayoutOptions.Center
            };

            enterZipcodePrompt = new Label
            {
                Text = "OR ENTER ZIP CODE: ",
                TextColor = Color.Black,
                FontSize = 18,
                VerticalOptions = LayoutOptions.Center
            };

            View zipcodeEntry = new StackLayout
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

            // add event triggers
            allowLocServices.Clicked += onButtonClicked;
            enterZipcodeEntry.Completed += onEntryCompleted;

            // welcome page accepts user location info and requests webpage
            StackLayout foreground = new StackLayout
            {
                VerticalOptions = LayoutOptions.Center,
                Children =
                    {
                        allowLocServices,
                        zipcodeEntry
                    }
            };

            var backgroundImage = new Image()
            {
                Source = ImageSource.FromFile("american-flag.jpg"),
                Aspect = Aspect.Fill
            };

            welcomePage = new ContentPage
            {
                Title = "Welcome to Represented!",
                Content = new AbsoluteLayout
                {
                    Children = {
                        { backgroundImage, new Rectangle (0, 0, 1, 1), AbsoluteLayoutFlags.All },
                        { foreground, new Rectangle (0, 0, 1, 1), AbsoluteLayoutFlags.All}
                    }
                }
            };
            
            MainPage = new NavigationPage(welcomePage);
        }

        async void onButtonClicked(object sender, EventArgs e)
        {

            var locator = CrossGeolocator.Current;
            locator.DesiredAccuracy = 50;
            var position = await locator.GetPositionAsync(timeoutMilliseconds: 10000);

            Button button = (Button)sender;

            WebView webView = new WebView
            {
                Source = new UrlWebViewSource
                {
                    Url = urlString,
                },
                VerticalOptions = LayoutOptions.FillAndExpand
            };
            
            var content = new ContentPage
            {
                Title = urlString + "@" + position.Latitude + "," + position.Longitude,
                Content = new StackLayout
                {
                    Children = {
                        webView
                    }
                }
            };
            
            await button.Navigation.PushAsync(content);
        }

        async void onEntryCompleted(object sender, EventArgs e)
        {
            String arg = enterZipcodeEntry.Text;
            if (arg == null || arg.Length != 5) return;

            Entry entry = (Entry)sender;

            WebView webView = new WebView
            {
                Source = new UrlWebViewSource
                {
                    Url = urlString,
                },
                VerticalOptions = LayoutOptions.FillAndExpand
            };

            var content = new ContentPage
            {
                Title = urlString + arg,
                Content = new StackLayout
                {
                    Children = {
                        webView
                    }
                }
            };

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
