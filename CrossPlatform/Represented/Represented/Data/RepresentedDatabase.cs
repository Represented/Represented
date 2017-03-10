using Represented.Model;
using SQLite;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Represented.Data
{
    class RepresentedDatabase
    {
        readonly SQLiteAsyncConnection database;

        public RepresentedDatabase(string dbPath)
        {
            database = new SQLiteAsyncConnection(dbPath);
            database.CreateTableAsync<RepresentedItem>().Wait();
        }

        public Task<List<RepresentedItem>> GetItemsAsync()
        {
            return database.Table<RepresentedItem>().ToListAsync();
        }

        public Task<List<RepresentedItem>> GetItemsNotDoneAsync()
        {
            return database.QueryAsync<RepresentedItem>("SELECT * FROM [RepresentedItem] WHERE [Done] = 0");
        }

        public Task<RepresentedItem> GetItemAsync(int id)
        {
            return database.Table<RepresentedItem>().Where(i => i.ID == id).FirstOrDefaultAsync();
        }

        public Task<int> SaveItemAsync(RepresentedItem item)
        {
            if (item.ID != 0)
            {
                return database.UpdateAsync(item);
            }
            else
            {
                return database.InsertAsync(item);
            }
        }

        public Task<int> DeleteItemAsync(RepresentedItem item)
        {
            return database.DeleteAsync(item);
        }
    }
}
