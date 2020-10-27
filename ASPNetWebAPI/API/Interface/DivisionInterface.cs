using API.Models;
using API.Viewmodel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Interface
{
    interface DivisionInterface
    {

        IEnumerable<DivisionVM> Get();

        Task<IEnumerable<DivisionVM>> Get(int id);

        int Create(DivisionVM divisionVN);

        int Update(int id, DivisionVM divisionVM);

        int Delete(int id);
    }
}
