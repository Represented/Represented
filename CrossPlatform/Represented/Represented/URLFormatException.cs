using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace Represented
{
    class URLFormatException : Exception
    {
        // Constructors
        public URLFormatException(string message) 
        : base(message) 
        { }
    }
}
