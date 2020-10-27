using API.Interface;
using API.Viewmodel;
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
    public class DivisionRepository : DivisionInterface
    {
        DynamicParameters parameters = new DynamicParameters();
        SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["MyConnection"].ConnectionString);
        public int Create(DivisionVM divisionVM)
        {
            var sp = "SP_InsertDivision";
            parameters.Add("@Name", divisionVM.Name);
            parameters.Add("@Dept_id", divisionVM.Dept_id);
            var create = connection.Execute(sp, parameters, commandType: CommandType.StoredProcedure);
            return create;
        }

        public int Delete(int id)
        {
            var sp = "SP_DeleteDivision";
            parameters.Add("@Id", id);
            var delete = connection.Execute(sp, parameters, commandType: CommandType.StoredProcedure);
            return delete;
        }

        public IEnumerable<DivisionVM> Get()
        {
            var sp = "SP_GetAllDivision";
            var get = connection.Query<DivisionVM>(sp, commandType: CommandType.StoredProcedure);
            return get;
        }

        public async Task<IEnumerable<DivisionVM>> Get(int id)
        {
            var sp = "SP_GetByIdDivision";
            parameters.Add("@Id", id);
            var getDataById = await connection.QueryAsync<DivisionVM>(sp, parameters, commandType: CommandType.StoredProcedure);
            return getDataById;
        }

        public int Update(int id, DivisionVM divisionVM)
        {
            var sp = "SP_UpdateDivision";
            parameters.Add("@Id", id);
            parameters.Add("@Name", divisionVM.Name);
            parameters.Add("@Dept_id", divisionVM.Dept_id);
            var update = connection.Execute(sp, parameters, commandType: CommandType.StoredProcedure);
            return update;
        }
    }
}