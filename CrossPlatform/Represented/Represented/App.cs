using Plugin.Geolocator;
using SQLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Xamarin.Forms;

namespace Represented
{
    public class App : Application
        {
            Entry enterZipcode = new Entry();

            public App()
            {
                
                Button allowLocServices = new Button
                {
                    Text = "Tap Here to Allow Location Services"
                };

                Button submitZipcode = new Button
                {
                    Text = "Enter"
                };

                enterZipcode = new Entry
                {
                    Keyboard = Keyboard.Numeric
                };

                submitZipcode.Clicked += onEditorCompleted;
                allowLocServices.Clicked += onButtonClicked;
            
                var welcomePage = new ContentPage
                {
                    Title = "Represented",
                    Content = new StackLayout
                    {
                        VerticalOptions = LayoutOptions.Center,
                        Children = {
                        allowLocServices,
                        new Label {
                            HorizontalTextAlignment = TextAlignment.Center,
                            Text = "Or Enter Your Zipcode:"
                        },
                        enterZipcode,
                        submitZipcode
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
                        Url = "http://138.197.9.140/@" + position.Latitude + "," + position.Longitude,
                    },
                    VerticalOptions = LayoutOptions.FillAndExpand
                };
            
                var content = new ContentPage
                {
                    Title = "WebApp",
                    Content = new StackLayout
                    {
                        VerticalOptions = LayoutOptions.Center,
                        Children =
                        {
                            new Label
                            {
                                Text = "URL: " + "http://138.197.9.140/@" + position.Latitude + "," + position.Longitude,
                                HorizontalTextAlignment = TextAlignment.Center
                            }
                        // webView
                        }
                    }
                };
                await button.Navigation.PushAsync(content);
            }

            async void onEditorCompleted(object sender, EventArgs e)
            {
                String arg = enterZipcode.Text;
                if (arg == null || arg.Length != 5) return;

                Button button = (Button)sender;
                WebView webView = new WebView
                {
                    Source = new UrlWebViewSource
                    {
                        Url = "http://138.197.9.140/" + arg,
                    },
                    VerticalOptions = LayoutOptions.FillAndExpand
                };
            
                var content = new ContentPage
                {
                    Title = "WebApp",
                    Content = new StackLayout
                    {
                        VerticalOptions = LayoutOptions.Center,
                        Children =
                        {
                            new Label
                            {
                                Text = "URL: " + "http://138.197.9.140/" + arg,
                                HorizontalTextAlignment = TextAlignment.Center
                            }
                        // webView
                        }
                    }
                };
                await button.Navigation.PushAsync(content);
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
