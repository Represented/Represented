using SQLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Represented.Model
{
    public class RepresentedItem
    {    
		[PrimaryKey, AutoIncrement]
		public int ID { get; set; }
		public string Zip { get; set; }
        public double Lat { get; set; }
        public double Long { get; set; }
    }
}
