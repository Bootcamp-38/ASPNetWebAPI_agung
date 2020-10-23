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
    }
}
