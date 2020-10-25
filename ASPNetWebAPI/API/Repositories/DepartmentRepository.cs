using API.Interface;
using API.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace API.Repositories
{
    public class DepartmentRepository : DepartmentInterface
    {
        DynamicParameters parameters = new DynamicParameters();
        SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["MyConnection"].ConnectionString);
        public int Create(Department department)
        {
            var sp = "SP_InsertDepartment";
            parameters.Add("@Name", department.Name);
            var create = connection.Execute(sp, parameters, commandType: CommandType.StoredProcedure);
            return create;
        }

        public int Delete(int id)
        {
            var sp = "SP_DeleteDepartment";
            parameters.Add("@Id", id);
            var delete = connection.Execute(sp, parameters, commandType: CommandType.StoredProcedure);
            return delete;
        }

        public IEnumerable<Department> Get()
        {
            var sp = "SP_GetAllDepartment";
            var get = connection.Query<Department>(sp, commandType: CommandType.StoredProcedure);
            return get;
        }

        public Task<IEnumerable<Department>> Get(int id)
        {
            var sp = "SP_GetById_Department";
            parameters.Add("@Id", id);
            var getDataById = connection.Query<Department>(sp, parameters, commandType: CommandType.StoredProcedure);
            return Task.FromResult(getDataById);
        }

        public int Update(int id, Department department)
        {
            var sp = "SP_UpdateDepartment";
            parameters.Add("@Id", id);
            parameters.Add("@Name", department.Name);
            var update = connection.Execute(sp, parameters, commandType: CommandType.StoredProcedure);
            return update;
        }
    }
}