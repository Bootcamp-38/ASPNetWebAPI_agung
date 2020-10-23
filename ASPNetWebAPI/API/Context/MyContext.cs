using API.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace API.Context
{
    public class MyContext : DbContext
    {
        public MyContext() : base("ASPNetWebAPI") { }
        public DbSet<Department> Departments { get; set; }

       
    }
}