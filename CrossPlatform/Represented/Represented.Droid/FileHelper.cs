using System;
using System.IO;
using Xamarin.Forms;
using Represented.Droid;

[assembly: Dependency(typeof(FileHelper))]
namespace Represented.Droid
{
    public class FileHelper : IFileHelper
    {
        public string GetLocalFilePath(string filename)
        {
            string path = Environment.GetFolderPath(Environment.SpecialFolder.Personal);
            return Path.Combine(path, filename);
        }
    }
}