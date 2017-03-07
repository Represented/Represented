using SQLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Represented.Model
{
    class RepresentedItem
    {    
		[PrimaryKey, AutoIncrement]
		public int ID { get; set; }
		public string Name { get; set; }
		public string Zip { get; set; }
        public bool Done { get; set; }
    }
}
