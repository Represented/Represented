using System;

namespace Represented.Exceptions
{
    public class URLFormatException : Exception
    {
        // Constructors
        public URLFormatException(string message) 
        : base(message) 
        { }
    }
}
