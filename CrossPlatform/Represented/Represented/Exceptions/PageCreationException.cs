using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Serialization;

namespace Represented.Exceptions
{
    public class PageCreationException : Exception
    {
        // Constructors
        public PageCreationException(string message) 
        : base(message) 
        { }
    }
}
