using API.Models;
using API.Repositories;
using API.Viewmodel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace API.Controllers
{
    public class DivisionsController : ApiController
    {
        DivisionRepository _repository = new DivisionRepository();
        // GET: Divisions
        public IHttpActionResult Post(DivisionVM divisionVM)
        {
            if ((divisionVM.Name != null) && (divisionVM.Name != ""))
            {
                _repository.Create(divisionVM);
                return Ok("Data Berhasil Diinput");
            }
            return BadRequest("Department Name Can't be null");

        }
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            //_repository.Delete(id);
            //return Ok("Data Berhasil di Delete");


            //var delete = _repository.delete(id);
            //if delete(!id.Equals(null)
            //{
            //    _repository.Delete(id);
            //    return Ok("Data Berhasil di Delete");
            //}
            //return BadRequest("Department Id Can't be null");
            if (!id.Equals(null))
            {
                _repository.Delete(id);
                return Ok("Data Berhasil di Delete");
            }
            return BadRequest("Department Id Can't be null");


        }
        public IHttpActionResult Get()
        {
            var getdata = _repository.Get();
            return Ok(getdata);

        }

        [ResponseType(typeof(DivisionVM))]
        public Task<IEnumerable<DivisionVM>> GetId(int id)
        {
            //var getData = _repository.Get(id);
            return _repository.Get(id);
        }

        [HttpPut]
        public IHttpActionResult Update(int id, DivisionVM divisionVM)
        {
            //_repository.Update(id, department);
            //return Ok("Data Department Berhasil di Updated");
            if ((divisionVM.Name != null) && (divisionVM.Name != ""))
            {

                _repository.Update(id, divisionVM);
                return Ok("Data Department Berhasil di Updated");
            }
            return BadRequest("Department Name Can't be null");


        }
    }
}