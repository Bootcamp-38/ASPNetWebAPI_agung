using API.Models;
using API.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace API.Controllers
{
    public class DepartmentsController : ApiController
    {
        DepartmentRepository _repository = new DepartmentRepository();
        public IHttpActionResult Post(Department department)
        {
            if ((department.Name != null) && (department.Name != ""))
            {
                _repository.Create(department);
                return Ok("Data Berhasil Diinput");
            }
            return BadRequest("Department Name Can't be null");
           
        }
        public IHttpActionResult Get()
        {
            var getdata = _repository.Get();
            return Ok(getdata);

        }
        //public Task<IEnumerable<Department>>Get(int id)
        //{
        //    return _repository.GetId(id);
        //}

        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            _repository.Delete(id);
            return Ok("Data Berhasil di Delete");
            //var delete = _repository.delete(id);
            //if delete(!id.Equals(null)
            //{
            //    _repository.Delete(id);
            //    return Ok("Data Berhasil di Delete");
            //}
            //return BadRequest("Department Id Can't be null");
            //if (!id.Equals (null))
            //{
            //    _repository.Delete(id);
            //    return Ok("Data Berhasil di Delete");
            //}
            //return BadRequest("Department Id Can't be null");


        }
        [HttpPut]
        public IHttpActionResult Update(int id, Department department)
        {
            _repository.Update(id, department);
            return Ok("Data Department Berhasil di Updated");
            //if ((department.Name != null) && (department.Name != ""))
            //{

            //    _repository.Update(id, department);
            //    return Ok("Data Department Berhasil di Updated");
            //}
            //return BadRequest("Department Name Can't be null");

           
        }

        [ResponseType(typeof(Department))]
        public Task<IEnumerable<Department>> GetId(int id)
        {
            //var getData = _repository.Get(id);
            return _repository.Get(id);
        }
    }
}
