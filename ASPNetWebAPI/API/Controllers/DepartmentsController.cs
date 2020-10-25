using API.Models;
using API.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace API.Controllers
{
    public class DepartmentsController : ApiController
    {
        DepartmentRepository _repository = new DepartmentRepository();
        public IHttpActionResult Post(Department department)
        {
            _repository.Create(department);
            return Ok("Data Berhasil Diinput");
        }
        public IHttpActionResult Get()
        {
            var getdata = _repository.Get();
            return Ok(getdata);

        }
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            _repository.Delete(id);
            return Ok("Data Berhasil di Delete");
        }
        [HttpPut]
        public IHttpActionResult Update(int id, Department department)
        {
            _repository.Update(id, department);
            return Ok("Data Department Berhasil di Updated");
        }
        [HttpPost]
        public IHttpActionResult GetId(int id)
        {
            var getData = _repository.Get(id);
            return Ok(getData);
        }
    }
}
